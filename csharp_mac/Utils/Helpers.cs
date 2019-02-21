using System;
using OpenQA.Selenium.Remote;
using System.Threading;

namespace Appium.Utils
{
    public static class Helpers
    {
        public static void Pause(int seconds)
        {
            try {
              Thread.Sleep(seconds * 1000);
            }
            catch (Exception err){
              throw err;
            }
        }

        public static void GetSessionID(RemoteWebDriver driver)
        {
          Console.WriteLine("- WD Session ID: " + driver.SessionId);
          Console.Write("- Kobiton Session ID: ");
          Console.WriteLine(driver.Capabilities.GetCapability("kobitonSessionId").ToString());
        }
    }
}
