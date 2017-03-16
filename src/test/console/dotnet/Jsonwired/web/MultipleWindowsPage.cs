using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace web {
	public class MultipleWindowsPage : Base {
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]/div/h3[text() = \"Opening a new window\"]")]
		public IWebElement header ;
		[FindsBy(How = How.XPath, Using = "//*[@id=\"content\"]/div/a[contains(.,\"Click Here\")]")]
		 public IWebElement clickHere ;

		public MultipleWindowsPage(IWebDriver driver, long timeoutInSeconds):
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/windows") {
			}

		public override void open() {
			base.open();
			this.waitForElementVisible(header);
		}

		 public void createWindows(int? numOfWindows) {
			for (int i = 0; i < numOfWindows; i++) {
				this.clickHere.Click();
			}
		}

			public void closeCreatedWindows(string baseWindow) {
				foreach (string handle in this.getDriver().WindowHandles) {
					// Switch to window handle
					if (!baseWindow.Equals(handle)) {
					this.getDriver().SwitchTo().Window(handle);
					this.getDriver().Close();
					}
				}
			}
	}
}
