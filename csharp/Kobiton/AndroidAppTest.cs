using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Support.UI;
using System.Drawing;
using System.Text.RegularExpressions;
using OpenQA.Selenium.Appium.MultiTouch;
using System.Collections.Generic;

namespace Kobiton
{
  [TestClass()]
  public class AndroidAppTest
  {
    private AndroidDriver<IWebElement> driver;
    string firstQuestion = "Acura MDX";
    string secondQuestion = "Cruise Control";

    [TestInitialize]
    public void Initialize()
    {
      driver = new AndroidDriver<IWebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesAndroidApp(), TimeSpan.FromSeconds(Configs.SESSION_TIMEOUT));
      driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(120));
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
    public void testIFixitAndroidApp()
    {
      // Keep the test cases in order
      testSearchQuestionsOnAcuraSupportCommunity();
      testSearchIFixitOnHomeScreen();
    }

    public void testSearchQuestionsOnAcuraSupportCommunity()
    {
      Console.WriteLine("should allow to search some questions on Acura Support Community");
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
      Thread.Sleep(2000);
      driver.FindElementByXPath("//*[@resource-id='android:id/home']").Click();
      Thread.Sleep(2000);
      driver.FindElementByXPath("//*[@text='Car and Truck']").Click();
      driver.FindElementByXPath("//*[@text='Acura']").Click();
      Thread.Sleep(2000);

      string acuraText = driver
        .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").Text;

      string acuraIntegraText = driver
        .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]").Text;
      string acuraMDXText = driver
        .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]").Text;
      string acuraRLText = driver
        .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]").Text;
      string acuraTLText = driver
        .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]").Text;
      string acuraTSXText = driver
        .FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]").Text;

      Assert.AreEqual(acuraText, "Acura");
      Assert.AreEqual(acuraIntegraText, "Acura Integra");
      Assert.AreEqual(acuraMDXText, "Acura MDX");
      Assert.AreEqual(acuraRLText, "Acura RL");
      Assert.AreEqual(acuraTLText, "Acura TL");
      Assert.AreEqual(acuraTSXText, "Acura TSX");

      /*
       * Steps: 
       * 1. Click on "Acura" General Information 
       * 2. Swipe from left to right, it will move to Answers tab
       * 3. Enter keyword 'Acura MDX'
       * 4. Click Search icon
       * 
       * Expected: It should show at least 6 results.
       */

      string getAttrName1 = searchQuestion(driver, firstQuestion);
      driver.Navigate().Back();
      /*
       * Steps: 
       * 1. Clear text on Search field
       * 2. Enter keyword 'Cruise Control' 
       * 3. Click on Search icon 
       * 4. Wait a few seconds to get returned result
       * 5. Close app
       * 
       * Expected: It should show at least 1 result.
       */

      string getAttrName2 = searchQuestion(driver, secondQuestion);

      driver.CloseApp();
      getAttrName1 = Regex.Replace(getAttrName1, "[^0-9]", "");
      Assert.IsTrue(Int16.Parse(getAttrName1) >= 6, "The expected results are greater or equal to 6 results.");
      getAttrName2 = Regex.Replace(getAttrName2, "[^0-9]", "");
      Assert.IsTrue(Int16.Parse(getAttrName2) >= 1, "The expected results are greater or equal to 1 result.");
    }

    public void testSearchIFixitOnHomeScreen()
    {
      Console.WriteLine("should allow to search iFixit on Home screen");

      /*
       * Steps: 
       * 1. Reopen iFixit app 
       * 2. Click Search menu on the left menu bar
       * 3. Search keyword 'Macbook Pro 2015' 
       * 4. Press Enter button on keyboard
       * 
       * Expected: It should show at least 47 results.
       * 
       * 5. Select Devices item on the Guides/Devices dropdown
       * 
       * Expected: It should show at least 5 results.
       */

      driver.LaunchApp();
      Thread.Sleep(2000);
      driver.FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/action_search']").Click();
      driver.FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']").SendKeys("Macbook Pro 2015");
      driver.PressKeyCode(66);
      Thread.Sleep(2000);
      string firstResult = driver.FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").Text;
      driver.FindElementByXPath("//*[@resource-id='android:id/text1' and @text='Guides']").Click();
      driver.FindElementByXPath("//*[@resource-id='android:id/text1' and @text='Devices']").Click();

      string secondResult = driver.FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']").Text;

      firstResult = Regex.Replace(firstResult, "[^0-9]", "");
      Assert.IsTrue(Int16.Parse(firstResult) >= 47,
        "The expected results are greater or equal to 47 results.");
      secondResult = Regex.Replace(secondResult, "[^0-9]", "");
      Assert.IsTrue(Int16.Parse(secondResult) >= 5,
        "The expected results are greater or equal to 5 results.");
    }

    public void swipe()
    {
      Size size = driver.Manage().Window.Size;
      int startX = (int)(size.Width * 0.90);
      int endX = (int)(size.Width * 0.10);
      int startY = size.Height / 2;
      driver.Swipe(startX, startY, endX, startY, 200);
      Thread.Sleep(2000);
    }

    public string searchQuestion(AndroidDriver<IWebElement> driver, string question)
    {
      driver.FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").Click();
      WebDriverWait wait = new WebDriverWait(driver, new TimeSpan(0, 0, 60));
      wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//android.widget.FrameLayout")));
      wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//*[@resource-id='com.dozuki.ifixit:id/topic_info_image']")));
      Thread.Sleep(3000);
      swipe();
      driver.FindElementByXPath("//*[@resource-id='answersSearch']").SendKeys(question);
      driver.FindElementByXPath("//*[@resource-id='searchIcon']").Click();
      Thread.Sleep(2000);

      return driver.FindElementByXPath("//android.view.View[contains(@content-desc,'questions') and @index=1]")
        .GetAttribute("name");
    }
  }
}
