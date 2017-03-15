package web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.Alert;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract  class Base {
  private String url;
  private final WebDriver driver;
  private final long timeoutInSeconds;

  public Base(WebDriver driver, long timeoutInSeconds, String url) {
    this.timeoutInSeconds = timeoutInSeconds;
    this.driver = driver;
    this.url = url;
    PageFactory.initElements(this.driver, this);
  }

  public void open() throws Exception{
    this.getDriver().get(this.getUrl());
  }

  public WebDriver getDriver() {
    return this.driver;
  }

  public String getUrl() {
    return this.url;
  }

  public void waitForElementVisible(WebElement webElement) throws Exception {
    WebDriverWait wait =  new WebDriverWait(driver, timeoutInSeconds, 2000);
    wait.until(ExpectedConditions.visibilityOf(webElement));
  }

  public void waitForFrameVisible(WebElement frameElement) throws Exception {
    WebDriverWait wait =  new WebDriverWait(driver, timeoutInSeconds, 2000);
    wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameElement));
  }

  public void waitForAlertVisible() throws Exception {
    WebDriverWait wait =  new WebDriverWait(driver, timeoutInSeconds, 2000);
    wait.until(ExpectedConditions.alertIsPresent());
  }
}
