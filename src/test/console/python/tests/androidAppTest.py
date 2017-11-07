import unittest
import re
import time
from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.remote_connection import RemoteConnection
import sys
sys.path.append('../..')
from python import configs
from python.utils.AutomationUtils import *
from python.services.DeviceService import DeviceService

class AndroidAppTest(unittest.TestCase):

  def setUp(self):
    self._command_executor = RemoteConnection(kobitonServerUrl())
    self._command_executor.set_timeout(configs.session_timeout)
    device = DeviceService().getOnlineDevice('Android')
    print('setUp - device:', device)
    self.driver = webdriver.Remote(self._command_executor, desiredCapabilitiesAndroidApp(device))

  def tearDown(self):
    self.driver.quit()

  def test_android_app(self):
    self.search_IFixit_on_home_screen()

  def search_IFixit_on_home_screen(self):
    print ('should allow to search iFixit on Home screen')
    self.driver.launch_app()
    time.sleep(2)
    self.driver.find_element_by_xpath("//*[@text='Search']").click()
    self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']").send_keys('Macbook Pro 2015')
    time.sleep(2)
    self.driver.press_keycode(66)
    time.sleep(5)
    firstResult = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text
    self.driver.find_element_by_xpath("//*[@resource-id='android:id/text1' and @text='Guides']").click()
    self.driver.find_element_by_xpath("//*[@resource-id='android:id/text1' and @text='Devices']").click()
    time.sleep(2)

    firstResult = re.findall('\d+', firstResult)[0]
    self.assertTrue(int(firstResult) >= 47,
      'The expected results are greater or equal to 47 results.')

  def swipe(self, element, direction = 'RightLeft'):
    # Get the size of screen.
    size = self.driver.get_window_size()

    startx = size['width'] * 0.90
    # Find endx point which is at left side of screen.
    endx = size['width'] * 0.10
    # Find vertical point where you wants to swipe. It is in middle of screen height.
    starty = size['height'] * 0.50

    if direction == 'RightLeft':
      # Swipe from Right to Left.
      self.driver.swipe(startx, starty, endx, starty, 200)

    if direction == 'LeftRight':
      # Swipe from Left to Right.
      self.driver.swipe(endx, starty, startx, starty, 200)

    time.sleep(5)

if __name__ == '__main__':
  suite = unittest.TestLoader().loadTestsFromTestCase(AndroidAppTest)
  isSuccess = unittest.TextTestRunner(verbosity=2).run(suite).wasSuccessful()
  sys.exit(not isSuccess)
