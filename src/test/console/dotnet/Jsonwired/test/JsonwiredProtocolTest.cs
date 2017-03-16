
using System;
using System.Collections;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.PageObjects;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;
using NUnit.Framework;
using util;

namespace web
{
	[TestFixture]
	public class JsonWiredProtocolTest
	{
		private MyTouchableWebDriver driver;
		private long timeoutInSeconds = 30;
		private IndexPage indexPage;
		private FormAuthenticationPage formAuthenticationPage;
		private MultipleWindowsPage multipleWindowsPage;
		private NestedFramesPage nestedFramesPage;
		private IFramesPage iFramesPage;
		private CheckboxesPage checkboxesPage;
		private JavaScriptAlertsPage javaScriptAlertsPage;

		public  JsonWiredProtocolTest() {
			String kobitonServerUrl = "http://api-test.kobiton.com/wd/hub";
			DesiredCapabilities capabilities;
			capabilities = DefaultCapabilities.getDefaultCapabilities("Android");
			capabilities.SetCapability("username", "qa_testenv");
			capabilities.SetCapability("accessKey", "47882aff-f6d3-4e01-9fe5-e2688d4e8921");
			capabilities.SetCapability("deviceName", "Nexus 6");
			capabilities.SetCapability("deviceGroup", "ORGANIZATION");
			driver = new MyTouchableWebDriver(new Uri(kobitonServerUrl), capabilities);
    	// Initialize pages
   		formAuthenticationPage = new FormAuthenticationPage(driver, timeoutInSeconds);
			indexPage = new IndexPage(driver, timeoutInSeconds);
			multipleWindowsPage = new MultipleWindowsPage(driver, timeoutInSeconds);
			nestedFramesPage = new NestedFramesPage(driver, timeoutInSeconds);
			checkboxesPage = new CheckboxesPage(driver, timeoutInSeconds);
			javaScriptAlertsPage = new JavaScriptAlertsPage(driver, timeoutInSeconds);
			iFramesPage = new IFramesPage(driver, timeoutInSeconds);
		}

		[TearDown]
  	public void tearDown() {
			driver.Quit();
		}

		[Test]
  	public void testNewSession() {
			SessionId sessionId = driver.SessionId;
			Assert.IsNotNull(sessionId);
		}

		[Test]
	  public void testSetTimeouts() {
			driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(timeoutInSeconds);
			driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(timeoutInSeconds);
			driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(0);
			driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(timeoutInSeconds);
			// LIMITATION: don't sUpport api: GET	/session/{session id}/timeouts
			//TODO: Add verification point for timeout
		}

		[Test]
	  public void testNavigation() {
			indexPage.open();
			String indexPageUrl = driver.Url;
			formAuthenticationPage.open();
			String formAuthenticationUrl = driver.Url;

			String formAuthenticationTitle = "The Internet";
			Assert.AreEqual(formAuthenticationTitle, driver.Title);

			driver.Navigate().Back();
			Assert.AreEqual(indexPageUrl, driver.Url);

			driver.Navigate().Forward();
			Assert.AreEqual(formAuthenticationUrl, driver.Url);

			driver.Navigate().Refresh();
			Assert.AreEqual(formAuthenticationUrl, driver.Url);
		}

