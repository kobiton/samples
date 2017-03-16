using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace Jsonwired
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
			string kobitonServerUrl = "http://api-test.kobiton.com/wd/hub";
			DesiredCapabilities capabilities = new DesiredCapabilities();
			capabilities.SetCapability("username", "api_test4");
			capabilities.SetCapability("accessKey", "f8d14784-85b5-46a4-8a5c-da8ab22c2068");
			capabilities.SetCapability("sessionName", "Automation test session");
			capabilities.SetCapability("sessionDescription", "");
			capabilities.SetCapability("deviceOrientation", "portrait");
			capabilities.SetCapability("captureScreenshots", true);
			capabilities.SetCapability("browserName", "chrome");
			capabilities.SetCapability("deviceGroup", "KOBITON");
			capabilities.SetCapability("deviceName", "Galaxy S5");
			capabilities.SetCapability("platformVersion", "5.0");
			capabilities.SetCapability("platformName", "Android");
			try
			{
				IWebDriver driver = new RemoteWebDriver(new Uri(kobitonServerUrl), capabilities);
				driver.Navigate().GoToUrl("https://www.google.com/ncr");
				driver.Quit();
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
			}

		}
	}
}
