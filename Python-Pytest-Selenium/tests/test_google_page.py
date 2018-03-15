import pytest
import time
from selenium.webdriver.common.keys import Keys

@pytest.mark.usefixtures('driver')
class TestGooglePage(object):

  def test_main_page(self, driver):
    """
    Verify the title contains the keyword "Kobiton"
    :return: None
    """
    driver.implicitly_wait(60)
    driver.get('http://www.google.com')
    driver.find_element_by_name('q').send_keys('Kobiton')
    driver.find_element_by_name('q').submit()
    time.sleep(3)
    get_msg = driver.title
    assert 'Kobiton' in  get_msg

  def tearDown(self):
    driver.quit()
