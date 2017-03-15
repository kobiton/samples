package web;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.WebDriver;

class FormAuthenticationPage extends Base {
  // Page elements
  @FindBy(id = "username")
  public WebElement usernameText;
  @FindBy(id = "password")
  public WebElement passwordText;
  @FindBy(xpath= "//form[@name=\"login\"]")
  public WebElement loginForm;
  @FindBy(xpath= "//div[@id=\"flash\"]")
  public WebElement message;

  public FormAuthenticationPage(WebDriver driver, long timeoutInSeconds) {
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com/login");
  }

  public void open() throws Exception {
    super.open();
    this.waitForElementVisible(usernameText);
  }

  public void login(String username, String password)  throws  Exception {
    this.waitForElementVisible(usernameText);
    usernameText.sendKeys(username);
    passwordText.sendKeys(password);
    loginForm.submit();
  }

  public String getMessage() throws Exception {
    waitForElementVisible(message);
    return message.getText();
  }
}
