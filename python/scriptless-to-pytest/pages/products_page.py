from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import APP_PACKAGE, BasePage


class ProductsPage(BasePage):
    CART_ICON = [
        (AppiumBy.ACCESSIBILITY_ID, 'cart-icon'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/cart-icon"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@content-desc="cart-icon"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/cart-icon"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@text="🛒 CART"]'),
    ]
    LOGOUT_BUTTON = [
        (AppiumBy.ACCESSIBILITY_ID, 'logout-button'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/logout-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@content-desc="logout-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/logout-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@text="LOGOUT"]'),
    ]
    CART_BADGE = BasePage.by_id('cart-badge')

    ADD_TO_CART_COMMAND_IDS = {
        1: 2023178672,
        2: 2023178756,
    }

    @staticmethod
    def add_to_cart_locators(position):
        element_id = f'add-to-cart-{position}'
        return [
            (AppiumBy.ACCESSIBILITY_ID, element_id),
            (AppiumBy.XPATH, f'//*[@resource-id="{APP_PACKAGE}:id/{element_id}"]'),
            (AppiumBy.XPATH, f'//android.widget.Button[@content-desc="{element_id}"]'),
            (AppiumBy.XPATH, f'//android.widget.Button[@resource-id="{APP_PACKAGE}:id/{element_id}"]'),
        ]

    def add_to_cart(self, position):
        if position not in self.ADD_TO_CART_COMMAND_IDS:
            raise ValueError(
                f'Product {position} has no recorded scroll metadata. Record adding it, '
                f'copy its resources/<command_id>.json into core/resources/, and register '
                f'the command ID in ProductsPage.ADD_TO_CART_COMMAND_IDS.'
            )
        self.tap(self.add_to_cart_locators(position),
                 command_id=self.ADD_TO_CART_COMMAND_IDS[position], scrollable=True)

    def open_cart(self):
        self.tap(self.CART_ICON, command_id=2023178839)

    def tap_logout(self):
        self.tap(self.LOGOUT_BUTTON, command_id=2023179080)

    def is_loaded(self):
        return self.is_displayed(self.CART_ICON)

    def cart_badge_count(self):
        return self.parse_count(self.text_of(self.CART_BADGE))

    def assert_cart_badge(self, expected_count):
        actual = self.cart_badge_count()
        if actual != expected_count:
            raise AssertionError(f'Cart badge: expected {expected_count}, got {actual}')
