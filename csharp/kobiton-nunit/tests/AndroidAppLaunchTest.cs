using NUnit.Framework;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Appium;
using System;

namespace Kobiton.NUnitSamples
{
    [TestFixture]
    public class AndroidAppLaunchTest
    {
        private RemoteWebDriver? driver;

        [Test]
        public void Launch_Android_App_On_Kobiton()
        {
            // NOTE: These are placeholders. Update your Username and API key
            string username = "YOUR_KOBITON_USERNAME";
            string apiKey = "YOUR_KOBITON_API_KEY";
            string hubBase = "https://api.kobiton.com/wd/hub";

            if (username.StartsWith("YOUR_") || apiKey.StartsWith("YOUR_"))
            {
                Assert.Ignore("Set YOUR_KOBITON_USERNAME and YOUR_KOBITON_API_KEY before running this test.");
            }




            var builder = new UriBuilder(hubBase) { UserName = username, Password = apiKey };

            var options = new AppiumOptions();

            // Explicit auth caps (works even when basic auth is present)
            options.AddAdditionalAppiumOption("kobiton:username", username);
            options.AddAdditionalAppiumOption("kobiton:accessKey", apiKey);

            // Standard caps
            options.PlatformName = "Android";
            options.AutomationName = "UiAutomator2";
            options.DeviceName = "001 - Pixel 6";           // TODO: update
            options.PlatformVersion = "12";                 // TODO: update
            options.App = "kobiton-store:v749318";          // TODO: update

            // Kobiton caps
            options.AddAdditionalAppiumOption("kobiton:groupId", 13945);                // TODO: update
            options.AddAdditionalAppiumOption("kobiton:deviceGroup", "ORGANIZATION");   // TODO: update
            options.AddAdditionalAppiumOption("kobiton:sessionName", "C# NUnit Android App Launch");
            options.AddAdditionalAppiumOption("kobiton:deviceOrientation", "portrait");
            options.AddAdditionalAppiumOption("kobiton:captureScreenshots", true);
            options.AddAdditionalAppiumOption("kobiton:retainDurationInSeconds", 0);

            driver = new RemoteWebDriver(builder.Uri, options);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            Console.WriteLine("Session ID: " + driver.SessionId);

            // Basic sanity check that session is alive and we can query page source
            var src = driver.PageSource;
            Console.WriteLine("Page source preview: " + src.Substring(0, Math.Min(500, src.Length)));

            Assert.That(src, Is.Not.Empty, "App should launch and page source should not be empty.");
        }

        [TearDown]
        public void TearDown()
        {
            try { driver?.Quit(); } catch { /* ignore cleanup failures */ }
            driver?.Dispose();
        }
    }
}
