using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Remote;
using NUnit.Framework;
using System.Threading;

namespace DotNet
{
    [TestFixture()]
    public class GoogleTests
    {
        private static AndroidDriver<AppiumWebElement> driver;
        private static string USER_NAME = "tester01";
        private static string API_KEY = "13e36639-92e3-411b-a067-3457b5dea573";
        private static string HOST_NAME = "ec2-54-226-177-179.compute-1.amazonaws.com";
        private static string PORT = "3001";
        private static Uri URL = null;
        private static TimeSpan INIT_TIMEOUT_SEC = TimeSpan.FromSeconds(180);
        private static TimeSpan IMPLICIT_TIMEOUT_SEC = TimeSpan.FromSeconds(10);
        private static string GOOGLE_URL = "https://mail.google.com";
        private static string GOOGLE_URL_HOMEPAGE = "https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal";
        private static string TRASH_URL = "https://mail.google.com/mail/mu/mp/4/#tl/Trash";
        private static string EMAIL_ADDRESS1 = "krypton.portal@gmail.com";
        private static string EMAIL_ADDRESS2 = "krypton.portal2@gmail.com";
        private static string PASSWORD = "Admin@123456";
        private static string SUBJECT1 = "It is a subject";
        private static string BODY1 = "It is a body";
        private static string MSG_NOEMAIL = "You have no mail here.";
        private static string MSG_NOEMAIL_PRIMARY = "You have no mail.\r\nPlease enjoy your day!";

        [SetUp]
        public void BeforeAll()
        {
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities.SetCapability("browserName", "chrome");
            capabilities.SetCapability("deviceName", "Nexus 5");
            capabilities.SetCapability("platformName", "Android");
            capabilities.SetCapability("platformVersion", "5.1.1");
            capabilities.SetCapability(CapabilityType.AcceptSslCertificates, true);
            URL = new Uri("http://" + USER_NAME + ":" + API_KEY + "@" + HOST_NAME + ":" + PORT + "/wd/hub");
            //URL = new Uri("http://127.0.0.1:4723/wd/hub");
            driver = new AndroidDriver<AppiumWebElement>(URL, capabilities, INIT_TIMEOUT_SEC);
            driver.Manage().Timeouts().ImplicitlyWait(IMPLICIT_TIMEOUT_SEC);
            driver.Manage().Cookies.DeleteAllCookies();
            Thread.Sleep(5000);
            driver.Navigate().Refresh();
        }
        [TearDown]
        public void AfterAll()
        {
            driver.Quit();
            Thread.Sleep(3000); // Mare sure Appium cleanup appium session
        }
        [Test()]
        public void GoogleLogin_Invalid()
        {
            driver.Navigate().GoToUrl(GOOGLE_URL);
            Sleep(5000);
            driver.FindElementById("next").Click();
            Sleep(2000);
            string errorMsg = driver.FindElementById("errormsg_0_Email").Text;
            Assert.AreEqual(errorMsg, "Please enter your email.");
            driver.FindElementById("Email").SendKeys("invalid_email@where.about");
            driver.FindElementById("next").Click();
            Sleep(2000);
            string errorMsg2 = driver.FindElementById("errormsg_0_Email").Text;
            Assert.AreEqual(errorMsg2,
                    "Sorry, Google doesn't recognize that email. Create an account using that address?");
        }

        [Test()]
        public void GoogleLogin_Valid()
        {
            Login(EMAIL_ADDRESS1, PASSWORD);
            Sleep(5000);
            string getURL = driver.Url;
            Assert.AreEqual(true, getURL.Contains("https://mail.google.com/mail"));
        }

        [Test()]
        public void GoogleComposeEmail()
        {
            Login(EMAIL_ADDRESS1, PASSWORD);
            Sleep(5000);
            // should compose email successfully by Gmail1
            driver.FindElementByXPath("//div[@id='views']//div[@aria-label='Compose']").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@id='cmcc_composeto']//input[@id='composeto']").SendKeys(EMAIL_ADDRESS2);
            driver.FindElementByXPath("//input[@id='cmcsubj']").SendKeys(SUBJECT1);
            driver.FindElementById("cmcbody").SendKeys(BODY1);
            Sleep(1000);
            driver.FindElementByXPath("//div[@id='views']//div[text()='Send']").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@aria-label='Menu']").Click();
            Sleep(1000);
            driver.FindElementByXPath("//span[text()='Sent Mail']").Click();
            Sleep(1000);

