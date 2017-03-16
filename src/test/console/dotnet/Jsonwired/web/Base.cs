using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.PageObjects;
using OpenQA.Selenium.Support.UI;

namespace web {
	public abstract class Base {
		private readonly IWebDriver driver;
		private readonly long timeoutInSeconds;
		public string url { get; set; } = "http://the-internet.herokuapp.com";

		public Base(IWebDriver driver, long timeoutInSeconds, String url) {
			this.timeoutInSeconds = timeoutInSeconds;
			this.driver = driver;
			this.url = url;
			PageFactory.InitElements(this.driver, this);
		}

		public IWebDriver getDriver() {
			return this.driver;
		}

		public virtual void open() {
			this.getDriver().Navigate().GoToUrl(this.url);
		}

		public void waitForElementVisible(IWebElement webElement) {
			WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
			wait.Until(driver => webElement.Displayed);
  	}

		public void waitForFrameVisible(String frameName) {
			WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
			wait.Until(ExpectedConditions.FrameToBeAvailableAndSwitchToIt(frameName));
  	}

		public void waitForAlertVisible() {
			WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
			wait.Until(ExpectedConditions.AlertIsPresent());
  	}
	}
}
