using System;
using Appium.Utils;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.iOS;
using OpenQA.Selenium.Remote;

namespace Appium.Models
{
    public class UIKitCatalog_IOS
    {
        private IOSDriver<IWebElement> driver_;
        private String categoryXpath, goBackButton, categoryTitle;
        public UIKitCatalog_IOS(DesiredCapabilities capability)
        {
            driver_ = new Driver().CreateIOSDriver(capability);
            Helpers.GetSessionID(driver_);
            categoryXpath = "//UIAStaticText[@name='Activity Indicators']";
            goBackButton = "//XCUIElementTypeButton[@type='XCUIElementTypeButton' and @label='UIKitCatalog']";
            categoryTitle = "//XCUIElementTypeStaticText[@name='Activity Indicators']";
        }

        public String GetCategoryTitle()
        {
          /*
            * Steps:
            * 1. If '< UIKitCatalog' element appear then click on it
            * 2. Click on "Car and Truck" Categories on Homepage
            * 3. Click on "Acura" Categories
            * 4. Return the category text title which should be "Acura"
            *
            * Expected:
            * General Information is "Acura".
          */
          if(driver_.FindElementByXPath(goBackButton).Displayed) {
              driver_.FindElementByXPath(goBackButton).Click();
              Helpers.Pause(2);
          }
          driver_.FindElementByXPath(categoryXpath).Click();
          Helpers.Pause(2);
          return driver_.FindElementByXPath(categoryTitle).Text;
        }
        public void CleanUp() => this.driver_.Dispose();
    }
}
