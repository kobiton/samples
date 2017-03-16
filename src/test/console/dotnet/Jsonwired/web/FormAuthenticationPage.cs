using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace web {
	class FormAuthenticationPage : Base {
		// Page elements
		[FindsBy(How = How.Id, Using = "username")]
		public IWebElement usernameText ;
		[FindsBy(How = How.Id, Using = "password")]
		public IWebElement passwordText ;
		[FindsBy(How = How.XPath, Using = "//form[@name=\"login\"]")]
		public IWebElement loginForm ;
		[FindsBy(How = How.XPath, Using = "//div[@id=\"flash\"]")]
		public IWebElement message ;

		public FormAuthenticationPage(IWebDriver driver, long timeoutInSeconds):
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/login")	{
			}

		public override void open() {
			base.open();
			this.waitForElementVisible(usernameText);
		}

  	public void login(string username, string password) {
			usernameText.SendKeys(username);
			passwordText.SendKeys(password);
			loginForm.Submit();
		}

  	public string getMessage() {
			this.waitForElementVisible(message);
			return message.Text;
		}
	}
}
