using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.iOS;
using OpenQA.Selenium.Support.UI;
using System.Drawing;
using System.Collections.Generic;

namespace Kobiton
{
  [TestClass()]
  public class iOSAppTest
  {
    private IOSDriver<IWebElement> driver;

    [TestInitialize]
    public void Initialize()
    {
      driver = new IOSDriver<IWebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesiOSApp(), TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
      driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(60));
    }

    [TestCleanup]
    public void Cleanup()
    {
      if (driver != null)
      {
        driver.Quit();
      }
    }

    [TestMethod]
    public void testIFixitIOSApp()
    {
      // Keep the test cases in order
      testNavigationOnAcuraSupportCommunity();
      testSearchIFixitOnHomeScreen();
    }

    public void testNavigationOnAcuraSupportCommunity()
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

      driver.CloseApp();

      Assert.AreEqual(acuraText, "Acura");
      Assert.AreEqual(hasAcuraIntegra, true);
      Assert.AreEqual(hasAcuraMDX, true);
      Assert.AreEqual(hasAcuraRL, true);
      Assert.AreEqual(hasAcuraTL, true);
      Assert.AreEqual(hasAcuraTSX, true);
    }

    public void testSearchIFixitOnHomeScreen()
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

      driver.LaunchApp();
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

      Assert.IsTrue(firstResult.Count >= 34, "The expected results are greater or equal to 33 results.");
      Assert.IsTrue(secondResult.Count >= 6, "The expected results are greater or equal to 6 results.");
    }
  }
}
