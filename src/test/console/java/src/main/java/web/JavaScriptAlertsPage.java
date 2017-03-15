package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class JavaScriptAlertsPage extends Base {
  @FindBy(xpath = "//*[@id=\"content\"]/div/h3[contains(.,\"JavaScript Alerts\")]")
  public WebElement header;
  @FindBy(xpath ="//*[@id=\"content\"]/div/ul/li/button[contains(., \"Click for JS Alert\")]" )
  public WebElement clickForJSAlertButton;
  @FindBy(xpath = "//*[@id=\"content\"]/div/ul/li/button[contains(., \"Click for JS Confirm\")]")
  public WebElement clickForJSConfirmButton;
  @FindBy(xpath = "//*[@id=\"content\"]/div/ul/li/button[contains(., \"Click for JS Prompt\")]")
  public WebElement clickForJSPromptButton;
  @FindBy(xpath = "//*[@id=\"result\"]")
  public WebElement resultMessage;

  public String alertMessage = "You successfully clicked an alert";
  public String confirmWithOKMessage = "You clicked: Ok";
  public String confirmWithCancelMessage = "You clicked: Cancel";

  public JavaScriptAlertsPage(WebDriver driver, long timeoutInSeconds) {
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/javascript_alerts");
  }

  public void open() throws Exception {
    super.open();
    this.waitForElementVisible(header);
  }

  public void clickOnJSAlertButton() throws Exception {
    clickForJSAlertButton.click();
    this.waitForAlertVisible();
  }

  public void clickOnJSConfirmButton() throws Exception {
    clickForJSConfirmButton.click();
    this.waitForAlertVisible();
  }

  public void clickOnJSPromptButton() throws Exception {
    clickForJSPromptButton.click();
    this.waitForAlertVisible();
  }
}
