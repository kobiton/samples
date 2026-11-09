from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import BasePage


class LoginPage(BasePage):
    USERNAME_INPUT = [
        (AppiumBy.ACCESSIBILITY_ID, 'username-input'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/username-input"]'),
        (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="username-input"]'),
        (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/username-input"]'),
        (AppiumBy.XPATH, '//android.widget.EditText[@text="Username"]'),
    ]
    PASSWORD_INPUT = [
        (AppiumBy.ACCESSIBILITY_ID, 'password-input'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/password-input"]'),
        (AppiumBy.XPATH, '//android.widget.EditText[@content-desc="password-input"]'),
        (AppiumBy.XPATH, '//android.widget.EditText[@resource-id="com.example.demoshop:id/password-input"]'),
        (AppiumBy.XPATH, '//android.widget.EditText[@text="Password"]'),
    ]
    LOGIN_BUTTON = [
        (AppiumBy.ACCESSIBILITY_ID, 'login-button'),
        (AppiumBy.XPATH, '//*[@resource-id="com.example.demoshop:id/login-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@content-desc="login-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@resource-id="com.example.demoshop:id/login-button"]'),
        (AppiumBy.XPATH, '//android.widget.Button[@text="LOGIN"]'),
        (AppiumBy.CLASS_NAME, 'android.widget.Button'),
    ]

    def enter_username(self, username):
        self.type_into(self.USERNAME_INPUT, username,
                       tap_command_id=2023178312, type_command_id=2023178418)

    def enter_password(self, password):
        self.type_into(self.PASSWORD_INPUT, password,
                       tap_command_id=2023178419, type_command_id=2023178528)

    def tap_login(self):
        self.tap(self.LOGIN_BUTTON, command_id=2023178529)

    def is_loaded(self):
        return self.is_displayed(self.LOGIN_BUTTON)
