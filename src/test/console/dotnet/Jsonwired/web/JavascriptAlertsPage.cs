using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace web {
	public class JavaScriptAlertsPage : Base {
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]/div/h3[contains(.,\"JavaScript Alerts\")]")]
		public IWebElement header ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]/div/ul/li/button[contains(., \"Click for JS Alert\")]")]
		public IWebElement clickForJSAlertButton ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]/div/ul/li/button[contains(., \"Click for JS Confirm\")]")]
		public IWebElement clickForJSConfirmButton ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]/div/ul/li/button[contains(., \"Click for JS Prompt\")]")]
		public IWebElement clickForJSPromptButton ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"result\"]")]
		public IWebElement resultMessage ;

		public string alertMessage  = "You successfully clicked an alert";
		public string confirmWithOKMessage  = "You clicked: Ok";
		public string confirmWithCancelMessage = "You clicked: Cancel";

		public JavaScriptAlertsPage(IWebDriver driver, long timeoutInSeconds) :
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/javascript_alerts") {
			}

		public override void open() {
			base.open();
			this.waitForElementVisible(header);
		}

	  public void clickOnJSAlertButton() {
			clickForJSAlertButton.Click();
	    	this.waitForAlertVisible();
		}

		public void clickOnJSConfirmButton() {
			clickForJSConfirmButton.Click();
	    	this.waitForAlertVisible();
		}

		public void clickOnJSPromptButton() {
			clickForJSPromptButton.Click();
	    	this.waitForAlertVisible();
		}
	}
}