            // verify the new email exists on Sent Email folder on Gmail1
            string getText = driver.FindElementByXPath("//div[@class='fm']").Text;
            Assert.AreEqual(true, getText.Contains(SUBJECT1));
            Assert.AreEqual(true, getText.Contains(BODY1));
            driver.FindElementByXPath("//div[contains(@class,'m')]//div[@role='listitem'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[contains(@class,'V j hj') and text()='Details']").Click();
            Sleep(1000);
            string getSubject = driver.FindElementByXPath("//span[@class='kj']/span").Text;
            string getBody = driver.FindElementByXPath("//div[@class='Hi']").Text;
            string getSentEmail = driver.FindElementByXPath("//div[@class='Kg']/span").Text;
            string getToEmail = driver.FindElementByXPath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']")
                    .Text;

            Assert.AreEqual(SUBJECT1, getSubject);
            Assert.AreEqual(BODY1, getBody);
            Assert.AreEqual(EMAIL_ADDRESS1, getSentEmail);
            Assert.AreEqual(EMAIL_ADDRESS2, getToEmail);

            // delete email on Sent Email and Trash folder on Gmail1
            driver.FindElementByXPath("//div[@id='cv__cntbt']//div[@class='V j Y Mm Kg']").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@class='V j cb Ol'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").Click();
            Sleep(2000);
            string getNoEmailMsg = driver.FindElementByXPath("//div[@class='Wl']").Text;

            Assert.AreEqual(MSG_NOEMAIL, getNoEmailMsg);

            driver.Navigate().GoToUrl(TRASH_URL);
            Sleep(5000);
            driver.FindElementByXPath("//div[@class='V j cb Ol'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@class='M j T b hc q m']//div[text()='Delete forever']").Click();
            getNoEmailMsg = driver.FindElementByXPath("//div[@class='Wl']").Text;

            Assert.AreEqual(MSG_NOEMAIL, getNoEmailMsg);

            driver.FindElementByXPath("//div[@aria-label='Menu']").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[contains(@class,'V Y Rx Kg')]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//button[@id='signout']").Click();
            Sleep(5000);

            driver.Navigate().GoToUrl(GOOGLE_URL);
            driver.Manage().Cookies.DeleteAllCookies();
            Thread.Sleep(3000);
            driver.Navigate().Refresh();


            // verify Gmail2 received a new email from Gmail1
            Login(EMAIL_ADDRESS2, PASSWORD);
            driver.Navigate().GoToUrl(GOOGLE_URL_HOMEPAGE);
            driver.Navigate().Refresh();
            Sleep(5000);

            getText = driver.FindElementByXPath("//div[@class='fm']").Text;
            Assert.AreEqual(true, getText.Contains(SUBJECT1));
            Assert.AreEqual(true, getText.Contains(BODY1));
            driver.FindElementByXPath("//div[contains(@class,'fm')]//div[@role='listitem'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[contains(@class,'V j hj') and text()='Details']").Click();
            Sleep(1000);
            getSubject = driver.FindElementByXPath("//span[@class='kj']/span").Text;
            getBody = driver.FindElementByXPath("//div[@class='Hi']").Text;
            getSentEmail = driver.FindElementByXPath("//div[@class='Kg']/span").Text;
            getToEmail = driver.FindElementByXPath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']").Text;

            Assert.AreEqual(SUBJECT1, getSubject);
            Assert.AreEqual(BODY1, getBody);
            Assert.AreEqual(EMAIL_ADDRESS1, getSentEmail);
            Assert.AreEqual(EMAIL_ADDRESS2, getToEmail);

            // delete email on Primary Email and Trash folder on Gmail2
            driver.FindElementByXPath("//div[contains(@class,'M j T b hc Om o')]//div[text()='Primary'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@class='V j cb Ol'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").Click();
            getNoEmailMsg = driver.FindElementByXPath("//div[@class='Wl']").Text;

            Assert.AreEqual(MSG_NOEMAIL_PRIMARY, getNoEmailMsg);

            driver.Navigate().GoToUrl(TRASH_URL);
            Sleep(5000);
            driver.FindElementByXPath("//div[@class='V j cb Ol'][1]").Click();
            Sleep(1000);
            driver.FindElementByXPath("//div[@class='M j T b hc q m']//div[text()='Delete forever']").Click();
            getNoEmailMsg = driver.FindElementByXPath("//div[@class='Wl']").Text;

            Assert.AreEqual(MSG_NOEMAIL, getNoEmailMsg);
        }

        private void Login(string username, string password)
        {
            driver.Navigate().GoToUrl(GOOGLE_URL);
            Sleep(5000);
            driver.FindElementById("Email").SendKeys(username);
            driver.FindElementById("next").Click();
            Sleep(1000);
            driver.FindElementById("Passwd").SendKeys(password);
            driver.FindElementById("signIn").Click();
            Sleep(10000);
        }

        private void Sleep(double milliseconds)
        {
            TimeSpan tp = TimeSpan.FromMilliseconds(milliseconds);
            Thread.Sleep(tp);
        }
    }
}
