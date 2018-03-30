from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.remote_connection import RemoteConnection
import unittest
import time
import sys
sys.path.append('../..')
from python import configs

class iOSAppTest(unittest.TestCase):

  def setUp(self):
    self._command_executor = RemoteConnection(configs.kobitonServerUrl, resolve_ip=False)
    self._command_executor.set_timeout(configs.session_timeout)
    self.driver = webdriver.Remote(configs.kobitonServerUrl, configs.desired_caps_ios_app)

  def tearDown(self):
    self.driver.quit()

  def test_ios_app(self):
    self.search_questions_on_Acura_Support_Community()
    self.search_IFixit_on_home_screen()

  def search_questions_on_Acura_Support_Community(self):
    print ('should allow to navigate to some devices on Acura Support Community')
    '''
    Steps:
    1. Click on "Car and Truck" Categories on Homepage
    2. Click on "Acura" Categories

    Expected:
    1. General Information is "Acura".
    2.Verify five devices below displays.
    + Acura Integra
    + Acura MDX
    + Acura RL
    + Acura TL
    + Acura TSX
    '''
    self.driver.find_element_by_xpath("//XCUIElementTypeButton[@name='START A REPAIR']").click()
    time.sleep(5)
    self.driver.find_element_by_xpath("//*[@name='Car and Truck']").click()
    time.sleep(2)
    self.driver.find_element_by_xpath("//*[@name='Acura']").click()
    time.sleep(2)
    WebDriverWait(self.driver, 60).until(
    EC.element_to_be_clickable((By.XPATH, "//XCUIElementTypeNavigationBar")))
    acura_text = self.driver.find_element_by_xpath("//XCUIElementTypeNavigationBar").get_attribute('name')

    has_acura_integra = self.driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura Integra']").is_displayed()
    has_acura_MDX = self.driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura MDX']").is_displayed()
    has_acura_RL = self.driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura RL']").is_displayed()
    has_acura_TL = self.driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura TL']").is_displayed()
    has_acura_TSX = self.driver.find_element_by_xpath("//XCUIElementTypeStaticText[@name='Acura TSX']").is_displayed()

    self.assertEqual(acura_text, 'Acura')
    self.assertTrue(has_acura_integra)
    self.assertTrue(has_acura_MDX)
    self.assertTrue(has_acura_RL)
    self.assertTrue(has_acura_TL)
    self.assertTrue(has_acura_TSX)

  def search_IFixit_on_home_screen(self):
    print ('should allow to search iFixit on Home screen')
    self.driver.launch_app()
    time.sleep(2)
    self.driver.find_element_by_xpath("//XCUIElementTypeButton[@name='START A REPAIR']").click()
    time.sleep(2)
    self.driver.find_element_by_xpath("//*[@name='Search']").click()
    self.driver.find_element_by_xpath("//XCUIElementTypeSearchField[@name='Search']").send_keys('Macbook Pro 2015')

    time.sleep(2)

    firstListResult = self.driver.find_elements_by_xpath("//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]")

    self.driver.find_element_by_xpath("//XCUIElementTypeButton[@name='Cancel']").click()
    self.driver.find_element_by_xpath("//*[@name='Search']").click()
    self.driver.find_element_by_xpath("//XCUIElementTypeSearchField[@name='Search']").send_keys('Acura')
    self.driver.find_element_by_xpath("//XCUIElementTypeButton[@name='Categories']").click()
    time.sleep(2)

    secondListResult = self.driver.find_elements_by_xpath("//XCUIElementTypeStaticText[contains(@label,'Acura')]")

    self.assertTrue(len(firstListResult) >= 33, 'The expected results are greater or equal to 33 results.')
    self.assertTrue(len(secondListResult) >= 6, 'The expected results are greater or equal to 6 results.')

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(iOSAppTest)
    unittest.TextTestRunner(verbosity=2).run(suite)