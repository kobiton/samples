package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.concurrent.TimeUnit;

public class NestedFramesPage extends Base {
  @FindBy (xpath = "//frame[@name=\"frame-left\"]")
  public WebElement frameLeft;
  @FindBy (xpath = "//frame[@name=\"frame-right\"]")
  public WebElement frameRight;
  @FindBy (xpath = "//frame[@name=\"frame-middle\"]")
  public WebElement frameMiddle;
  @FindBy (xpath = "//frame[@name=\"frame-bottom\"]")
  public WebElement frameBottom;

  public NestedFramesPage(WebDriver driver, long timeoutInSeconds){
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/nested_frames");
  }

  public void open() throws Exception {
    super.open();
    this.getDriver().manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
  }

  public void switchToFrameLeft() throws Exception {
    this.waitForFrameVisible(frameLeft);
    this.getDriver().switchTo().frame(frameLeft);
  }

  public void switchToFrameMiddle() throws Exception {
    this.waitForFrameVisible(frameMiddle);
    this.getDriver().switchTo().frame(frameMiddle);
  }

  public void switchToFrameRight() throws Exception {
    this.waitForFrameVisible(frameRight);
    this.getDriver().switchTo().frame(frameRight);
  }

  public void switchToFrameBottom() throws Exception {
    this.waitForFrameVisible(frameBottom);
    this.getDriver().switchTo().frame(frameBottom);
  }

  public void switchToParentFrame() throws Exception {
    this.getDriver().switchTo().parentFrame();
  }
}
