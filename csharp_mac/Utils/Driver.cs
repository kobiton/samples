using System;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.iOS;

namespace Appium.Utils
{
    public class Driver
    {
        private RemoteWebDriver driver_;
        private AndroidDriver<IWebElement> androidDriver_;
        private IOSDriver<IWebElement> iosDriver_;
        private Capabilities config_;
        private Environments env_;
        private const int TIMEOUT = 160 * 1000;
        private const int IMPLICIT_WAIT = 20 * 1000;
        public Driver()
        {
            config_ = new Capabilities();
            env_ = new Environments();
        }

        public RemoteWebDriver CreateWebDriver(DesiredCapabilities capability)
        {
            driver_ = new RemoteWebDriver(env_.GetEnvironmentInfo().API_URL, capability, System.TimeSpan.FromMilliseconds(TIMEOUT));
            driver_.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromMilliseconds(IMPLICIT_WAIT));
            return driver_;
        }

        public AndroidDriver<IWebElement> CreateAndroidDriver(DesiredCapabilities capability)
        {
            androidDriver_ = new AndroidDriver<IWebElement>(env_.GetEnvironmentInfo().API_URL, capability, System.TimeSpan.FromMilliseconds(TIMEOUT));
            androidDriver_.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromMilliseconds(IMPLICIT_WAIT));
            return androidDriver_;
        }

        public IOSDriver<IWebElement> CreateIOSDriver(DesiredCapabilities capability)
        {
            iosDriver_ = new IOSDriver<IWebElement>(env_.GetEnvironmentInfo().API_URL, capability, System.TimeSpan.FromMilliseconds(TIMEOUT));
            iosDriver_.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromMilliseconds(IMPLICIT_WAIT));
            return iosDriver_;
        }
    }
}
