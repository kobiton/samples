from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest
import re
import time
import urllib3
urllib3.disable_warnings()
import sys
sys.path.append('..')
import configs

class AndroidAppTest(unittest.TestCase):

  firstQuestion = 'Acura MDX'
  secondQuestion = 'Cruise Control'

  def setUp(self):
    self.driver = webdriver.Remote(configs.kobitonServerUrl, configs.desired_caps_android_app)
    self.driver.implicitly_wait(configs.session_timeout)

    kobitonSessionId = self.driver.desired_capabilities.get('kobitonSessionId')
    print("https://portal.kobiton.com/sessions/%s" % (kobitonSessionId))

  def tearDown(self):
    self.driver.quit()

  def test_android_app(self):
    self.search_questions_on_Acura_Support_Community()
    self.search_IFixit_on_home_screen()

  def search_questions_on_Acura_Support_Community(self):
    print ('should allow to search some questions on Acura Support Community')
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

    self.driver.find_element_by_xpath("//*[@resource-id='android:id/home']").click()
    time.sleep(2)
    self.driver.find_element_by_xpath("//*[@text='Car and Truck']").click()
    time.sleep(2)
    self.driver.find_element_by_xpath("//*[@text='Acura']").click()
    time.sleep(2)

    acuraText = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").text
    acuraIntegraText = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]").text
    acuraMDXText = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]").text
    acuraRLText = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]").text
    acuraTLText = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]").text
    acuraTSXText = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]").text

    self.assertEqual('Acura', acuraText)
    self.assertEqual('Acura Integra', acuraIntegraText)
    self.assertEqual('Acura MDX', acuraMDXText)
    self.assertEqual('Acura RL', acuraRLText)
    self.assertEqual('Acura TL', acuraTLText)
    self.assertEqual('Acura TSX', acuraTSXText)

    '''
    Steps:
    1. Click on "Acura" General Information
    2. Swipe from left to right, it will move to Answers tab
    3. Enter keyword 'Acura MDX'
    4. Click Search icon

    Expected: It should show at least 6 results.
    '''

    getAttrName1 = self.search_question(self.firstQuestion)

    '''
    Steps:
    1. Clear text on Search field
    2. Enter keyword 'Cruise Control'
    3. Click on Search icon
    4. Wait a few seconds to get returned result
    5. Close app

    Expected: It should show at least 1 result.
    '''

    self.driver.back()
    getAttrName2 = self.search_question(self.secondQuestion)

    self.driver.close_app()

    getAttrName1 = re.findall('\d+', getAttrName1)[0]
    self.assertTrue(int(getAttrName1) >= 6,
      'The expected results are greater or equal to 6 results.')

    getAttrName2 = re.findall('\d+', getAttrName2)[0]
    self.assertTrue(int(getAttrName2) >= 1,
      'The expected results are greater or equal to 1 result.')

  def search_IFixit_on_home_screen(self):
    print ('should allow to search iFixit on Home screen')
    self.driver.launch_app()
    time.sleep(2)
    self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/action_search']").click()
    self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']").send_keys('Macbook Pro 2015')
    time.sleep(2)
    self.driver.press_keycode(66)
    time.sleep(5)
    firstResult = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text
    self.driver.find_element_by_xpath("//*[@resource-id='android:id/text1' and @text='Guides']").click()
    self.driver.find_element_by_xpath("//*[@resource-id='android:id/text1' and @text='Devices']").click()
    time.sleep(2)
    secondResult = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").text

    firstResult = re.findall('\d+', firstResult)[0]
    self.assertTrue(int(firstResult) >= 47,
      'The expected results are greater or equal to 47 results.')

    secondResult = re.findall('\d+', secondResult)[0]
    self.assertTrue(int(secondResult) >= 5,
      'The expected results are greater or equal to 5 results.')

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

  def search_question(self, question):
    self.question = question
    self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").click()

    WebDriverWait(self.driver, 60).until(
      EC.element_to_be_clickable((By.XPATH, "//*[@resource-id='com.dozuki.ifixit:id/topic_info_image']")))
    time.sleep(3)
    element = self.driver.find_element_by_xpath("//*[@resource-id='com.dozuki.ifixit:id/topic_info_image']")
    self.swipe(element, 'RightLeft')
    time.sleep(3)
    self.driver.find_element_by_xpath("//*[@resource-id='answersSearch']").send_keys(self.question)

    return self.driver.find_element_by_xpath("//*[contains(@text,'Acura questions') and @index=1]").text

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(AndroidAppTest)
    unittest.TextTestRunner(verbosity=2).run(suite)
