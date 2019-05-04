import os
import pytest
from time import sleep

from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.remote_connection import RemoteConnection

from helpers import DESIRED_CAPS_IOS_APP

class TestAndroidApp():
    
    @pytest.fixture(scope="function")
    def driver(self, request, KOBITON_SERVER_URL):
        driver = webdriver.Remote(command_executor = KOBITON_SERVER_URL, desired_capabilities = DESIRED_CAPS_IOS_APP)

        def fin():
            driver.quit()

        request.addfinalizer(fin)
        return driver  # provide the fixture value

    def test_add_contacts(self, driver):
        el = driver.find_element_by_xpath("//XCUIElementTypeButton[@name='START A REPAIR']")
        el.click()

        sleep(5)

        el = driver.find_element_by_xpath("//*[@name='Car and Truck']")
        el.click()

        sleep(2)
        
        driver.find_element_by_xpath("//*[@name='Acura']").click()

        WebDriverWait(driver, 60).until(
        EC.element_to_be_clickable((By.XPATH, "//XCUIElementTypeNavigationBar")))
        has_acura_integra = driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura Integra']").is_displayed()
        has_acura_MDX = driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura MDX']").is_displayed()
        has_acura_RL = driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura RL']").is_displayed()
        has_acura_TL = driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura TL']").is_displayed()
        has_acura_TSX = driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura TSX']").is_displayed()

        assert has_acura_integra == True
        assert has_acura_MDX == True
        assert has_acura_RL == True
        assert has_acura_TL == True
        assert has_acura_TSX == True