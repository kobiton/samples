from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import BasePage


class CartPage(BasePage):
    PLACE_ORDER_BUTTON = [
        (AppiumBy.ACCESSIBILITY_ID, 'place-order-button'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/place-order-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@content-desc="place-order-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/place-order-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@text="PLACE ORDER"]'),
    ]
    CART_TOTAL = BasePage.by_id('cart-total')

    @staticmethod
    def item_name_locators(index):
        return BasePage.by_id(f'cart-item-name-{index}')

    def place_order(self):
        self.tap(self.PLACE_ORDER_BUTTON, command_id=2023178924)

    def total(self):
        return self.parse_amount(self.text_of(self.CART_TOTAL))

    def item_names(self, count):
        return [self.text_of(self.item_name_locators(i)) for i in range(1, count + 1)]

    def assert_items(self, expected_names):
        actual = self.item_names(len(expected_names))
        missing = [name for name in expected_names if not any(name in text for text in actual)]
        if missing:
            raise AssertionError(f'Cart items: expected {expected_names}, got {actual} (missing {missing})')

    def assert_total(self, expected_total):
        actual = self.total()
        if actual != expected_total:
            raise AssertionError(f'Cart total: expected {expected_total}, got {actual}')
