package web;

import com.beust.jcommander.Parameter;
import org.junit.*;
import org.testng.annotations.*;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import util.MyTouchableWebDriver;
import util.DefaultCapabilities;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.*;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.SessionId;
import org.openqa.selenium.interactions.touch.TouchActions;
import org.openqa.selenium.remote.HttpCommandExecutor;
import org.openqa.selenium.remote.CommandInfo;
import org.openqa.selenium.remote.internal.ApacheHttpClient;
import org.openqa.selenium.remote.internal.HttpClientFactory;
import java.util.HashMap;
import static org.testng.Assert.*;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import java.net.URL;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import java.util.Set;
import java.util.List;
import java.io.File;

public class JsonWiredProtocolTest {
  private MyTouchableWebDriver driver;
  private long timeoutInSeconds = 30;

  private IndexPage indexPage;
  private FormAuthenticationPage formAuthenticationPage;
  private MultipleWindowsPage multipleWindowsPage;
  private NestedFramesPage nestedFramesPage;
  private IFramesPage iFramesPage;
  private CheckboxesPage checkboxesPage;
  private JavaScriptAlertsPage javaScriptAlertsPage;

  @Parameters({"platformName", "deviceName", "deviceGroup", "kobitonServerUrl"})
  @BeforeClass
  public void setUp(@Optional("Android") String platformName, @Optional("Galaxy J3") String deviceName,
                    @Optional("KOBITON") String deviceGroup, @Optional("http://localhost:4723/wd/hub") String kobitonServerUrl) throws Exception {
    DesiredCapabilities capabilities;
    capabilities = DefaultCapabilities.getDefaultCapabilities(platformName);
    capabilities.setCapability("deviceName", deviceName);
    capabilities.setCapability("deviceGroup", deviceGroup);
    // Initialize driver
    int connectionTimeout=60000;
    int socketTimeout=300000;

    ApacheHttpClient.Factory clientFactory =
            new ApacheHttpClient.Factory(new HttpClientFactory(connectionTimeout, socketTimeout));
    HttpCommandExecutor executor =
            new HttpCommandExecutor(new HashMap<String, CommandInfo>(), new URL(kobitonServerUrl), clientFactory);
    driver = new MyTouchableWebDriver(executor, capabilities);

    // Initialize pages
    formAuthenticationPage = new FormAuthenticationPage(driver, timeoutInSeconds);
    indexPage = new IndexPage(driver, timeoutInSeconds);
    multipleWindowsPage = new MultipleWindowsPage(driver, timeoutInSeconds);
    nestedFramesPage = new NestedFramesPage(driver, timeoutInSeconds);
    checkboxesPage = new CheckboxesPage(driver, timeoutInSeconds);
    javaScriptAlertsPage = new JavaScriptAlertsPage(driver, timeoutInSeconds);
    iFramesPage = new IFramesPage(driver, timeoutInSeconds);
  }

  @AfterClass
  public void tearDown() {
    driver.quit();
  }

  @Test(groups = {"Sessions"})
  public void testNewSession() throws Exception {
    SessionId sessionId = driver.getSessionId();

    assertNotNull(sessionId,"should not null");

  }

  @Test(groups = {"Sessions"})
  public void testSetTimeouts() throws Exception{
    driver.manage().timeouts().pageLoadTimeout(timeoutInSeconds, TimeUnit.SECONDS);
    driver.manage().timeouts().implicitlyWait(timeoutInSeconds, TimeUnit.SECONDS);
    driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
    driver.manage().timeouts().setScriptTimeout(timeoutInSeconds, TimeUnit.SECONDS);
    // LIMITATION: don't support api: GET	/session/{session id}/timeouts
    //TODO: Add verification point for timeout
  }

  @Test(groups = {"Navigation"})
  public void testNavigation() throws Exception {
    indexPage.open();
    String indexPageUrl = driver.getCurrentUrl();
    formAuthenticationPage.open();
    String formAuthenticationUrl = driver.getCurrentUrl();

    String formAuthenticationTitle = "The Internet";
    assertEquals(formAuthenticationTitle, driver.getTitle());

    driver.navigate().back();
    assertEquals(indexPageUrl, driver.getCurrentUrl());

    driver.navigate().forward();
    assertEquals(formAuthenticationUrl, driver.getCurrentUrl());

    driver.navigate().refresh();
    assertEquals(formAuthenticationUrl, driver.getCurrentUrl());
  }

