using System;
using Appium.Utils;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Remote;

namespace Appium.Models
{
    public class iFixit_Android
    {
        private AndroidDriver<IWebElement> driver_;
        private String browseDevicesXpath, carTruckXpath, acuraXpath;
        public iFixit_Android(DesiredCapabilities capability)
        {
            driver_ = new Driver().CreateAndroidDriver(capability);
            Helpers.GetSessionID(driver_);
            browseDevicesXpath = "//*[@text='Browse Devices']";
            carTruckXpath = "//*[@text='Car and Truck']";
            acuraXpath = "//*[@text='Acura']";
        }

        public String GetCategoryTitle()
        {
            /*
              * Steps:
              * 1. Click on "Car and Truck" Categories on Homepage
              * 2. Click on "Acura" Categories
              *
              * Expected:
              * General Information is "Acura".
            */
            Helpers.Pause(5);
            if(driver_.FindElementsByXPath(browseDevicesXpath).Count > 0) {
                driver_.FindElementByXPath(browseDevicesXpath).Click();
            }
            Helpers.Pause(2);
            driver_.FindElementByXPath(carTruckXpath).Click();
            driver_.FindElementByXPath(acuraXpath).Click();
            Helpers.Pause(2);
            string acuraText = driver_.FindElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").Text;
            return acuraText;
        }

        public void CleanUp() => this.driver_.Dispose();

    }
}
