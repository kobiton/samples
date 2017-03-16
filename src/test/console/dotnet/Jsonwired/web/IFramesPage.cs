using OpenQA.Selenium;

namespace web
{
	public class IFramesPage : Base
	{
		string frameId = "mce_0_ifr";

		public IFramesPage(IWebDriver driver, long timeoutInSeconds) :
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/nested_frames") {
			}

		public override void open() {
			base.open();
			this.waitForFrameVisible(frameId);
		}

  	public void switchToIFrame() {
    	this.waitForFrameVisible(frameId);
			this.getDriver().SwitchTo().Frame(frameId);
		}
	}
}
