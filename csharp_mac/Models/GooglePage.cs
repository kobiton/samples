using OpenQA.Selenium.Remote;
using Appium.Utils;
using System;

namespace Appium.Models
{
    public class GooglePage
    {
        private string testUrl, searchInputXpath, formId, searchKey;
        private RemoteWebDriver driver_;

        public GooglePage(DesiredCapabilities capability)
        {
            driver_ = new Driver().CreateWebDriver(capability);
            testUrl = "http://google.com";
            searchInputXpath = "//input[@name='q']";
            formId = "tsf";
            searchKey = "Kobiton";
            Helpers.GetSessionID(driver_);
        }

        public void Login()
        {
            driver_.Navigate().GoToUrl(testUrl);
            driver_.FindElementByXPath(searchInputXpath).SendKeys(searchKey);
            driver_.FindElementById(formId).Submit();
        }

        public string GetDriverTitle()
        {
            return driver_.Title;
        }

        public void CleanUp() => driver_.Dispose(); //body expression
    }
}
