import re
from decimal import Decimal

from appium.webdriver.common.appiumby import AppiumBy

from config import Timeouts

APP_PACKAGE = 'com.example.demoshop'


class BasePage:
    def __init__(self, driver):
        self.driver = driver

    @staticmethod
    def by_id(element_id):
        return [
            (AppiumBy.ACCESSIBILITY_ID, element_id),
            (AppiumBy.XPATH, f'//*[@resource-id="{APP_PACKAGE}:id/{element_id}"]'),
        ]

    def _find(self, locators, command_id=None, scrollable=False, timeout_ms=Timeouts.DEFAULT_MS):
        # Must be set before a scrollable find: the engine loads core/resources/<command_id>.json.
        if command_id is not None:
            self.driver.set_current_command_id(command_id)
        self.driver.switch_to_native_context()
        if scrollable:
            self.driver.hide_keyboard()
            return self.driver.find_visible_element_on_scrollable(timeout_ms, locators)
        return self.driver.find_visible_element(timeout_ms, locators)

    def tap(self, locators, command_id=None, scrollable=False):
        element = self._find(locators, command_id, scrollable)
        self.driver.touch_on_element(element, 0.5, 0.5)

    def type_into(self, locators, text, tap_command_id=None, type_command_id=None):
        self.tap(locators, command_id=tap_command_id)
        if type_command_id is not None:
            self.driver.set_current_command_id(type_command_id)
        self.driver.switch_to_native_context()
        self.driver.send_keys_to_active_element(text)

    def text_of(self, locators, timeout_ms=Timeouts.DEFAULT_MS):
        return self._find(locators, timeout_ms=timeout_ms).text

    def is_displayed(self, locators, timeout_ms=Timeouts.SCREEN_LOAD_MS):
        try:
            self._find(locators, timeout_ms=timeout_ms)
            return True
        except Exception:
            return False

    @staticmethod
    def parse_amount(text):
        match = re.search(r'\d+(?:\.\d+)?', text.replace(',', ''))
        if not match:
            raise AssertionError(f'No amount found in text: {text!r}')
        return Decimal(match.group())

    @staticmethod
    def parse_count(text):
        digits = re.sub(r'\D', '', text)
        return int(digits) if digits else 0
