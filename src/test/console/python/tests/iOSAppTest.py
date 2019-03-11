from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.remote_connection import RemoteConnection
import unittest
import time
import sys
sys.path.append('..')
import configs
import AutomationUtils

class iOSAppTest(unittest.TestCase):

  def setUp(self):
    device = AutomationUtils.getOnlineDevice('iOS')
    print('setUp - device:', device)
    self.driver = webdriver.Remote(AutomationUtils.kobitonServerUrl(), AutomationUtils.desiredCapabilitiesiOSApp(device))
    kobitonSessionId = self.driver.desired_capabilities.get('kobitonSessionId')
    print('https://portal.kobiton.com/sessions/{}'.format(kobitonSessionId))

  def tearDown(self):
    self.driver.quit()

  def test_ios_app(self):
    self.search_IFixit_on_home_screen()

  def search_IFixit_on_home_screen(self):
    print ('should allow to search iFixit on Home screen')
    self.driver.launch_app()
    time.sleep(2)
    self.driver.find_element_by_xpath("//XCUIElementTypeButton[@name='START A REPAIR']").click()
    time.sleep(2)
    self.driver.find_element_by_xpath("//XCUIElementTypeSearchField[@name='Search']").send_keys('Macbook Pro 2015')

    time.sleep(2)

    firstListResult = self.driver.find_elements_by_xpath("//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]")

    self.assertTrue(len(firstListResult) >= 33, 'The expected results are greater or equal to 33 results.')

if __name__ == '__main__':
  suite = unittest.TestLoader().loadTestsFromTestCase(iOSAppTest)
  isSuccess = unittest.TextTestRunner(verbosity=2).run(suite).wasSuccessful()
  sys.exit(not isSuccess)
