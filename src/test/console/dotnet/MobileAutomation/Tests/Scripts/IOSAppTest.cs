using System;
using System.Collections.Generic;
using System.Threading;
using MobileAutomation.Config;
using MobileAutomation.Service;
using MobileAutomation.Service.Model;
using MobileAutomation.Tests.Utils;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.iOS;
using OpenQA.Selenium.Support.UI;
using Xunit;

namespace MobileAutomation.Tests.Scripts
{
    public class IOSAppTest : BaseTest
    {
        public IOSAppTest()
        {
            var device = new DeviceService().GetOnlineDeviceSync(DeviceType.IOS);
            Console.WriteLine(string.Format("Device {0} osVersion: {1} udid: {2}",
                                            device.DeviceName,
                                            device.PlatformVersion,
                                            device.Udid));

            driver = new IOSDriver<IWebElement>(AutomationUtils.Instance.KobitonServerUrl,
                                                AutomationUtils.Instance.DesiredCapabilitiesIOSApp(device),
                                                TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(60);
        }

        private IOSDriver<IWebElement> GetIOSDriver()
        {
            return (IOSDriver<IWebElement>)driver;
        }

        [Fact]
        public void TestIFixitIOSApp()
        {
            // Keep the test cases in order
            TestNavigationOnAcuraSupportCommunity();
            TestSearchIFixitOnHomeScreen();
        }

        public void TestNavigationOnAcuraSupportCommunity()
        {
            Console.WriteLine("should allow to navigate to some devices on Acura Support Community");

            /*
            * Steps: 
            * 1. Click on "Car and Truck" Categories on Homepage 
            * 2. Click on "Acura" Categories
            * 
            * Expected: 
            * 1. General Information is "Acura".
            * 2.Verify five devices below displays.
            * + Acura Integra
            * + Acura MDX
            * + Acura RL
            * + Acura TL
            * + Acura TSX
            */

            driver.FindElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").Click();
            Thread.Sleep(5000);
            driver.FindElementByXPath("//*[@name='Car and Truck']").Click();
            Thread.Sleep(2000);
            driver.FindElementByXPath("//*[@name='Acura']").Click();
            Thread.Sleep(2000);
            WebDriverWait wait = new WebDriverWait(driver, new TimeSpan(0, 0, 60));
            wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//XCUIElementTypeNavigationBar")));

            string acuraText = driver
              .FindElementByXPath("//XCUIElementTypeNavigationBar").GetAttribute("name");
            bool hasAcuraIntegra = driver
              .FindElementByXPath("//XCUIElementTypeStaticText[@name='Acura Integra']").Displayed;
            bool hasAcuraMDX = driver
              .FindElementByXPath("//XCUIElementTypeStaticText[@name='Acura MDX']").Displayed;
            bool hasAcuraRL = driver
              .FindElementByXPath("//XCUIElementTypeStaticText[@name='Acura RL']").Displayed;
            bool hasAcuraTL = driver
              .FindElementByXPath("//XCUIElementTypeStaticText[@name='Acura TL']").Displayed;
            bool hasAcuraTSX = driver
              .FindElementByXPath("//XCUIElementTypeStaticText[@name='Acura TSX']").Displayed;

            GetIOSDriver().CloseApp();

            Assert.Equal(acuraText, "Acura");
            Assert.Equal(hasAcuraIntegra, true);
            Assert.Equal(hasAcuraMDX, true);
            Assert.Equal(hasAcuraRL, true);
            Assert.Equal(hasAcuraTL, true);
            Assert.Equal(hasAcuraTSX, true);
        }

        public void TestSearchIFixitOnHomeScreen()
        {
            Console.WriteLine("should allow to search iFixit on Home screen");

            /*
             Steps:
             1. Reopen iFixit app
             2. Click Search menu on the left menu bar
             3. Search keyword 'Macbook Pro 2015'
             4. Press Enter button on keyboard

             Expected: It should show at least 33 results.

             5. Clear the current content
             6. Search keyword 'Acura' on Categories tab

             Expected: It should show at least 6 results.
             */

            GetIOSDriver().LaunchApp();
            Thread.Sleep(5000);
            driver.FindElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").Click();
            Thread.Sleep(2000);
            driver.FindElementByXPath("//*[@name='Search']").Click();
            driver.FindElementByXPath("//XCUIElementTypeSearchField[@name='Search']").SendKeys("Macbook Pro 2015");
            Thread.Sleep(2000);

            IList<IWebElement> firstResult = driver.FindElementsByXPath("//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]");

            driver.FindElementByXPath("//XCUIElementTypeButton[@name='Cancel']").Click();
            driver.FindElementByXPath("//*[@name='Search']").Click();
            driver.FindElementByXPath("//XCUIElementTypeSearchField[@name='Search']").SendKeys("Acura");
            driver.FindElementByXPath("//XCUIElementTypeButton[@name='Categories']").Click();
            Thread.Sleep(2000);

            IList<IWebElement> secondResult = driver.FindElementsByXPath("//XCUIElementTypeStaticText[contains(@label,'Acura')]");

            Assert.True(firstResult.Count >= 34, "The expected results are greater or equal to 33 results.");
            Assert.True(secondResult.Count >= 6, "The expected results are greater or equal to 6 results.");
        }
    }
}
