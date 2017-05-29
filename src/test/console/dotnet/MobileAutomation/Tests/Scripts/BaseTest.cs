using System;
using OpenQA.Selenium.Remote;

namespace MobileAutomation.Tests
{
    public abstract class BaseTest : IDisposable
    {
        protected RemoteWebDriver driver;

        public void Dispose()
        {
            if (driver != null)
            {
                driver.Quit();
            }
        }
    }
}
