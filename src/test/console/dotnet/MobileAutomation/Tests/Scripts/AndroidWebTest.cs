﻿using System;
using MobileAutomation.Config;
using MobileAutomation.Service;
using MobileAutomation.Service.Model;
using MobileAutomation.Tests.Utils;
using OpenQA.Selenium.Remote;
using Xunit;

namespace MobileAutomation.Tests.Scripts
{
  public class AndroidWebTest : BaseTest
  {
    readonly string successMsg = "You logged into a secure area!";
    public AndroidWebTest()
    {
      var device = new DeviceService().GetOnlineDeviceSync(DeviceType.Android);
      Console.WriteLine(string.Format("Device {0} osVersion: {1} udid: {2}",
                                      device.DeviceName,
                                      device.PlatformVersion,
                                      device.Udid));
      driver = new RemoteWebDriver(AutomationUtils.Instance.KobitonServerUrl,
                                   AutomationUtils.Instance.DesiredCapabilitiesAndroidWeb(device),
                                   TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
      driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(60);
    }

    [Fact]
    public void TestIFixitAndroidWeb()
    {
      try {
        TestLoginSuccessfully();
      }finally {
        this.Dispose();
      }
    }

    public void TestLoginSuccessfully()
    {
      Console.WriteLine("should run test successfully with correct username and password");
      Login("tomsmith", "SuperSecretPassword!");
      Assert.Contains(successMsg, GetMessage());
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