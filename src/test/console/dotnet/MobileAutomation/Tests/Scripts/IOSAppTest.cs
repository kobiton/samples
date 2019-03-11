using System;
using System.Threading;
using MobileAutomation.Config;
using MobileAutomation.Service;
using MobileAutomation.Service.Model;
using MobileAutomation.Tests.Utils;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Remote;
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
      driver = new RemoteWebDriver(AutomationUtils.Instance.KobitonServerUrl,
                                     AutomationUtils.Instance.DesiredCapabilitiesIOSApp(device),
                                     TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
      driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(60);
    }

    [Fact]
    public void TestIFixitIOSApp()
    {
      try
      {
        TestNavigationOnAcuraSupportCommunity();
      }
      finally
      {
        this.Dispose();
      }
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
      * 2.Verify Acura Integra displays.
      */
      Thread.Sleep(3000);
      driver.FindElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").Click();
      Thread.Sleep(2000);
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
      Assert.Equal(acuraText, "Acura");
      Assert.Equal(hasAcuraIntegra, true);
    }
  }
}