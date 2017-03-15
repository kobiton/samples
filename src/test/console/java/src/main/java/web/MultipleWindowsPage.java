package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class MultipleWindowsPage extends Base {
  @FindBy(xpath= "//*[@id=\"content\"]/div/h3[text() = \"Opening a new window\"]")
  public WebElement header;
  @FindBy(xpath = "//*[@id=\"content\"]/div/a[contains(.,\"Click Here\")]")
  public WebElement clickHere;

  public MultipleWindowsPage(WebDriver driver, long timeoutInSeconds) {
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/windows");
  }

  public void open() throws Exception{
    super.open();
    this.waitForElementVisible(header);
  }

  public void createWindows(Integer numOfWindows) {
    for (int i = 0; i< numOfWindows; i++) {
      this.clickHere.click();
    }
  }

  public void closeCreatedWindows(String baseWindow){
    for(String handle: this.getDriver().getWindowHandles() ){
      // Switch to window handle
      if(!baseWindow.equals(handle)){
        this.getDriver().switchTo().window(handle);
        this.getDriver().close();
      }
    }
  }

}
