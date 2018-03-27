from selenium import webdriver
from selenium.webdriver.remote.remote_connection import RemoteConnection
import unittest
import sys
sys.path.append('..')
import configs

class AndroidWebTest(unittest.TestCase):

  wrong_username_msg = 'Your username is invalid!'
  wrong_password_msg = 'Your password is invalid!'
  success_msg = 'You logged into a secure area!'

  def setUp(self):
    self._command_executor = RemoteConnection(configs.kobitonServerUrl, resolve_ip=False)
    self._command_executor.set_timeout(configs.session_timeout)
    self.driver = webdriver.Remote(self._command_executor, configs.desired_caps_android_web)

  def tearDown(self):
    self.driver.quit()

  def test_android_web(self):
    self.verify_invalid_username()
    self.verify_invalid_password()
    self.verify_login_successfully()

  def verify_invalid_username(self):
    print 'should return error when we input wrong username'
    self.login('foo', 'SuperSecretPassword!')
    self.assertTrue(self.wrong_username_msg in self.get_message())

  def verify_invalid_password(self):
    print 'should return error when we input wrong password'
    self.login('tomsmith', 'SuperSecretPassword')
    self.assertTrue(self.wrong_password_msg in self.get_message())

  def verify_login_successfully(self):
    print 'should run test successfully with correct username and password'
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
  unittest.TextTestRunner(verbosity=2).run(suite)