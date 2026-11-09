import base64
import copy
import os
from pathlib import Path
from urllib.parse import urlparse

import requests
import yaml
from urllib3.exceptions import InsecureRequestWarning

from constants import DeviceSource

DEVICES_FILE = Path(__file__).with_name('devices.yaml')


class Config:
    API_USERNAME = os.getenv('KOBITON_USERNAME', '')
    API_KEY = os.getenv('KOBITON_API_KEY', '')

    APPIUM_SERVER_URL = 'https://api.kobiton.com/wd/hub'
    KOBITON_API_URL = 'https://api.kobiton.com'
    KOBITON_PORTAL_URL = 'https://portal.kobiton.com'
    DEVICE_SOURCE = DeviceSource.KOBITON

    IMPLICIT_WAIT_IN_MS = 10000
    DEVICE_WAITING_MAX_TRY_TIMES = 5
    DEVICE_WAITING_INTERVAL_IN_MS = 30000
    SEND_KEYS_DELAY_IN_MS = 1500
    IDLE_DELAY_IN_MS = 3000
    TRUST_ALL_CERTS = os.getenv('KOBITON_TRUST_ALL_CERTS', '').strip().lower() in ('1', 'true', 'yes')

    @classmethod
    def has_credentials(cls):
        return bool(cls.API_USERNAME and cls.API_KEY)

    @classmethod
    def _load_devices_file(cls):
        with open(DEVICES_FILE, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f) or {}

    @classmethod
    def get_device_profile_names(cls):
        return list((cls._load_devices_file().get('devices') or {}).keys())

    @classmethod
    def get_capabilities(cls, profile_name):
        data = cls._load_devices_file()
        devices = data.get('devices') or {}
        if profile_name not in devices:
            raise KeyError(
                f"Unknown device profile '{profile_name}'. "
                f"Available profiles in {DEVICES_FILE.name}: {sorted(devices)}"
            )
        capabilities = copy.deepcopy(data.get('defaults') or {})
        capabilities.update(copy.deepcopy(devices[profile_name]))
        return capabilities

    @classmethod
    def get_session_url(cls, session_id):
        return f"{cls.KOBITON_PORTAL_URL}/sessions/{session_id}"

    @classmethod
    def get_appium_server_url_with_auth(cls):
        parsed = urlparse(cls.APPIUM_SERVER_URL)
        port_part = f":{parsed.port}" if parsed.port else ""
        return f"{parsed.scheme}://{cls.API_USERNAME}:{cls.API_KEY}@{parsed.hostname}{port_part}{parsed.path}"

    @classmethod
    def get_basic_auth_string(cls):
        credentials = f"{cls.API_USERNAME}:{cls.API_KEY}"
        encoded = base64.b64encode(credentials.encode()).decode()
        return f"Basic {encoded}"


class Timeouts:
    DEFAULT_MS = 10000
    SCREEN_LOAD_MS = 20000


if Config.TRUST_ALL_CERTS:
    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
