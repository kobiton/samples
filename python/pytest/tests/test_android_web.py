import os
import pytest

from appium import webdriver
from helpers import DESIRED_CAPS_ANDROID_WEB

class TestAndroidWeb():

    @pytest.fixture(scope="function")
    def driver(self, request, KOBITON_SERVER_URL):
        driver = webdriver.Remote(command_executor = KOBITON_SERVER_URL, desired_capabilities = DESIRED_CAPS_ANDROID_WEB)
        driver.implicitly_wait(30)

        def fin():
            driver.quit()

        request.addfinalizer(fin)
        return driver  # provide the fixture value

    def test_should_navigate_to_webpage(self, driver):
        driver.get('https://www.google.com')
        title = driver.title
        print title
        assert 'Google' == title