		[Test]
	  public void testCommandContexts() {
			multipleWindowsPage.open();
			// Create 2 new windows
			int numOfWindows = 2;
			multipleWindowsPage.createWindows(numOfWindows);
			String baseWindow = driver.CurrentWindowHandle;

			// Verify 2 new windows and base windows
			Assert.IsNotEmpty(baseWindow);
			Assert.AreEqual(numOfWindows + 1, driver.WindowHandles.Count);

			multipleWindowsPage.closeCreatedWindows(baseWindow);
			driver.SwitchTo().Window(baseWindow);
			Assert.AreEqual(1, driver.WindowHandles.Count);

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

		[Test]
	  public void testElements() {
			indexPage.open();

			IWebElement activeElement = driver.SwitchTo().ActiveElement();

			Assert.IsNotNull(activeElement);
			Assert.IsTrue(indexPage.elementByCss.Displayed, "should find element by css");
			Assert.IsTrue(indexPage.elementByXpath.Displayed, "should find element by xpath");
			Assert.IsTrue(indexPage.elementByTagName.Displayed, "should find element by name");
			Assert.IsTrue(indexPage.elementByLinkText.Displayed, "should find element by link text");
			Assert.IsTrue(indexPage.elementByPartialLinkText.Displayed, "should find element by partial link text");
		}

		[Test]
	  public void testElementState() {
			checkboxesPage.open();

	    if (! checkboxesPage.isCheckbox1Selected()) {
				checkboxesPage.checkbox1.Click();
			}

			Assert.AreEqual("checkbox", checkboxesPage.checkbox1.GetAttribute("type"));
			Assert.AreEqual("input", checkboxesPage.checkbox1.TagName);
			Assert.IsTrue(checkboxesPage.checkbox1.Selected);
			Assert.IsTrue(checkboxesPage.checkbox1.Enabled);
		}

		[Test]
	  public void testElementInteraction() {
			formAuthenticationPage.open();
			formAuthenticationPage.usernameText.Click();
			String userName = "quang123";

			IWebElement activeElement = driver.SwitchTo().ActiveElement();
			Assert.AreEqual("input", activeElement.TagName);

			formAuthenticationPage.usernameText.Clear();
			Assert.IsEmpty(formAuthenticationPage.usernameText.GetAttribute("value"), "should be empty after clear");

			formAuthenticationPage.usernameText.SendKeys(userName);
			formAuthenticationPage.passwordText.Click();
			Assert.AreEqual(userName, formAuthenticationPage.usernameText.GetAttribute("value"));
		}

		[Test]
	  public void testDocumentHandling() {
			indexPage.open();
			IJavaScriptExecutor jsExecutor = (IJavaScriptExecutor)driver;
	    long timeoutInMilliSeconds = 5000 ;
			String pageSource = driver.PageSource;

			// Verify executeScript
			jsExecutor.ExecuteScript("document.title='Title is changed manually!';");
			Assert.AreEqual(driver.Title, "Title is changed manually!");

			// Verify executeAsyncScript
			TimeSpan startTime = DateTime.UtcNow.TimeOfDay;
			driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromMilliseconds(timeoutInMilliSeconds);
			jsExecutor.ExecuteAsyncScript("window.setTimeout(arguments[arguments.length - 1], 1000);");
			long duration = DateTime.UtcNow.TimeOfDay.Subtract(startTime).Milliseconds;
			Assert.IsTrue(duration > 1000,
	      "Time difference must be greater than 1000 milliseconds");
		}

		[Test]
	  public void testCookies() {
			indexPage.open();
			ArrayList listNewCookies = new ArrayList();
			listNewCookies.Add(new Cookie("newCookie1", "I added Cookie 1"));
			listNewCookies.Add(new Cookie("newCookie2", "I added Cookie 2"));
	    foreach(Cookie newCookie in listNewCookies) {
				driver.Manage().Cookies.AddCookie(newCookie);
			}
			Cookie firstCookie = (Cookie)listNewCookies[0];

			// Verify getCookieNamed
			Cookie returnCookie = driver.Manage().Cookies.GetCookieNamed(firstCookie.Name);
		  Assert.AreEqual(firstCookie, returnCookie);

			// Verify getCookies
			var listAllCookies = driver.Manage().Cookies.AllCookies;
			foreach (Cookie cookie in listNewCookies) {
				Assert.IsTrue(listAllCookies.Contains(cookie), "should contains added cookies");
	    }

	    // Verify deleteCookie
			driver.Manage().Cookies.DeleteCookie(firstCookie);
			Cookie deletedCookie = driver.Manage().Cookies.GetCookieNamed(firstCookie.Name);
			Assert.IsNull(deletedCookie, "should reMove cookie");

			// Verify deleteAllCookies
			driver.Manage().Cookies.DeleteAllCookies();
			Assert.AreEqual(0, driver.Manage().Cookies.AllCookies.Count, "should delete all cookies");
	  }

		[Test]
	  public void testTouchActions() {
			TouchActions touchActions = new TouchActions(driver);
			formAuthenticationPage.open();
	    formAuthenticationPage.usernameText.Click();
	    formAuthenticationPage.usernameText.SendKeys("Hello world");
	    touchActions.SingleTap(formAuthenticationPage.usernameText);
	    touchActions.DoubleTap(formAuthenticationPage.usernameText);
	    touchActions.Down(0,0);
	    touchActions.Move(10, 10);
	    touchActions.Up(10, 10);
	    touchActions.SendKeys("Hello");
	    touchActions.LongPress(formAuthenticationPage.usernameText);
	    touchActions.Flick(formAuthenticationPage.usernameText, 0, 0, 500);
	    touchActions.Scroll(formAuthenticationPage.usernameText, 1, 100);
			touchActions.Build().Perform();
	    //TODO: Add verification points for this test
	  }

		[Test]
	  public void testUserPrompts() {
			javaScriptAlertsPage.open();
			javaScriptAlertsPage.clickOnJSAlertButton();

			// Verify alert with one button
			IAlert alert = driver.SwitchTo().Alert();
			String expectedMessage = "You successfuly clicked an alert";
			alert.Accept();
			Assert.AreEqual(expectedMessage, javaScriptAlertsPage.resultMessage.Text);

			// Verify accept alert
			javaScriptAlertsPage.clickOnJSConfirmButton();
			expectedMessage = "You clicked: Ok";
			alert = driver.SwitchTo().Alert();
			alert.Accept();
			Assert.AreEqual(expectedMessage, javaScriptAlertsPage.resultMessage.Text);

			// Verify dismiss alert
			javaScriptAlertsPage.clickOnJSConfirmButton();
			expectedMessage = "You clicked: Cancel";
			alert = driver.SwitchTo().Alert();
			alert.Dismiss();
			Assert.AreEqual(expectedMessage, javaScriptAlertsPage.resultMessage.Text);

			// Verify alert text
			javaScriptAlertsPage.clickOnJSPromptButton();
			alert = driver.SwitchTo().Alert();
			String alertMessage = "I am a JS prompt";
			Assert.AreEqual(alertMessage, alert.Text);

			// Verify alert input text
			alert.SendKeys("Alert text");
			expectedMessage = "You entered: Alert text";
			alert.Accept();
			Assert.AreEqual(expectedMessage, javaScriptAlertsPage.resultMessage.Text);
		}

		[Test]
	  public void testScreenCapture() {
			indexPage.open();
			String savedFilePath = Path.Combine(System.IO.Directory.GetCurrentDirectory() + "/screenshot.png");
			if (File.Exists(savedFilePath)) {
				File.Delete(savedFilePath);
			}

			// Verify TakeScreenshot
			Console.WriteLine(savedFilePath);
			Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();
			ss.SaveAsFile(savedFilePath, ScreenshotImageFormat.Png);
			Assert.IsTrue(File.Exists(savedFilePath), "should exist saved image file");
	  }
	}
}
