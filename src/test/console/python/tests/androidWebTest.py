from selenium import webdriver
import unittest
from selenium.webdriver.remote.remote_connection import RemoteConnection
import sys
sys.path.append('../..')
from python import configs
from python.utils.AutomationUtils import *
from python.services.DeviceService import DeviceService

class AndroidWebTest(unittest.TestCase):

  wrong_username_msg = 'Your username is invalid!'
  success_msg = 'You logged into a secure area!'

  def setUp(self):
    self._command_executor = RemoteConnection(kobitonServerUrl())
    self._command_executor.set_timeout(configs.session_timeout)
    device = DeviceService().getOnlineDevice('Android')
    print('setUp - device:', device)
    self.driver = webdriver.Remote(self._command_executor, desiredCapabilitiesAndroidWeb(device))

  def tearDown(self):
    self.driver.quit()

  def test_android_web(self):
    self.verify_login_successfully()

  def verify_login_successfully(self):
    print ('should run test successfully with correct username and password')
    self.login('tomsmith', 'SuperSecretPassword!')
    self.assertTrue(self.success_msg in self.get_message())

  def login(self, username, password):
    self.driver.get('http://the-internet.herokuapp.com/login')
    self.driver.find_element_by_id('username').send_keys(username)
    self.driver.find_element_by_id('password').send_keys(password)
    self.driver.find_element_by_xpath("//form[@name='login']").submit()

  def get_message(self):
    return self.driver.find_element_by_id('flash').text

if __name__ == '__main__':
  suite = unittest.TestLoader().loadTestsFromTestCase(AndroidWebTest)
  isSuccess = unittest.TextTestRunner(verbosity=2).run(suite).wasSuccessful()
  sys.exit(not isSuccess)