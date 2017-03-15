package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.concurrent.TimeUnit;

public class IFramesPage extends Base {
  @FindBy (xpath = "//*[@id=\"mce_0_ifr\"]")
  public WebElement iFrame;

  public IFramesPage(WebDriver driver, long timeoutInSeconds){
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/nested_frames");
  }

  public void open() throws Exception {
    super.open();
    this.getDriver().manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
  }

  public void switchToIFrame() throws Exception {
    this.waitForFrameVisible(iFrame);
    this.getDriver().switchTo().frame(iFrame);
  }
}
