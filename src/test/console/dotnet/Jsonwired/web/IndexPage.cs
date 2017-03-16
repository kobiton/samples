using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace web {
	public class IndexPage : Base {
  		// Page elements
		[FindsBy (How = How.XPath, Using = "//*[@id=\"content\"]/h1[text() = \"Welcome to the Internet\"]")]
		public IWebElement header ;
		[FindsBy (How = How.XPath, Using = "//*[@id=\"content\"]/ul/li/a[text()=\"Dynamic Controls\"]")]
		public IWebElement elementByXpath ;
		[FindsBy(How = How.CssSelector, Using = "#content > ul > li:nth-child(11) > a")]
		public IWebElement elementByCss ;
		[FindsBy(How = How.TagName, Using = "a")]
		public IWebElement elementByTagName;
		[FindsBy(How = How.LinkText, Using = "Dynamic Controls")]
		public IWebElement elementByLinkText ;
		[FindsBy (How =How.PartialLinkText, Using = "Dynamic Controls")]
		public IWebElement elementByPartialLinkText;

		public IndexPage(IWebDriver driver, long timeoutInSeconds) :
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com") {
			}

		public override void open() {
			base.open();
			this.waitForElementVisible(header);
		}
	}
}
