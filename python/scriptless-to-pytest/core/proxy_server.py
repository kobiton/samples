import json
import socket
import sys
import threading
from functools import partial
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, urlunparse, urlencode, parse_qsl

import requests

from config import Config
from constants import DeviceSource

SOCKET_TIMEOUT_SECONDS = 15 * 60

# JSON Wire Protocol status code -> W3C error string.
_ERROR_CODES = {
    6: "invalid session id",
    7: "no such element",
    8: "no such frame",
    9: "unknown command",
    10: "stale element reference",
    11: "element not visible",
    12: "invalid element state",
    13: "unknown error",
    15: "element not selectable",
    17: "javascript error",
    19: "invalid selector",
    21: "timeout",
    23: "no such window",
    24: "invalid cookie domain",
    25: "unable to set cookie",
    26: "unexpected alert open",
    27: "no such alert",
    28: "script timeout",
    29: "invalid element coordinates",
    30: "ime not available",
    31: "ime engine activation failed",
    32: "invalid selector",
    33: "session not created",
    34: "move target out of bounds",
}


def _is_status_code_success(status_code):
    return 200 <= status_code <= 299


class _ProxyHandler(BaseHTTPRequestHandler):
    """Per-connection HTTP handler. Delegates each request to ProxyServer.serve()."""

    def __init__(self, server_instance, *args, **kwargs):
        # `server_instance` is bound via functools.partial when the HTTPServer
        # is constructed, so each ProxyServer keeps its own state. No class
        # attributes -- concurrent ProxyServer instances stay isolated.
        self._proxy = server_instance
        super().__init__(*args, **kwargs)

    def _serve(self, method):
        try:
            length = int(self.headers.get('Content-Length', 0) or 0)
            body = self.rfile.read(length) if length > 0 else None
            status, payload, content_type = self._proxy.serve(self.path, method, body)
            self.send_response(status)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        except Exception as e:
            import traceback
            traceback.print_exc(file=sys.stderr)
            try:
                payload = json.dumps({'value': {'error': 'unknown error', 'message': str(e)}}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            except Exception:
                pass

    def do_GET(self):    self._serve('GET')
    def do_POST(self):   self._serve('POST')
    def do_PUT(self):    self._serve('PUT')
    def do_PATCH(self):  self._serve('PATCH')
    def do_DELETE(self): self._serve('DELETE')

    def log_message(self, format, *args):
        # Suppress default access log.
        pass


class ProxyServer:
    """Forwards Appium requests to the upstream Kobiton server.

    Attaches Basic auth, optionally appends baseCommandId, and rewrites the
    /session response + subsequent error responses from JSON-Wire to W3C
    format when needed.

    Only the Authorization header is forwarded -- we do NOT copy client
    headers (no 'host', no cookies, no anything else); the upstream URL alone
    determines routing.
    """

    def __init__(self):
        self.current_command_id = 0
        self.kobiton_session_id = 0
        self._session_id_lock = threading.Lock()
        self._auth_string = Config.get_basic_auth_string()
        self._force_w3c = False
        self._http = requests.Session()
        self._port = self._find_available_port()
        self._server = HTTPServer(
            ('localhost', self._port),
            partial(_ProxyHandler, self),
        )
        self._thread = None

    def start(self):
        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()

    def stop(self):
        if self._server:
            self._server.shutdown()

    def is_alive(self):
        return self._thread is not None and self._thread.is_alive()

    def get_server_url(self):
        return f"http://localhost:{self._port}"

    @property
    def listening_port(self):
        return self._port

    def get_kobiton_session_id(self):
        with self._session_id_lock:
            return self.kobiton_session_id or 0

    # ------------------------------------------------------------------
    # Per-request: build upstream request, execute, post-process body.
    # ------------------------------------------------------------------

    def serve(self, request_uri, method, request_body):
        url, path = self._build_appium_url(request_uri)
        headers = {'Authorization': self._auth_string}
        # Appium upstream rejects bodied requests without a content type
        # ("desiredCapabilities or capabilities is required"). Match Java's
        # ProxyServer.java behavior and hard-code JSON for bodied methods.
        if request_body:
            headers['Content-Type'] = 'application/json'

        response = self._http.request(
            method, url,
            headers=headers, data=request_body,
            timeout=SOCKET_TIMEOUT_SECONDS,
            verify=not Config.TRUST_ALL_CERTS,
        )
        status_code = response.status_code
        content_type = response.headers.get('Content-Type', 'application/json')
        body_string = response.text

        try:
            if path == '/session' and method == 'POST' and _is_status_code_success(status_code):
                body_json = json.loads(body_string)
                value = body_json.get('value')
                if isinstance(value, dict) and 'kobitonSessionId' in value:
                    with self._session_id_lock:
                        self.kobiton_session_id = int(value['kobitonSessionId'])

                # JSON Wire format -> W3C
                if 'status' in body_json and 'sessionId' in body_json:
                    self._force_w3c = True
                    w3c_body = {'value': {
                        'capabilities': value if isinstance(value, dict) else {},
                        'sessionId': body_json['sessionId'],
                    }}
                    body_string = json.dumps(w3c_body)

            # Convert JSON Wire error response to W3C format for any endpoint
            # once a JSON-Wire /session response has flipped _force_w3c.
            if not _is_status_code_success(status_code) and self._force_w3c:
                body_json = json.loads(body_string)
                appium_error_code = int(body_json.get('status', 13))
                error_state = _ERROR_CODES.get(appium_error_code, 'unknown error')
                value = body_json.get('value')
                if isinstance(value, dict):
                    value['error'] = error_state
                    body_string = json.dumps(body_json)
        except Exception:
            # On any parse/shape mismatch, fall through with the original
            # upstream body.
            pass

        return status_code, body_string.encode('utf-8'), content_type

    def _build_appium_url(self, request_uri):
        path = request_uri
        if path.startswith('/wd/hub'):
            path = path[len('/wd/hub'):]

        combined = f"{Config.get_appium_server_url_with_auth().rstrip('/')}{path}"
        parsed = urlparse(combined)
        if Config.DEVICE_SOURCE == DeviceSource.KOBITON and self.current_command_id > 0:
            qs = parse_qsl(parsed.query, keep_blank_values=True)
            qs.append(('baseCommandId', str(self.current_command_id)))
            parsed = parsed._replace(query=urlencode(qs))
            url = urlunparse(parsed)
        else:
            url = combined

        return url, parsed.path

    @staticmethod
    def _find_available_port():
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('', 0))
            return s.getsockname()[1]
