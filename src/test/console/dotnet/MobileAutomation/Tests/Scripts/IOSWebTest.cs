using System;
using MobileAutomation.Config;
using MobileAutomation.Service;
using MobileAutomation.Service.Model;
using MobileAutomation.Tests.Utils;
using OpenQA.Selenium.Remote;
using Xunit;

namespace MobileAutomation.Tests.Scripts
{
    public class IOSWebTest : BaseTest
    {
        string wrongUsernameMsg = "Your username is invalid!";
        string wrongPasswordMsg = "Your password is invalid!";
        string successMsg = "You logged into a secure area!";

        public IOSWebTest()
        {
            var device = new DeviceService().GetOnlineDeviceSync(DeviceType.IOS);
            Console.WriteLine(string.Format("Device {0} osVersion: {1} udid: {2}",
                                            device.DeviceName,
                                            device.PlatformVersion,
                                            device.Udid));

            driver = new RemoteWebDriver(AutomationUtils.Instance.KobitonServerUrl,
                                        AutomationUtils.Instance.DesiredCapabilitiesIOSWeb(device),
                                        TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(60);
        }

        [Fact]
        public void TestIFixitiOSWeb()
        {
            // Keep the test cases in order
            TestInvalidUsername();
            TestInvalidPassword();
            TestLoginSuccessfully();
        }

        public void TestInvalidUsername()
        {
            Console.WriteLine("should return error when we input wrong username");
            Login("foo", "SuperSecretPassword!");
            Assert.True(GetMessage().Contains(wrongUsernameMsg));
        }

        public void TestInvalidPassword()
        {
            Console.WriteLine("should return error when we input wrong password");
            Login("tomsmith", "SuperSecretPassword");
            Assert.True(GetMessage().Contains(wrongPasswordMsg));
        }

        public void TestLoginSuccessfully()
        {
            Console.WriteLine("should run test successfully with correct username and password");
            Login("tomsmith", "SuperSecretPassword!");
            Assert.True(GetMessage().Contains(successMsg));
        }

        private void Login(String userName, String password)
        {
            driver.Navigate().GoToUrl("http://the-internet.herokuapp.com/login");
            driver.FindElementById("username").SendKeys(userName);
            driver.FindElementById("password").SendKeys(password);
            driver.FindElementByXPath("//form[@name='login']").Submit();
        }

        private String GetMessage()
        {
            return driver.FindElementById("flash").Text;
        }
    }
}