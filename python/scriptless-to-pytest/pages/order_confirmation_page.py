from appium.webdriver.common.appiumby import AppiumBy

from config import Timeouts
from pages.base_page import BasePage


class OrderConfirmationPage(BasePage):
    BACK_TO_PRODUCTS_BUTTON = [
        (AppiumBy.ACCESSIBILITY_ID, 'back-to-products-button'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/back-to-products-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@content-desc="back-to-products-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/back-to-products-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@text="BACK TO PRODUCTS"]'),
        (AppiumBy.CLASS_NAME, 'android.widget.Button'),
    ]
    ORDER_CONFIRMATION = BasePage.by_id('order-confirmation')

    def message(self):
        return self.text_of(self.ORDER_CONFIRMATION, timeout_ms=Timeouts.SCREEN_LOAD_MS)

    def assert_order_placed(self, expected_message):
        actual = self.message()
        if expected_message not in actual:
            raise AssertionError(f'Order confirmation: expected {expected_message!r}, got {actual!r}')

    def back_to_products(self):
        self.tap(self.BACK_TO_PRODUCTS_BUTTON, command_id=2023179016)
