import json
import os
import re
import time
import base64
import struct
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup
from appium import webdriver
from appium.options.common.base import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput
from config import Config
from constants import DeviceSource, PressType
from otp_service import OtpService
from proxy_server import ProxyServer
from utils import utils

NATIVE_CONTEXT = 'NATIVE_APP'

PLATFORM_NAMES = {
    'IOS': 'IOS',
    'ANDROID': 'ANDROID'
}

MOBILE_CAPABILITY_TYPES = {
    'PLATFORM_NAME': 'platformName',
    'DEVICE_NAME': 'deviceName',
    'PLATFORM_VERSION': 'platformVersion',
    'DEVICE_GROUP': 'deviceGroup'
}


class TestBase:
    def __init__(self):
        self._driver = None
        self._proxy = None
        self._is_ios = False
        self._screen_size = None
        self._desired_caps = None
        self._retina_scale = None
        self._device_name = None
        self._platform_version = None
        self._current_context = None
        self._current_window = None
        self.otp_service = OtpService()

    def setup(self, desired_caps, retina_scale=1):
        self._desired_caps = desired_caps
        self._retina_scale = retina_scale

        platform_name = desired_caps.get(MOBILE_CAPABILITY_TYPES['PLATFORM_NAME'], '')
        self._is_ios = platform_name.upper() == PLATFORM_NAMES['IOS']
        self._device_name = desired_caps.get(MOBILE_CAPABILITY_TYPES['DEVICE_NAME'], '')
        self._platform_version = desired_caps.get(MOBILE_CAPABILITY_TYPES['PLATFORM_VERSION'], '')

        self._proxy = ProxyServer()
        self._proxy.start()

        print(f"Initialize Appium driver with desiredCaps: {desired_caps}")
        server_url = self.get_appium_server_url()
        options = AppiumOptions().load_capabilities(desired_caps)
        self._driver = webdriver.Remote(server_url, options=options)

    def cleanup(self):
        if self._driver:
            try:
                self._driver.quit()
            except Exception:
                pass
        if self._proxy:
            self._proxy.stop()
        if self.otp_service:
            self.otp_service.cleanup()

    def set_current_command_id(self, command_id):
        print(f"Current command: {command_id}")
        if self._proxy:
            self._proxy.current_command_id = command_id

    def get_current_command_id(self):
        return self._proxy.current_command_id if self._proxy else 0

    def get_kobiton_session_id(self):
        return self._proxy.get_kobiton_session_id() if self._proxy else 0

    def get_appium_server_url(self):
        if Config.DEVICE_SOURCE == DeviceSource.KOBITON:
            return self._proxy.get_server_url() + '/wd/hub'
        return Config.get_appium_server_url_with_auth()

    def get_app_url(self, app_version_id):
        headers = {
            'Authorization': Config.get_basic_auth_string(),
            'Content-Type': 'application/json',
        }
        url = f"{Config.KOBITON_API_URL}/v1/app/versions/{app_version_id}/downloadUrl"
        response = requests.get(url, headers=headers, verify=not Config.TRUST_ALL_CERTS)
        response.raise_for_status()
        return response.json()['url']

    def update_settings(self):
        self._driver.update_settings({'ignoreUnimportantViews': True})

    def set_implicit_wait(self, ms):
        self._driver.implicitly_wait(ms / 1000)

    # ------------------------------------------------------------------
    # Context / window state machine.
    # ------------------------------------------------------------------

    def update_current_context(self):
        previous = self._current_context
        self._current_context = self._driver.context
        if previous != self._current_context:
            print(f"Context is changed from {previous} to {self._current_context}")
        return previous

    def is_native_context(self):
        return self._current_context == NATIVE_CONTEXT

    def switch_context(self, context):
        if context == self._current_context:
            return
        print(f"Switch to {context} context")
        self._driver.switch_to.context(context)
        self._current_context = context

    def switch_to_native_context(self):
        self.switch_context(NATIVE_CONTEXT)

    def switch_window(self, window):
        if window == self._current_window:
            return
        print(f"Switch to {window} window")
        self._driver.switch_to.window(window)
        self._current_window = window
        self._current_context = None

    def get_webview_xpath_selector(self):
        return '(//XCUIElementTypeWebView)[1]' if self._is_ios else '(//android.webkit.WebView)[1]'

    def _get_webview_tag(self):
        return 'XCUIElementTypeWebView' if self._is_ios else 'android.webkit.WebView'

    def _collect_native_texts(self):
        try:
            root = ET.fromstring(self._driver.page_source)
        except ET.ParseError:
            return []

        webview_tag = self._get_webview_tag()
        webview = next((el for el in root.iter() if el.tag == webview_tag), None)
        scan_root = webview if webview is not None else root

        exclude_ios = {'XCUIElementTypeImage', 'XCUIElementTypeSwitch'}
        native_texts = []
        for el in scan_root.iter():
            # Leaf elements only.
            if list(el):
                continue
            if self._is_ios:
                if el.tag in exclude_ios:
                    continue
                text = el.get('value') or el.get('label') or ''
            else:
                text = el.get('text') or ''
                if not text and el.tag == 'android.view.View':
                    text = el.get('content-desc') or ''
            text = text.strip().lower()
            if text:
                native_texts.append(text)
        return native_texts

    def collect_web_contexts_info(self, native_texts):
        contexts = self._driver.contexts
        if not any(c != NATIVE_CONTEXT for c in contexts):
            print(f"No web context is available, contexts: {', '.join(contexts)}")

        infos = []
        for context in contexts:
            if not (context.startswith('WEBVIEW') or context == 'CHROMIUM'):
                continue
            info = {
                'context': context, 'window': None, 'is_hidden': False,
                'source_length': 0, 'match_texts': 0, 'match_texts_percent': 0,
            }
            try:
                self.switch_context(context)
                info['is_hidden'] = bool(self._driver.execute_script('return document.hidden'))
                info['window'] = self._driver.current_window_handle
                infos.append(info)
                if info['is_hidden']:
                    continue
                source = self._driver.page_source
            except Exception as ex:
                print(f"Bad context {context}, error \"{ex}\", skipping...")
                continue

            if not source:
                continue
            info['source_length'] = len(source)
            if not native_texts:
                continue

            soup = BeautifulSoup(source, 'html.parser')
            body_text = (soup.body or soup).get_text(' ').lower()
            matches = sum(1 for t in native_texts if t in body_text)
            info['match_texts'] = matches
            info['match_texts_percent'] = matches * 100 // len(native_texts)
            if info['match_texts_percent'] >= 80:
                break
        return infos

    def _switch_to_web_context_core(self):
        self.switch_to_native_context()
        native_texts = self._collect_native_texts()

        infos = self.collect_web_contexts_info(native_texts)
        if not infos:
            raise Exception('Cannot find any usable web contexts')

        if Config.DEVICE_SOURCE == DeviceSource.OTHER:
            self.switch_context(infos[0]['context'])
            windows = self._driver.window_handles
            if len(windows) > 1:
                current_window = self._driver.current_window_handle
                for window in windows:
                    if window == current_window:
                        continue
                    self.switch_window(window)
                    infos.extend(self.collect_web_contexts_info(native_texts))

        infos = [i for i in infos if not i['is_hidden']]
        if not infos:
            raise Exception('Cannot find any usable web contexts')

        infos.sort(key=lambda i: i['match_texts_percent'], reverse=True)
        if infos[0]['match_texts_percent'] > 40:
            best = infos[0]
        else:
            infos.sort(key=lambda i: i['source_length'], reverse=True)
            best = infos[0]

        if best['window']:
            self.switch_window(best['window'])
        self.switch_context(best['context'])
        print(
            f"Switched to {best['context']} web context in {best['window']} window "
            f"successfully with confident {best['match_texts_percent']}%"
        )
        return best['context']

    def switch_to_web_context(self):
        # Some web pages take up to 30s to expose a web context; retry a few times.
        last_exc = None
        for attempt in range(1, 5):
            print(f"Finding a web context {utils.convert_to_ordinal(attempt)} attempt")
            try:
                return self._switch_to_web_context_core()
            except Exception as e:
                last_exc = e
                if attempt < 4:
                    time.sleep(10)
        raise last_exc

    def _find_elements(self, timeout_ms, locators, multiple, root=None):
        finder = root if root is not None else self._driver
        print(f"Find element by: {utils.get_locator_text(locators)}")

        # Single-locator fast path: let Appium's implicit-wait do the polling
        # in one driver call instead of looping every 5s on our side.
        if len(locators) == 1:
            self.set_implicit_wait(timeout_ms)
            try:
                elements = finder.find_elements(*locators[0])
                if (multiple and elements) or (not multiple and len(elements) == 1):
                    if self.is_flex_correct_enabled():
                        self.update_current_context()
                    return elements
                raise Exception(f"Cannot find element by: {locators}")
            finally:
                self.set_implicit_wait(Config.IMPLICIT_WAIT_IN_MS)

        # Multi-locator: iterate candidates with retries until one yields the
        # desired number of elements (1+ if `multiple`, exactly 1 if not).
        wait_interval_ms = 5000
        deadline = time.time() + timeout_ms / 1000

        while True:
            self.set_implicit_wait(0)
            for locator in locators:
                try:
                    elements = finder.find_elements(*locator)
                    if (multiple and elements) or (not multiple and len(elements) == 1):
                        self.set_implicit_wait(Config.IMPLICIT_WAIT_IN_MS)
                        if self.is_flex_correct_enabled():
                            self.update_current_context()
                        return elements
                except Exception:
                    pass
            self.set_implicit_wait(Config.IMPLICIT_WAIT_IN_MS)
            if time.time() >= deadline:
                raise Exception(f"Cannot find element by: {locators}")
            time.sleep(wait_interval_ms / 1000)

    def find_element_by(self, *locators, timeout_ms=None, root=None):
        if root is not None:
            timeout = timeout_ms if timeout_ms is not None else Config.IMPLICIT_WAIT_IN_MS
        elif timeout_ms is not None:
            timeout = max(Config.IMPLICIT_WAIT_IN_MS, timeout_ms)
        else:
            timeout = Config.IMPLICIT_WAIT_IN_MS
        found = self._find_elements(timeout, list(locators), multiple=True, root=root)
        return found[0]

    def find_elements_by(self, *locators, timeout_ms=None, root=None):
        if root is not None:
            timeout = timeout_ms if timeout_ms is not None else Config.IMPLICIT_WAIT_IN_MS
        elif timeout_ms is not None:
            timeout = max(Config.IMPLICIT_WAIT_IN_MS, timeout_ms)
        else:
            timeout = Config.IMPLICIT_WAIT_IN_MS
        return self._find_elements(timeout, list(locators), multiple=True, root=root)

    def find_single_element_by(self, locator):
        print(f"Find element by: {locator}")
        try:
            return self._driver.find_element(*locator)
        except Exception:
            raise Exception(f"Cannot find element by: {locator}")

    def sleep(self, duration_ms):
        print(f"Sleep for {duration_ms} ms")
        time.sleep(duration_ms / 1000)

    def press_android_key(self, keycode):
        self._driver.press_keycode(keycode)

    def _find_visible_element_core(self, timeout_ms, locators):
        found = self._find_elements(timeout_ms, locators, multiple=True)
        visible = None
        for element in found:
            if self.is_native_context():
                rect = element.rect
                ok = rect['x'] >= 0 and rect['y'] >= 0 and rect['width'] > 0 and rect['height'] > 0
            else:
                ok = self.execute_script_on_web_element(element, 'isElementVisible') == 'true'
            if ok:
                visible = element
                break

        if visible is None:
            raise Exception(f"Cannot find visible element by: {locators}")

        if not self.is_native_context():
            self.scroll_to_web_element(visible)
        return visible

    def find_visible_element(self, timeout_ms, locators):
        max_attempts = 1 if self.is_native_context() else 3
        last_exc = None
        for attempt in range(1, max_attempts + 1):
            print(
                f"Finding visible element {utils.convert_to_ordinal(attempt)} attempt "
                f"with locator: {utils.get_locator_text(locators)}"
            )
            try:
                return self._find_visible_element_core(timeout_ms, locators)
            except Exception as e:
                last_exc = e
                # In web context, try a different web context before retrying
                # (popup / new tab may have stolen the active context).
                if not self.is_native_context():
                    try:
                        self.switch_to_web_context()
                    except Exception:
                        pass
                if attempt < max_attempts:
                    time.sleep(3)
        raise last_exc

    def find_visible_element_on_scrollable(self, timeout_ms, locators):
        command_id = self.get_current_command_id()
        info_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            'resources', f"{command_id}.json",
        )
        with open(info_path, 'r', encoding='utf-8') as f:
            info_map = json.load(f)

        screen = self.get_screen_size()
        state = {'scrollable': None, 'swiped_to_top': False}

        def on_error(e, attempt):
            print(
                f"Cannot find visible element on scrollable "
                f"{utils.convert_to_ordinal(attempt)} attempt, error: {e}"
            )
            if not self.is_native_context() and attempt == 1:
                time.sleep(10)
                self.switch_to_web_context()
                return

            if state['scrollable'] is None:
                xpath = info_map['scrollableElementXpath']
                state['scrollable'] = self._driver.find_element('xpath', xpath)

            if not state['swiped_to_top']:
                self.hide_keyboard()
                self.swipe_to_top(self.get_center_of_element(state['scrollable']))
                state['swiped_to_top'] = True
            else:
                center = self.get_center_of_element(state['scrollable'])
                rect = state['scrollable'].rect
                if center['y'] > screen['y'] or rect['height'] < 0:
                    center['y'] = screen['y'] // 2
                to_y = max(int(center['y'] - rect['height'] / 1.5), 0)
                self.drag_by_point(center, {'x': center['x'], 'y': to_y})

        def task(attempt):
            print(
                f"Finding visible element on scrollable "
                f"{utils.convert_to_ordinal(attempt)} attempt with locator: {locators}"
            )
            return self._find_visible_element_core(timeout_ms, locators)

        found = utils.retry(task, on_error, 5, 3000)
        if found is None:
            raise Exception('Cannot find any visible element on scrollable')
        return found

    def is_button_element(self, element):
        tag = element.tag_name
        return bool(tag) and 'Button' in tag

    def click_element(self, element):
        print(f"Click on element with type: {element.tag_name}")
        element.click()

    def touch_on_element(self, element, relative_x, relative_y):
        if self.is_button_element(element):
            self.click_element(element)
            return
        self.touch_at_relative_point_of_element(element, relative_x, relative_y)

    def touch_at_relative_point_of_element(self, element, relative_x, relative_y):
        print(
            f"Touch on element {element.tag_name} at relative point ({relative_x} {relative_y})"
        )
        if self.is_native_context():
            native_rect = element.rect
        else:
            web_rect = self.get_web_element_rect(element)
            native_rect = self.calculate_native_rect(web_rect)
        self.touch_at_point(self.get_absolute_point(relative_x, relative_y, native_rect))

    def touch_at_center_of_element(self, element):
        print(f"Touch at center of element {element.tag_name}")
        self.touch_at_point(self.get_center_of_element(element))

    def touch_at_relative_point(self, relative_x, relative_y):
        print(f"Touch at relative point ({relative_x}, {relative_y})")
        self.touch_at_point(self.get_absolute_point(relative_x, relative_y))

    def touch_at_point(self, point):
        print(f"Touch at point ({point['x']}, {point['y']})")
        actions = ActionBuilder(
            self._driver,
            mouse=PointerInput(interaction.POINTER_TOUCH, 'finger'),
            duration=0,
        )
        pointer = actions.pointer_action
        pointer.move_to_location(point['x'], point['y'])
        pointer.pointer_down()
        pointer.pointer_up()
        actions.perform()

    def swipe_by_point(self, rel_x1, rel_y1, rel_x2, rel_y2, duration):
        print(
            f"Swipe from relative point ({rel_x1}, {rel_y1}) to "
            f"relative point ({rel_x2}, {rel_y2}) with duration {duration}"
        )
        self._swipe(
            self.get_absolute_point(rel_x1, rel_y1),
            self.get_absolute_point(rel_x2, rel_y2),
            duration,
        )

    def _swipe(self, from_p, to_p, duration):
        print(
            f"Swipe from point ({from_p['x']}, {from_p['y']}) to "
            f"point ({to_p['x']}, {to_p['y']}) with duration {duration}"
        )
        self._driver.swipe(from_p['x'], from_p['y'], to_p['x'], to_p['y'], duration)
        # swipe() returns as soon as the gesture is dispatched, but the swipe animation
        # is still running on screen. Wait for its full duration so the next action sees a stable screen.
        self.sleep(duration)

    def swipe_from_point(self, from_point, relative_offset_x, relative_offset_y, duration_ms):
        screen = self.get_screen_size()
        to_x = max(int(from_point['x'] + relative_offset_x * screen['x']), 0)
        to_y = max(int(from_point['y'] + relative_offset_y * screen['y']), 0)
        self._swipe(from_point, {'x': to_x, 'y': to_y}, duration_ms)

    def swipe_to_top(self, from_point):
        screen = self.get_screen_size()
        to_point = {'x': from_point['x'], 'y': screen['y'] - 10}
        print(
            f"Swipe to top from point ({from_point['x']}, {from_point['y']}) "
            f"to point ({to_point['x']}, {to_point['y']})"
        )
        self._swipe(from_point, to_point, 100)
        # A fast swipe triggers scroll inertia that keeps the content moving after the gesture ends.
        # Wait for the screen to settle before interacting again.
        self.sleep(Config.IDLE_DELAY_IN_MS)

    def drag_by_point(self, from_point, to_point):
        # Linear-velocity drag built as a single W3C pointer sequence so the
        # gesture is uninterrupted (no UI settle between steps).
        steps = 20
        total_duration_ms = 5000
        step_duration_ms = total_duration_ms // steps

        actions = ActionBuilder(
            self._driver,
            mouse=PointerInput(interaction.POINTER_TOUCH, 'finger'),
            duration=step_duration_ms,
        )
        pointer = actions.pointer_action
        pointer.move_to_location(from_point['x'], from_point['y'])
        pointer.pointer_down()
        x_step = (to_point['x'] - from_point['x']) / steps
        y_step = (to_point['y'] - from_point['y']) / steps
        for i in range(1, steps + 1):
            nx = int(from_point['x'] + x_step * i)
            ny = int(from_point['y'] + y_step * i)
            pointer.move_to_location(nx, ny)
        pointer.pointer_up()

        print(
            f"Drag from point ({from_point['x']}, {from_point['y']}) to "
            f"point ({to_point['x']}, {to_point['y']})"
        )
        actions.perform()
        # perform() returns once the gesture is dispatched; the drag animation still runs on screen.
        # Wait for its full duration so the next action sees a stable screen.
        self.sleep(total_duration_ms)

    def drag_from_point(self, from_point, relative_offset_x, relative_offset_y):
        screen = self.get_screen_size()
        to_x = max(int(from_point['x'] + relative_offset_x * screen['x']), 0)
        to_y = max(int(from_point['y'] + relative_offset_y * screen['y']), 0)
        self.drag_by_point(from_point, {'x': to_x, 'y': to_y})

    def hide_keyboard(self):
        try:
            if not self._driver.is_keyboard_shown():
                return
            print("Keyboard is shown, hide it")
            self._driver.hide_keyboard()
        except Exception:
            pass

    def press_button_multiple(self, button_type, count):
        print(f"Press on {button_type} key {count} times")
        # Bulk-delete via a single send_keys call.
        if button_type == PressType.DELETE:
            self.send_keys_to_active_element(self._delete_char() * count)
            return
        for _ in range(count):
            self.press_button(button_type)

    def press_button(self, button_type):
        print(f"Press on {button_type} key")

        if button_type == PressType.ENTER:
            if self._is_ios:
                self.send_keys_to_active_element('\n')
            else:
                self._driver.press_keycode(66)
            time.sleep(Config.IDLE_DELAY_IN_MS / 1000)
            return

        if button_type == PressType.DELETE:
            self.send_keys_to_active_element(self._delete_char())
            return

        if button_type == PressType.HOME:
            if self._is_ios:
                need_press_home = True
                try:
                    if self._driver.is_locked():
                        self._driver.unlock()
                        need_press_home = False
                except Exception as ex:
                    print(f"Cannot check device locked or unlock device, error: {ex}")
                if need_press_home:
                    self._driver.execute_script('mobile: pressButton', {'name': 'home'})
            else:
                self._driver.press_keycode(3)
            time.sleep(Config.IDLE_DELAY_IN_MS / 1000)
            return

        if button_type == PressType.BACK:
            self._driver.press_keycode(4)
            time.sleep(Config.IDLE_DELAY_IN_MS / 1000)
            return

        if button_type == PressType.POWER:
            if self._is_ios:
                if self._driver.is_locked():
                    self._driver.unlock()
                else:
                    self._driver.lock()
            else:
                self._driver.press_keycode(26)
            time.sleep(Config.IDLE_DELAY_IN_MS / 1000)
            return

        if button_type == PressType.APP_SWITCH:
            self._driver.press_keycode(187)
            time.sleep(Config.IDLE_DELAY_IN_MS / 1000)
            return

        raise Exception(f"Don't support press {button_type} key")

    def _delete_char(self):
        if Config.DEVICE_SOURCE == DeviceSource.KOBITON or self._is_ios:
            return '\b'
        return Keys.BACK_SPACE

    def clear_text_field(self, max_chars):
        print(f"Clear text field, maximum {max_chars} characters")
        self.press_button_multiple(PressType.DELETE, max_chars)

    def activate_app(self, app_package):
        print(f"Activate app {app_package}")
        self._driver.activate_app(app_package)
        time.sleep(Config.IDLE_DELAY_IN_MS / 1000)

    def send_keys(self, element, text):
        print(f"Send keys '{text}' on element {element.tag_name}")
        element.send_keys(text)

    def send_keys_to_active_element(self, text):
        time.sleep(Config.SEND_KEYS_DELAY_IN_MS / 1000)
        print(f"Send keys: {text}")
        try:
            # W3C key actions — preferred path.
            actions = ActionBuilder(self._driver, duration=0)
            key_input = actions.key_action
            for ch in text:
                key_input.key_down(ch)
                key_input.key_up(ch)
            actions.perform()
        except Exception:
            # Some devices reject W3C key actions — fall back to the active
            # element's send_keys.
            self._driver.switch_to.active_element.send_keys(text)
        time.sleep(Config.SEND_KEYS_DELAY_IN_MS / 1000)

    def swipe_on_element(self, element, x1, y1, x2, y2, duration=800):
        print(
            f"Swipe on element {element.tag_name} from relative point ({x1} {y1}) "
            f"to relative point ({x2} {y2})"
        )
        if self.is_native_context():
            native_rect = element.rect
        else:
            web_rect = self.get_web_element_rect(element)
            native_rect = self.calculate_native_rect(web_rect)
        from_p = self.get_absolute_point(x1, y1, native_rect)
        to_p = self.get_absolute_point(x2, y2, native_rect)
        self._swipe(from_p, to_p, duration)

    def rotate_screen(self, orientation):
        print(f"Rotate screen to {orientation}")
        self._driver.orientation = orientation.value
        time.sleep(Config.IDLE_DELAY_IN_MS / 1000)

    def set_location(self, lat, lng, altitude=0):
        print(f"Set location to ({lat}, {lng}, {altitude})")
        self._driver.set_location(lat, lng, altitude)
        time.sleep(Config.IDLE_DELAY_IN_MS / 1000)

    def idle(self):
        time.sleep(Config.IDLE_DELAY_IN_MS / 1000)

    def get_available_device(self, capabilities):
        params = {
            'isOnline': 'true',
            'isBooked': 'false',
            'deviceName': capabilities.get('deviceName'),
            'platformVersion': capabilities.get('platformVersion'),
            'platformName': capabilities.get('platformName'),
            'deviceGroup': capabilities.get('deviceGroup'),
        }
        response = requests.get(
            f"{Config.KOBITON_API_URL}/v1/devices",
            params={k: v for k, v in params.items() if v is not None},
            headers={'Authorization': Config.get_basic_auth_string()},
            verify=not Config.TRUST_ALL_CERTS,
        )
        if response.status_code != 200:
            raise Exception(response.text)

        data = response.json() or {}
        for key in ('cloudDevices', 'privateDevices', 'favoriteDevices',
                    'itaTrialCloudDevices', 'virtualDevices', 'deviceListData'):
            devices = data.get(key) or []
            if devices:
                return devices[0]
        return None

    def find_online_device(self, capabilities):
        if Config.DEVICE_SOURCE != DeviceSource.KOBITON:
            return None

        device_name = capabilities.get('deviceName')
        device_group = capabilities.get('deviceGroup')
        platform_name = capabilities.get('platformName')
        platform_version = capabilities.get('platformVersion')

        device = None
        for attempt in range(1, Config.DEVICE_WAITING_MAX_TRY_TIMES + 1):
            print(
                f"Is device with capabilities: (deviceName: {device_name}, deviceGroup: {device_group}, "
                f"platformName: {platform_name}, platformVersion: {platform_version}) online? "
                f"Retrying at {utils.convert_to_ordinal(attempt)} time"
            )
            try:
                device = self.get_available_device(capabilities)
            except Exception as e:
                print(f"Error checking device availability: {e}")
            if device:
                resolved_name = device.get('deviceName') if isinstance(device, dict) else None
                resolved_platform = device.get('platformName') if isinstance(device, dict) else None
                resolved_version = device.get('platformVersion') if isinstance(device, dict) else None
                print(
                    f"Device is found with capabilities: (deviceName: {resolved_name}, "
                    f"deviceGroup: {device_group}, platformName: {resolved_platform}, "
                    f"platformVersion: {resolved_version})"
                )
                return device
            if attempt < Config.DEVICE_WAITING_MAX_TRY_TIMES:
                time.sleep(Config.DEVICE_WAITING_INTERVAL_IN_MS / 1000)

        raise Exception(
            f"Cannot find any online devices with capabilities: (deviceName: {device_name}, "
            f"deviceGroup: {device_group}, platformName: {platform_name}, "
            f"platformVersion: {platform_version})"
        )

    # ------------------------------------------------------------------
    # Web-element DOM <-> native coordinate pipeline.
    # ------------------------------------------------------------------

    def _load_web_element_script(self):
        if getattr(self, '_web_element_script', None) is None:
            script_path = os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                'resources', 'execute-script-on-web-element.js',
            )
            with open(script_path, 'r', encoding='utf-8') as f:
                self._web_element_script = f.read()
        return self._web_element_script

    def execute_script_on_web_element(self, element, command):
        script = self._load_web_element_script()
        return self._driver.execute_script(script, element, command)

    def scroll_to_web_element(self, element):
        print(f"Scroll to web element {element.tag_name}")
        self.execute_script_on_web_element(element, 'scrollIntoView')
        time.sleep(1)

    def get_web_element_rect(self, element):
        result_string = self.execute_script_on_web_element(element, 'getBoundingClientRect')
        result = json.loads(result_string)
        scale = self._retina_scale or 1
        return {
            'x': int(result['x'] / scale),
            'y': int(result['y'] / scale),
            'width': int(result['width'] / scale),
            'height': int(result['height'] / scale),
        }

    def find_webview(self):
        return self._driver.find_element('xpath', self.get_webview_xpath_selector())

    def calculate_native_rect(self, web_element_rect):
        scale = float(self._driver.execute_script('return window.visualViewport.scale'))
        self.execute_script_on_web_element(None, 'insertKobitonWebview')
        self.switch_to_native_context()

        try:
            xpath = (
                "//*[@label='__kobiton_webview__']" if self._is_ios
                else "//*[@text='__kobiton_webview__']"
            )
            kobiton_webview = self._driver.find_element('xpath', xpath)
            wv_rect = kobiton_webview.rect
            native_rect = {
                'x': web_element_rect['x'] + wv_rect['x'],
                'y': web_element_rect['y'] + wv_rect['y'],
                'width': web_element_rect['width'],
                'height': web_element_rect['height'],
            }
            self.crop_rect(native_rect, wv_rect)
            self.scale_rect(native_rect, scale)
            return native_rect
        except Exception as e:
            if self._is_ios:
                raise

            # Android fallback: locate the WebView region by chrome chrome.
            print(str(e))
            try:
                native_doc = ET.fromstring(self._driver.page_source)
            except ET.ParseError:
                raise Exception('Cannot parse native page source')

            chrome_ids = {
                'com.android.chrome:id/toolbar', 'com.android.chrome:id/url_bar',
                'com.android.chrome:id/location_bar', 'com.android.chrome:id/home_button',
                'com.android.chrome:id/tab_switcher_button', 'com.android.chrome:id/menu_button',
            }
            webview_top = 0
            toolbar = next(
                (el for el in native_doc.iter() if el.get('resource-id') in chrome_ids),
                None,
            )
            if toolbar is not None:
                tr = self.get_rect_of_xml_element(toolbar)
                webview_top = tr['y'] + tr['height']
            else:
                for el in native_doc.iter():
                    if el.get('package') != 'com.android.chrome':
                        continue
                    try:
                        r = self.get_rect_of_xml_element(el)
                    except Exception:
                        continue
                    if r['y'] > 0 and r['height'] > 0:
                        webview_top = r['y']
                        break
                if webview_top == 0:
                    raise Exception('Cannot calculate native rect for web element')

            window_size = self._driver.get_window_size()
            webview_rect = {
                'x': 0, 'y': webview_top,
                'width': window_size['width'],
                'height': window_size['height'] - webview_top,
            }

            native_rect = {
                'x': webview_rect['x'] + web_element_rect['x'],
                'y': webview_rect['y'] + web_element_rect['y'],
                'width': web_element_rect['width'],
                'height': web_element_rect['height'],
            }
            self.crop_rect(native_rect, webview_rect)
            self.scale_rect(native_rect, scale)
            return native_rect

    # ------------------------------------------------------------------
    # Geometry helpers.
    # ------------------------------------------------------------------

    def get_screen_size(self):
        if self._screen_size is None:
            data = base64.b64decode(self._driver.get_screenshot_as_base64())
            # PNG IHDR: width at bytes 16-20, height at 20-24 (big-endian).
            width, height = struct.unpack('>II', data[16:24])
            self._screen_size = {'x': width, 'y': height}
        return self._screen_size

    def get_app_offset(self):
        if not self._is_ios:
            return {'x': 0, 'y': 0}
        try:
            root = self._driver.find_element(
                'xpath', '//XCUIElementTypeApplication | //XCUIElementTypeOther'
            )
            size = root.size
            screen = self.get_screen_size()
            scale = self._retina_scale or 1
            screen_w_scaled = screen['x'] / scale
            screen_h_scaled = screen['y'] / scale

            offset_x = int((screen_w_scaled - size['width']) / 2) if screen_w_scaled > size['width'] else 0
            offset_y = int((screen_h_scaled - size['height']) / 2) if screen_h_scaled > size['height'] else 0
            return {'x': offset_x, 'y': offset_y}
        except Exception as e:
            print(f"get_app_offset failed: {e}")
            return {'x': 0, 'y': 0}

    def get_absolute_point(self, relative_x, relative_y, rect=None):
        if rect is not None:
            offset = self.get_app_offset()
            return {
                'x': int(rect['x'] + rect['width'] * relative_x + offset['x']),
                'y': int(rect['y'] + rect['height'] * relative_y + offset['y']),
            }
        screen = self.get_screen_size()
        scale = self._retina_scale or 1
        if scale > 1:
            return {
                'x': round(relative_x * screen['x'] / scale),
                'y': round(relative_y * screen['y'] / scale),
            }
        return {
            'x': round(relative_x * screen['x']),
            'y': round(relative_y * screen['y']),
        }

    def get_center_of_element(self, element):
        rect = element.rect
        return {
            'x': rect['x'] + rect['width'] // 2,
            'y': rect['y'] + rect['height'] // 2,
        }

    def get_center_of_rect(self, rect):
        return {
            'x': rect['x'] + rect['width'] // 2,
            'y': rect['y'] + rect['height'] // 2,
        }

    def get_rect_of_xml_element(self, element):
        # Android bounds: "[x1,y1][x2,y2]"
        bounds = element.get('bounds', '')
        parts = [p for p in bounds.replace('[', ',').replace(']', ',').split(',') if p.strip()]
        x = int(parts[0]); y = int(parts[1])
        x2 = int(parts[2]); y2 = int(parts[3])
        return {'x': x, 'y': y, 'width': x2 - x, 'height': y2 - y}

    def crop_rect(self, rect, bound_rect):
        if rect['x'] < bound_rect['x']:
            rect['x'] = bound_rect['x']
        elif rect['x'] > bound_rect['x'] + bound_rect['width']:
            rect['x'] = bound_rect['x'] + bound_rect['width']

        if rect['y'] < bound_rect['y']:
            rect['y'] = bound_rect['y']
        elif rect['y'] > bound_rect['y'] + bound_rect['height']:
            rect['y'] = bound_rect['y'] + bound_rect['height']

        if rect['x'] + rect['width'] > bound_rect['x'] + bound_rect['width']:
            rect['width'] = bound_rect['x'] + bound_rect['width'] - rect['x']

        if rect['y'] + rect['height'] > bound_rect['y'] + bound_rect['height']:
            rect['height'] = bound_rect['y'] + bound_rect['height'] - rect['y']

    def scale_rect(self, rect, scale):
        rect['x'] = int(rect['x'] * scale)
        rect['y'] = int(rect['y'] * scale)
        rect['width'] = int(rect['width'] * scale)
        rect['height'] = int(rect['height'] * scale)

    def is_flex_correct_enabled(self):
        return (
            Config.DEVICE_SOURCE == DeviceSource.KOBITON
            and bool((self._desired_caps or {}).get('kobiton:flexCorrect'))
        )

    def save_debug_resource(self):
        try:
            dirname = re.sub(
                r'[^a-zA-Z0-9]', '_',
                f"{self._device_name or ''} {self._platform_version or ''}",
            )
            debug_dir = os.path.join(os.getcwd(), 'debug', dirname)
            os.makedirs(debug_dir, exist_ok=True)
            print(f"Save source & screenshot for debugging at {debug_dir}")

            with open(os.path.join(debug_dir, 'source.xml'), 'w', encoding='utf-8') as f:
                f.write(self._driver.page_source or '')

            screenshot = self._driver.get_screenshot_as_base64()
            with open(os.path.join(debug_dir, 'screenshot.png'), 'wb') as f:
                f.write(base64.b64decode(screenshot))
        except Exception as e:
            print(f"Could not save debug resource: {e}")
