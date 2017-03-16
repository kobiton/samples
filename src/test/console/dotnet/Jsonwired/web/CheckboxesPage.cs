using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace web {
	public class CheckboxesPage : Base {
  		// Page elements
		[FindsBy(How = How.XPath, Using = "//*[@id=\"checkboxes\"]/input[1]")]
		public IWebElement checkbox1 ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"checkboxes\"]/input[2]")]
		public IWebElement checkbox2 ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]")]
		public IWebElement content ;

		public CheckboxesPage(IWebDriver driver, long timeoutInSeconds) :
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/checkboxes")	{
			}

		public override void open() {
			base.open();
			this.waitForElementVisible(checkbox1);
		}

  	public bool isCheckbox1Selected() {
			return checkbox1.Selected;
		}

		public string getInputType() {
			return checkbox1.GetAttribute("type");
		}

		public void clickCheckbox1() {
			checkbox1.Click();
		}
	}
}
