from test_base import TestBase
from config import Config
from constants import PressType, Orientation
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.common.by import By


class TestApp(TestBase):
    # Not a pytest collection target — TestApp is a helper that wraps TestBase,
    # invoked from test_suite.py. The leading "Test" matches Java's class name
    # for parity; this flag prevents pytest from trying to instantiate it.
    __test__ = False

    def setup(self, desired_caps, retina_scale=1):
        super().setup(desired_caps, retina_scale)
        session_id = self.get_kobiton_session_id()
        if session_id:
            print(f"View session at: https://portal.kobiton.com/sessions/{session_id}")

    def run(self):
        try:
            self.update_settings()
            self.switch_to_native_context()
            self.set_implicit_wait(Config.IMPLICIT_WAIT_IN_MS)

            self.set_current_command_id(2023177828)
            self.switch_to_native_context()
            locatorUsernameInput = [(AppiumBy.ACCESSIBILITY_ID, 'username-input'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/username-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="username-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/username-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@text="Username"]')]
            elementUsernameInput = self.find_visible_element(8666, locatorUsernameInput)
            self.touch_on_element(elementUsernameInput, 0.474, 0.478)
            
            self.set_current_command_id(2023177829)
            self.switch_to_native_context()
            self.send_keys_to_active_element('standard_user ')
            
            self.set_current_command_id(2023177830)
            self.switch_to_native_context()
            locatorPasswordInput = [(AppiumBy.ACCESSIBILITY_ID, 'password-input'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@text="Password"]')]
            elementPasswordInput = self.find_visible_element(6025, locatorPasswordInput)
            self.touch_on_element(elementPasswordInput, 0.162, 0.213)
            
            self.set_current_command_id(2023177859)
            self.switch_to_native_context()
            self.send_keys_to_active_element('secret123')
            
            self.set_current_command_id(2023177860)
            self.switch_to_native_context()
            locatorLoginButton = [(AppiumBy.ACCESSIBILITY_ID, 'login-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="LOGIN"]'), (AppiumBy.CLASS_NAME, 'android.widget.Button')]
            elementLoginButton = self.find_visible_element(2452, locatorLoginButton)
            self.touch_on_element(elementLoginButton, 0.181, 0.556)
            
            self.set_current_command_id(2023177893)
            self.switch_to_native_context()
            locatorLoginButton1 = [(AppiumBy.ACCESSIBILITY_ID, 'login-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="LOGIN"]'), (AppiumBy.CLASS_NAME, 'android.widget.Button')]
            elementLoginButton1 = self.find_visible_element(3453, locatorLoginButton1)
            self.touch_on_element(elementLoginButton1, 0.503, 0.611)
            
            self.set_current_command_id(2023177921)
            self.switch_to_native_context()
            locatorPasswordInput1 = [(AppiumBy.ACCESSIBILITY_ID, 'password-input'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@text="•••••••••"]')]
            elementPasswordInput1 = self.find_visible_element(1977, locatorPasswordInput1)
            self.touch_on_element(elementPasswordInput1, 0.385, 0.574)
            
            self.set_current_command_id(2023177961)
            self.switch_to_native_context()
            self.press_button_multiple(PressType.DELETE, 13)
            
            self.set_current_command_id(2023177994)
            self.switch_to_native_context()
            self.send_keys_to_active_element('secret123')
            
            self.set_current_command_id(2023177996)
            self.switch_to_native_context()
            locatorLoginButton2 = [(AppiumBy.ACCESSIBILITY_ID, 'login-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="LOGIN"]'), (AppiumBy.CLASS_NAME, 'android.widget.Button')]
            elementLoginButton2 = self.find_visible_element(1408, locatorLoginButton2)
            self.touch_on_element(elementLoginButton2, 0.348, 0.611)
            
            self.set_current_command_id(2023178312)
            self.switch_to_native_context()
            locatorUsernameInput1 = [(AppiumBy.ACCESSIBILITY_ID, 'username-input'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/username-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="username-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/username-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[normalize-space(@text)="standard_user"]')]
            elementUsernameInput1 = self.find_visible_element(25465, locatorUsernameInput1)
            self.touch_on_element(elementUsernameInput1, 0.511, 0.324)
            
            self.set_current_command_id(2023178359)
            self.switch_to_native_context()
            self.press_button_multiple(PressType.DELETE, 16)
            
            self.set_current_command_id(2023178418)
            self.switch_to_native_context()
            self.send_keys_to_active_element('standard_user')
            
            self.set_current_command_id(2023178419)
            self.switch_to_native_context()
            locatorPasswordInput2 = [(AppiumBy.ACCESSIBILITY_ID, 'password-input'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/password-input"]'), (AppiumBy.XPATH, '//android.widget.EditText[@text="•••••••••"]')]
            elementPasswordInput2 = self.find_visible_element(3145, locatorPasswordInput2)
            self.touch_on_element(elementPasswordInput2, 0.248, 0.544)
            
            self.set_current_command_id(2023178420)
            self.switch_to_native_context()
            self.press_button_multiple(PressType.DELETE, 13)
            
            self.set_current_command_id(2023178528)
            self.switch_to_native_context()
            self.send_keys_to_active_element('secret123')
            
            self.set_current_command_id(2023178529)
            self.switch_to_native_context()
            locatorLoginButton3 = [(AppiumBy.ACCESSIBILITY_ID, 'login-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/login-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="LOGIN"]'), (AppiumBy.CLASS_NAME, 'android.widget.Button')]
            elementLoginButton3 = self.find_visible_element(1430, locatorLoginButton3)
            self.touch_on_element(elementLoginButton3, 0.173, 0.493)
            
            self.set_current_command_id(2023178672)
            self.switch_to_native_context()
            locatorAddToCart1 = [(AppiumBy.ACCESSIBILITY_ID, 'add-to-cart-1'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/add-to-cart-1"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="add-to-cart-1"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/add-to-cart-1"]')]
            self.hide_keyboard()
            elementAddToCart1 = self.find_visible_element_on_scrollable(11099, locatorAddToCart1)
            self.touch_on_element(elementAddToCart1, 0.454, 0.299)
            
            self.set_current_command_id(2023178756)
            self.switch_to_native_context()
            locatorAddToCart2 = [(AppiumBy.ACCESSIBILITY_ID, 'add-to-cart-2'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/add-to-cart-2"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="add-to-cart-2"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/add-to-cart-2"]')]
            self.hide_keyboard()
            elementAddToCart2 = self.find_visible_element_on_scrollable(5759, locatorAddToCart2)
            self.touch_on_element(elementAddToCart2, 0.361, 0.431)
            
            self.set_current_command_id(2023178839)
            self.switch_to_native_context()
            locatorCartIcon = [(AppiumBy.ACCESSIBILITY_ID, 'cart-icon'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/cart-icon"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="cart-icon"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/cart-icon"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="🛒 CART"]')]
            elementCartIcon = self.find_visible_element(5319, locatorCartIcon)
            self.touch_on_element(elementCartIcon, 0.731, 0.500)
            
            self.set_current_command_id(2023178924)
            self.switch_to_native_context()
            locatorPlaceOrderButton = [(AppiumBy.ACCESSIBILITY_ID, 'place-order-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/place-order-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="place-order-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/place-order-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="PLACE ORDER"]')]
            elementPlaceOrderButton = self.find_visible_element(4756, locatorPlaceOrderButton)
            self.touch_on_element(elementPlaceOrderButton, 0.507, 0.521)
            
            self.set_current_command_id(2023179016)
            self.switch_to_native_context()
            locatorBackToProductsButton = [(AppiumBy.ACCESSIBILITY_ID, 'back-to-products-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/back-to-products-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="back-to-products-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/back-to-products-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="BACK TO PRODUCTS"]'), (AppiumBy.CLASS_NAME, 'android.widget.Button')]
            elementBackToProductsButton = self.find_visible_element(6149, locatorBackToProductsButton)
            self.touch_on_element(elementBackToProductsButton, 0.597, 0.576)
            
            self.set_current_command_id(2023179080)
            self.switch_to_native_context()
            locatorLogoutButton = [(AppiumBy.ACCESSIBILITY_ID, 'logout-button'), (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/logout-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@content-desc="logout-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/logout-button"]'), (AppiumBy.XPATH, '//android.widget.Button[@text="LOGOUT"]')]
            elementLogoutButton = self.find_visible_element(3849, locatorLogoutButton)
            self.touch_on_element(elementLogoutButton, 0.549, 0.479)

        except Exception:
            import traceback
            traceback.print_exc()
            self.save_debug_resource()
            raise
