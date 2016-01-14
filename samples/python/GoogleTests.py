import unittest
from unittest import TestCase
import time
from time import sleep
from appium import webdriver

class GoogleTests(TestCase):
    USER_NAME = "tester01"
    API_KEY = "13e36639-92e3-411b-a067-3457b5dea573"
    HOST_NAME = "test.kobiton.com"
    PORT = "3001"
    GOOGLE_URL = "https://mail.google.com"
    GOOGLE_URL_HOMEPAGE = "https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal"
    TRASH_URL = "https://mail.google.com/mail/mu/mp/4/#tl/Trash"
    EMAIL_ADDRESS1 = "krypton.portal@gmail.com"
    EMAIL_ADDRESS2 = "krypton.portal2@gmail.com"
    PASSWORD = "Admin@123456"
    SUBJECT1 = "It is a subject"
    BODY1 = "It is a body"
    MSG_NOEMAIL = "You have no mail here."
    MSG_NOEMAIL_PRIMARY = "You have no mail.\nPlease enjoy your day!"
    URL = ""
    SERVER_URL_LOCAL = "http://localhost:4723/wd/hub"
    desired_capabilities = {
        'browserName':'chrome',
        'platformName': 'Android',
        'platformVersion': '5.1.1',
        'deviceName': 'Nexus 5'
    }

    def setUp(self):
        self.URL = "http://" + self.USER_NAME + ":" + self.API_KEY + "@" + self.HOST_NAME + ":" + self.PORT + "/wd/hub"
        self.log ("WebDriver request initiated. Waiting for response, this may take a while.")
        self.driver = webdriver.Remote(command_executor=self.URL, desired_capabilities=self.desired_capabilities, browser_profile=None, proxy=None, keep_alive=False)
        self.driver.delete_all_cookies()
        self.driver.refresh()
    def tearDown(self):
        self.driver.quit()
        sleep(10)  # We need to wait appium server clean up environment

    def test_should_not_accept_empty_email_or_invalid_email(self):
        self.log ("should not accept empty and invalid email")
        self.driver.get(self.GOOGLE_URL)
        sleep(5)
        self.driver.find_element_by_id("next").click()
        sleep(2)
        errorMsg = self.driver.find_element_by_id("errormsg_0_Email").text
        self.assertEqual("Please enter your email.", errorMsg, "The error message '%s' displays." % errorMsg)
        self.driver.find_element_by_id("Email").send_keys("invalid_email@where.about")
        self.driver.find_element_by_id("next").click()
        sleep(2)
        errorMsg = self.driver.find_element_by_id("errormsg_0_Email").text
        self.assertEqual("Sorry, Google doesn't recognize that email. Create an account using that address?", errorMsg, "The error message '%s' displays." % errorMsg)
        pass
    def test_should_accept_valid_credentials(self):
        self.log ("should accept valid email credentials")
        self.login(self.EMAIL_ADDRESS1, self.PASSWORD)
        getURL = self.driver.current_url
        self.assertTrue("https://mail.google.com/mail" in getURL, "The current url contains text 'https://mail.google.com/mail'.")
        pass

    def test_should_compose_email_successfully(self):
        self.login(self.EMAIL_ADDRESS1, self.PASSWORD)
        self.log ("should compose email successfully by Gmail1")
        self.driver.find_element_by_xpath("//div[@id='views']//div[@aria-label='Compose']").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@id='cmcc_composeto']//input[@id='composeto']").send_keys(self.EMAIL_ADDRESS2)
        self.driver.find_element_by_xpath("//input[@id='cmcsubj']").send_keys(self.SUBJECT1)
        self.driver.find_element_by_id("cmcbody").send_keys(self.BODY1)
        sleep(1)
        self.driver.find_element_by_xpath("//div[@id='views']//div[text()='Send']").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@aria-label='Menu']").click()
        sleep(1)
        self.driver.find_element_by_xpath("//span[text()='Sent Mail']").click()
        sleep(1)

        self.log ("verify the new email exists on Sent Email folder on Gmail1")
        getText = self.driver.find_element_by_xpath("//div[@class='fm']").text

        self.assertTrue(self.SUBJECT1 in getText, "The subject '%s' exists." % self.SUBJECT1)
        self.assertTrue(self.BODY1 in getText, "The body '%s' exists." % self.BODY1)

        self.driver.find_element_by_xpath("//div[contains(@class,'m')]//div[@role='listitem'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[contains(@class,'V j hj') and text()='Details']").click()
        sleep(1)

        getSubject = self.driver.find_element_by_xpath("//span[@class='kj']/span").text
        getBody = self.driver.find_element_by_xpath("//div[@class='Hi']").text
        getSentEmail = self.driver.find_element_by_xpath("//div[@class='Kg']/span").text
        getToEmail = self.driver.find_element_by_xpath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']").text

        self.assertEqual(self.SUBJECT1, getSubject, "The subject '%s' should be exist." % self.SUBJECT1)
        self.assertEqual(self.BODY1, getBody, "The body '%s' should be exist." % self.BODY1)
        self.assertEqual(self.EMAIL_ADDRESS1, getSentEmail, "The emailSend '%s' should be exist." % self.EMAIL_ADDRESS1)
        self.assertEqual(self.EMAIL_ADDRESS2, getToEmail, "The emailTo'%s' should be exist." % self.EMAIL_ADDRESS2)

        self.log ("delete email on Sent Email and Trash folder on Gmail1")
        self.driver.find_element_by_xpath("//div[@id='cv__cntbt']//div[@class='V j Y Mm Kg']").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@class='V j cb Ol'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").click()
        sleep(2)
        getNoEmailMsg = self.driver.find_element_by_xpath("//div[@class='Wl']").text

        self.assertEqual(self.MSG_NOEMAIL, getNoEmailMsg, "The message '%s' exists." % self.MSG_NOEMAIL)

        self.driver.get(self.TRASH_URL)
        sleep(5)
        self.driver.find_element_by_xpath("//div[@class='V j cb Ol'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@class='M j T b hc q m']//div[text()='Delete forever']").click()
        getNoEmailMsg = self.driver.find_element_by_xpath("//div[@class='Wl']").text

        self.assertEqual(self.MSG_NOEMAIL, getNoEmailMsg, "The message '%s' exists." % self.MSG_NOEMAIL)

        self.driver.find_element_by_xpath("//div[@aria-label='Menu']").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[contains(@class,'V Y Rx Kg')]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//button[@id='signout']").click()
        sleep(5)

        self.driver.get(self.GOOGLE_URL)
        self.driver.delete_all_cookies()
        self.driver.refresh()

        self.log ("verify Gmail2 received a new email from Gmail1")
        self.login(self.EMAIL_ADDRESS2, self.PASSWORD)
        self.driver.get(self.GOOGLE_URL_HOMEPAGE)
        self.driver.refresh()
        sleep(5)

        getText = self.driver.find_element_by_xpath("//div[@class='fm']").text
        self.assertTrue(self.SUBJECT1 in getText, "The subject '%s' exists." % self.SUBJECT1)
        self.assertTrue(self.BODY1 in getText, "The body '%s' exists." % self.BODY1)

        self.driver.find_element_by_xpath("//div[contains(@class,'fm')]//div[@role='listitem'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[contains(@class,'V j hj') and text()='Details']").click()
        sleep(1)

        getSubject = self.driver.find_element_by_xpath("//span[@class='kj']/span").text
        getBody = self.driver.find_element_by_xpath("//div[@class='Hi']").text
        getSentEmail = self.driver.find_element_by_xpath("//div[@class='Kg']/span").text
        getToEmail = self.driver.find_element_by_xpath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']").text

        self.assertEqual(self.SUBJECT1, getSubject, "The subject '%s' should be exist." % self.SUBJECT1)
        self.assertEqual(self.BODY1, getBody, "The body '%s' should be exist." % self.BODY1)
        self.assertEqual(self.EMAIL_ADDRESS1, getSentEmail, "The emailSend '%s' should be exist." % self.EMAIL_ADDRESS1)
        self.assertEqual(self.EMAIL_ADDRESS2, getToEmail, "The emailTo'%s' should be exist." % self.EMAIL_ADDRESS2)

        self.log ("delete email on Primary Email and Trash folder on Gmail2")
        self.driver.find_element_by_xpath("//div[contains(@class,'M j T b hc Om o')]//div[text()='Primary'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@class='V j cb Ol'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").click()
        getNoEmailMsg = self.driver.find_element_by_xpath("//div[@class='Wl']").text

        self.assertEqual(self.MSG_NOEMAIL_PRIMARY, getNoEmailMsg, "The message '%s' exists." % self.MSG_NOEMAIL_PRIMARY)

        self.driver.get(self.TRASH_URL)
        sleep(5)
        self.driver.find_element_by_xpath("//div[@class='V j cb Ol'][1]").click()
        sleep(1)
        self.driver.find_element_by_xpath("//div[@class='M j T b hc q m']//div[text()='Delete forever']").click()
        getNoEmailMsg = self.driver.find_element_by_xpath("//div[@class='Wl']").text

        self.assertEqual(self.MSG_NOEMAIL, getNoEmailMsg, "The message '%s' exists." % self.MSG_NOEMAIL)
        pass

    def login(self, username=None, password=None):
        self.log ("login to Gmail with email: '%s' and password: '%s'" % (username, password))
        self.driver.get(self.GOOGLE_URL)
        sleep(5)
        self.driver.find_element_by_id("Email").send_keys(username)
        self.driver.find_element_by_id("next").click()
        sleep(3)
        self.driver.find_element_by_id("Passwd").send_keys(password)
        self.driver.find_element_by_id("signIn").click()
        sleep(10)

    def log(self, msg):
        print (time.strftime("%H:%M:%S") + ": " + msg)

if __name__ == "__main__":
    suite = unittest.TestSuite()
    suite.addTest(GoogleTests("test_should_not_accept_empty_email_or_invalid_email"))
    suite.addTest(GoogleTests("test_should_accept_valid_credentials"))
    suite.addTest(GoogleTests("test_should_compose_email_successfully"))
    unittest.TextTestRunner(verbosity=1).run(suite)
