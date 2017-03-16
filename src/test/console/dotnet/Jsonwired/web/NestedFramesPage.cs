using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace web {
	public class NestedFramesPage : Base {
	  // Page elements
		String frameLeft { get; } = "frame-left";
		String frameRight { get; } = "frame-right";
		String frameMiddle { get; } = "frame-middle";
		String frameBottom { get; } = "frame-bottom";

		public NestedFramesPage(IWebDriver driver, long timeoutInSeconds):
			base(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/nested_frames")	{
			}

		public override void open() {
			base.open();
			this.waitForFrameVisible(frameLeft);
		}

	  public void switchToFrameLeft() {
			this.getDriver().SwitchTo().Frame(frameLeft);
		}

		public void switchToFrameMiddle() {
			this.getDriver().SwitchTo().Frame(frameMiddle);
		}

		public void switchToFrameRight() {
			this.getDriver().SwitchTo().Frame(frameRight);
		}

		public void switchToFrameBottom() {
			this.getDriver().SwitchTo().Frame(frameBottom);
		}

		public void switchToParentFrame() {
	    	this.getDriver().SwitchTo().ParentFrame();
		}
	}
}