  @Test(groups = {"Command Contexts"})
  public void testCommandContexts() throws Exception {
    multipleWindowsPage.open();
    // Create 2 new windows
    Integer numOfWindows = 2;
    multipleWindowsPage.createWindows(numOfWindows);
    String baseWindow = driver.getWindowHandle();

    // Verify 2 new windows and base windows
    assertTrue(StringUtils.isNotEmpty(baseWindow));
    assertEquals(numOfWindows + 1, driver.getWindowHandles().size());

    multipleWindowsPage.closeCreatedWindows(baseWindow);
    driver.switchTo().window(baseWindow);
    assertEquals(1, driver.getWindowHandles().size());

    // LIMITATION: can't switch to frame/iframe for both iOS and Android
    // switch to frame
    nestedFramesPage.open();
    nestedFramesPage.switchToFrameLeft();
    nestedFramesPage.switchToFrameMiddle();
    nestedFramesPage.switchToFrameRight();
    nestedFramesPage.switchToFrameBottom();
    nestedFramesPage.switchToParentFrame();
    // switch to iframe
    iFramesPage.open();
    iFramesPage.switchToIFrame();
  }

  @Test (groups = {"Elements"})
  public void testElements() throws Exception {
    indexPage.open();

    WebElement activeElement = driver.switchTo().activeElement();
    System.out.println("active element: " + activeElement.getText());

    assertTrue(indexPage.existElementByCss(), "should find element by css");
    assertTrue(indexPage.existElementByXpath(), "should find element by xpath");
    assertTrue(indexPage.existElementByTagName(), "should find element by name");
    assertTrue(indexPage.existElementByLinkText(), "should find element by link text");
    assertTrue(indexPage.existElementByPartialLinkText(), "should find element by partial link text");
  }

  @Test(groups= {"Element State"})
  public void testElementState() throws Exception {
    checkboxesPage.open();
    if (! checkboxesPage.isCheckbox1Selected()) {
      checkboxesPage.checkbox1.click();
    }

    assertEquals("checkbox", checkboxesPage.checkbox1.getAttribute("type"));
    assertEquals("input", checkboxesPage.checkbox1.getTagName());
    assertTrue(checkboxesPage.checkbox1.isSelected());
    assertTrue(checkboxesPage.checkbox1.isEnabled());
  }

  @Test(groups={"Element Interaction"})
  public void testElementInteraction() throws Exception{
    formAuthenticationPage.open();
    formAuthenticationPage.usernameText.click();
    String userName = "quang123";

    WebElement activeElement = driver.switchTo().activeElement();
    assertEquals("input", activeElement.getTagName());

    formAuthenticationPage.usernameText.clear();
    assertTrue(StringUtils.isEmpty(formAuthenticationPage.usernameText.getText()),
            "should be empty after clear");

    formAuthenticationPage.usernameText.sendKeys(userName);
    formAuthenticationPage.passwordText.click();
    assertEquals(userName, formAuthenticationPage.usernameText.getAttribute("value"));
  }

  @Test( groups = {"Document Handling"})
  public void testDocumentHandling() throws Exception {
    JavascriptExecutor jsExecutor =(JavascriptExecutor)driver;
    long timeoutInMilliSeconds = 5000 ;
    long startTime = System.currentTimeMillis();

    String pageSource = driver.getPageSource();
    assertNotNull(pageSource, "Pagesource should not null");
    // Verify executeScript
    jsExecutor.executeScript("document.title='Title is changed manually!';");
    assertEquals(driver.getTitle(), "Title is changed manually!");

    // Verify executeAsyncScript
    // LIMITATION: Operation not permitted on iOS device then automation will be pending
    driver.manage().timeouts().setScriptTimeout(timeoutInMilliSeconds, TimeUnit.MILLISECONDS);
    jsExecutor.executeAsyncScript("window.setTimeout(arguments[arguments.length - 1], 1000);");
    assertTrue((System.currentTimeMillis() - startTime) > 1000,
            "Time difference must be greater than 1000 milliseconds");
  }

