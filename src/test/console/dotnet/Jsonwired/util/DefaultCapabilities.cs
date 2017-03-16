using System;
using OpenQA.Selenium.Remote;

namespace util {
	public class DefaultCapabilities {
		public static DesiredCapabilities getDefaultCapabilities(string platFormName) {

			DesiredCapabilities capabilities = new DesiredCapabilities();
			capabilities.SetCapability("sessionDescription", "C# Selenium Webdriver");
			capabilities.SetCapability("deviceOrientation", "portrait");
			capabilities.SetCapability("deviceGroup", "KOBITON");
			capabilities.SetCapability("captureScreenshots", true);
			if (platFormName.Equals("iOS")) {
				capabilities.SetCapability("sessionName", "iOS: c#-jsonwired");
				capabilities.SetCapability("browserName", "safari");
				capabilities.SetCapability("deviceName", "iPhone 5");
				capabilities.SetCapability("platformName", "iOS");
			}
			else {
				capabilities.SetCapability("sessionName", "Android: c#-jsonwired");
				capabilities.SetCapability("browserName", "chrome");
				capabilities.SetCapability("deviceName", "Galaxy J3");
				capabilities.SetCapability("platformName", "Android");
			}
			return capabilities;
		}
	}
}