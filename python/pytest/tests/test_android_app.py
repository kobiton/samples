import os
import pytest

from appium import webdriver
from helpers import DESIRED_CAPS_ANDROID_APP

class TestAndroidApp():

    @pytest.fixture(scope="function")
    def driver(self, request, KOBITON_SERVER_URL):
        driver = webdriver.Remote(command_executor = KOBITON_SERVER_URL, desired_capabilities = DESIRED_CAPS_ANDROID_APP)

        def fin():
            driver.quit()

        request.addfinalizer(fin)
        return driver  # provide the fixture value

    def test_add_contacts(self, driver):
        el = driver.find_element_by_accessibility_id("Add Contact")
        el.click()

        textfields = driver.find_elements_by_class_name("android.widget.EditText")
        textfields[0].send_keys("Appium User")
        textfields[2].send_keys("someone@appium.io")

        assert 'Appium User' == textfields[0].text
        assert 'someone@appium.io' == textfields[2].text