  @Test (groups = { "Cookies"})
  public void testCookies() throws Exception {
    List<Cookie> listNewCookies = new ArrayList<Cookie>();
    listNewCookies.add(new Cookie("newCookie1", "I added Cookie 1"));
    listNewCookies.add(new Cookie("newCookie2", "I added Cookie 2"));
    for(Cookie newCookie: listNewCookies) {
      driver.manage().addCookie(newCookie);
    }
    Cookie firstCookie = listNewCookies.get(0);

    // Verify getCookieNamed
    Cookie returnCookie = driver.manage().getCookieNamed(firstCookie.getName());
    assertEquals(firstCookie, returnCookie);

    // Verify getCookies
    Set<Cookie> listCookies = driver.manage().getCookies();
    for(Cookie cookie : listNewCookies) {
      assertTrue(listCookies.contains(cookie), "should contains added cookies");
    }

    // Verify deleteCookie
    driver.manage().deleteCookie(firstCookie);
    Cookie deletedCookie = driver.manage().getCookieNamed(firstCookie.getName());
    assertNull(deletedCookie, "should remove cookie");

    // Verify deleteAllCookies
    // LIMITATION: not supported deleteAllCookies on iOS
    driver.manage().deleteAllCookies();
    listCookies = driver.manage().getCookies();
    assertTrue(listCookies.isEmpty(), "should delete all cookies");
  }

  @Test(groups={"Touch Actions"})
  public void testTouchActions() throws Exception {
    TouchActions touchActions = new TouchActions(driver);
    formAuthenticationPage.open();
    formAuthenticationPage.usernameText.click();
    formAuthenticationPage.usernameText.sendKeys("Hello world");
    touchActions.singleTap(formAuthenticationPage.usernameText);
    touchActions.doubleTap(formAuthenticationPage.usernameText);
    touchActions.longPress(formAuthenticationPage.passwordText);
    touchActions.flick(formAuthenticationPage.usernameText, 0, 0, 500);
    touchActions.scroll(formAuthenticationPage.passwordText, 0, 100);
    touchActions.build().perform();
    //TODO: Add verification points for this test
  }

  @Test(groups = {"User Prompts"})
  public void testUserPrompts() throws Exception {
    javaScriptAlertsPage.open();
    javaScriptAlertsPage.clickOnJSAlertButton();

    // Verify alert with one button
    // LIMITATION: alert don't work with iOS device then will stop automation session
    Alert alert = driver.switchTo().alert();
    String expectedMessage = "You successfuly clicked an alert";
    alert.accept();
    assertEquals(expectedMessage, javaScriptAlertsPage.resultMessage.getText());

    // Verify accept alert
    javaScriptAlertsPage.clickOnJSConfirmButton();
    expectedMessage = "You clicked: Ok";
    alert = driver.switchTo().alert();
    alert.accept();
    assertEquals(expectedMessage, javaScriptAlertsPage.resultMessage.getText());

    // Verify dismiss alert
    javaScriptAlertsPage.clickOnJSConfirmButton();
    expectedMessage = "You clicked: Cancel";
    alert = driver.switchTo().alert();
    alert.dismiss();
    assertEquals(expectedMessage, javaScriptAlertsPage.resultMessage.getText());

    // Verify alert text
    javaScriptAlertsPage.clickOnJSPromptButton();
    alert = driver.switchTo().alert();
    String alertMessage = "I am a JS prompt";
    assertEquals(alertMessage, alert.getText());

    // Verify alert input text
    alert.sendKeys("Alert text");
    expectedMessage = "You entered: Alert text";
    alert.accept();
    assertEquals(expectedMessage, javaScriptAlertsPage.resultMessage.getText());
  }

  @Test(groups = {"Screen Capture"})
  public void testScreenCapture() throws Exception {
    indexPage.open();
    String savedFilePath = System.getProperty("user.dir") + "/screenshot.png";
    File savedFile = new File(savedFilePath);
    savedFile.delete();

    // Verify TakeScreenshot
    File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
    FileUtils.copyFile(scrFile, savedFile);
    assertTrue(savedFile.exists(), "should exist saved image file");
  }
}
