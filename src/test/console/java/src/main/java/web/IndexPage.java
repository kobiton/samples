package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class IndexPage extends Base {
  @FindBy(xpath= "//*[@id=\"content\"]/h1[text() = \"Welcome to the Internet\"]")
  public WebElement header;
  @FindBy(xpath = "//*[@id=\"content\"]/ul/li/a[text()=\"Dynamic Controls\"]")
  public WebElement elementByXpath;
  @FindBy(css = "#content > ul > li:nth-child(11) > a")
  public WebElement elementByCss;
  @FindBy(tagName = "a")
  public WebElement elementByTagName;
  @FindBy(linkText = "Dynamic Controls")
  public WebElement elementByLinkText;
  @FindBy(partialLinkText = "Dynamic Controls")
  public WebElement elementByPartialLinkText;

  public IndexPage(WebDriver driver, long timeoutInSeconds) {
    super(driver, timeoutInSeconds, "http://the-internet.herokuapp.com");
  }

  public void open() throws Exception {
    super.open();
    this.waitForElementVisible(header);
  }

  public Boolean existElementByXpath() {
    return elementByXpath.isDisplayed();
  }

  public Boolean existElementByCss() {
    return elementByCss.isDisplayed();
  }

  public Boolean existElementByTagName() {
    return elementByTagName.isDisplayed();
  }

  public Boolean existElementByLinkText() {
    return elementByLinkText.isDisplayed();
  }

  public Boolean existElementByPartialLinkText() {
    return elementByPartialLinkText.isDisplayed();
  }

}
