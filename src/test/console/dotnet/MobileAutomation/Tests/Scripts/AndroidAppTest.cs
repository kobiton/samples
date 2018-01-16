﻿using System;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Threading;
using MobileAutomation.Config;
using MobileAutomation.Service;
using MobileAutomation.Service.Model;
using MobileAutomation.Tests.Utils;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using Xunit;

namespace MobileAutomation.Tests.Scripts
{
    public class AndroidAppTest : BaseTest
    {
        string question = "Acura MDX";

        public AndroidAppTest()
        {
            var device = new DeviceService().GetOnlineDeviceSync(DeviceType.Android);
            Console.WriteLine(string.Format("Device {0} osVersion: {1} udid: {2}",
                                            device.DeviceName,
                                            device.PlatformVersion,
                                            device.Udid));

            driver = new AndroidDriver<IWebElement>(AutomationUtils.Instance.KobitonServerUrl,
                                                    AutomationUtils.Instance.DesiredCapabilitiesAndroidApp(device),
                                                    TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(60);
        }

        private AndroidDriver<IWebElement> GetAndroidDriver()
        {
            return (AndroidDriver<IWebElement>)driver;
        }

        [Fact]
        public void TestIFixitAndroidApp()
        {
            TestSearchQuestionsOnAcuraSupportCommunity();
        }

        public void TestSearchQuestionsOnAcuraSupportCommunity()
        {
            Console.WriteLine("should allow to search some questions on Acura Support Community");
            /*
             * Steps:
             * 1. Click on "Car and Truck" Categories on Homepage
             * 2. Click on "Acura" Categories
             *
             * Expected:
             * General Information is "Acura"
             */
            Thread.Sleep(2000);
            driver.FindElementByXPath("//*[@resource-id='android:id/home']").Click();
            Thread.Sleep(2000);
            driver.FindElementByXPath("//*[@text='Car and Truck']").Click();
            driver.FindElementByXPath("//*[@text='Acura']").Click();
            Thread.Sleep(2000);

            string acuraText = driver
              .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").Text;

            Assert.Equal(acuraText, "Acura");
        }

    }
}