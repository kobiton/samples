package com.kms.krypton

import org.apache.commons.lang.StringUtils
import org.openqa.selenium.WebDriver
import org.openqa.selenium.Alert
import org.openqa.selenium.WebDriverException
import org.openqa.selenium.By
import org.openqa.selenium.Cookie
import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.remote.DriverCommand
import org.openqa.selenium.remote.RemoteWebDriver

import com.kms.katalon.core.annotation.Keyword
import com.kms.katalon.core.configuration.RunConfiguration
import com.kms.katalon.core.keyword.KeywordExceptionHandler
import com.kms.katalon.core.logging.KeywordLogger
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords;
import com.kms.katalon.core.model.FailureHandling
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.TestObjectProperty
import com.kms.katalon.core.testobject.ConditionType
import com.kms.katalon.core.webui.driver.DriverFactory
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords
import com.google.common.collect.ImmutableMap
import com.kms.katalon.core.webui.exception.WebElementNotFoundException
import com.kms.katalon.core.webui.keyword.WebUIKeywordMain
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords

import io.appium.java_client.AppiumDriver
import io.appium.java_client.android.AndroidDriver
import io.appium.java_client.ios.IOSDriver

import java.awt.Rectangle
import java.text.MessageFormat
import java.util.UUID 

public class CustomKeywords {
	private static KeywordLogger logger = KeywordLogger.getInstance()
	@Keyword
	def isTextContains(String text, Object containText, FailureHandling failureHandling = FailureHandling.STOP_ON_FAILURE) {
		if (failureHandling == null) {
			failureHandling = FailureHandling.STOP_ON_FAILURE
		}
		if (text == null || text.isEmpty()) {
			// skip this step
			return
		}

		if (containText == null || String.valueOf(containText).isEmpty()) {
			// skip this step
			return
		}
		String findText = String.valueOf(containText)

		boolean returnValue = StringUtils.containsIgnoreCase(text, findText)
		if (failureHandling == FailureHandling.STOP_ON_FAILURE && !returnValue) {
			stepFailed('Text "' + text + '" does NOT contain "' + findText + '"')
		}
		if (returnValue) {
			logger.logPassed('Text "' + text + '" contains "' + findText + '"')
		} else {
			logger.logWarning('Text "' + text + '" does NOT contain "' + findText + '"')
		}
		return returnValue
	}


	def stepFailed(String message, boolean takeScreenShot = false, FailureHandling failureHandling = FailureHandling.STOP_ON_FAILURE) {
		// Capture failed step
		if (takeScreenShot) {
			WebUiBuiltInKeywords.takeScreenShot(failureHandling)
		}

		// And raise the exception
		KeywordExceptionHandler.throwExceptionIfStepFailed(message, failureHandling)
	}

	@Keyword
	def formatPropertyValue(TestObject testObject, String propertyName, Object[] args) {
		TestObjectProperty property = testObject.findProperty(propertyName)
		if (property == null) {
			logger.logPassed('Property "' + '" not found')
			return testObject
		}
		String newValue = String.format(property.getValue(), args)
		property.setValue(newValue)
		testObject.addProperty(property)
		return testObject
	}

	@Keyword
	def switchToWindowUsingTitle(String title, boolean usingRegex = false, FailureHandling failureHandling = FailureHandling.STOP_ON_FAILURE)
	throws WebDriverException, InterruptedException	{

		WebDriver webDriver = DriverFactory.getWebDriver()
		float timeCount = 0.0F

		while (timeCount < RunConfiguration.getTimeOut())
		{
			Set<String> availableWindows = webDriver.getWindowHandles()
			for (String windowId : availableWindows)
			{
				webDriver = webDriver.switchTo().window(windowId)
				if (usingRegex) {
					if (webDriver.getTitle().matches(title)) {
						logger.logPassed('Switched to window with title: ' + webDriver.getTitle())
						return
					}
				} else {
					if (webDriver.getTitle().equals(title)) {
						logger.logPassed('Switched to window with title: ' + webDriver.getTitle())
						return
					}
				}
			}
			Thread.sleep(200L);
			timeCount = (float)(timeCount + 0.2D);
		}

		if (failureHandling == FailureHandling.STOP_ON_FAILURE) {
			stepFailed('Cannot find window with title: ' + title)
		} else {
			logger.logWarning('Cannot find window with title: ' + title)
		}
	}
	
	@Keyword
	def getElemenentsCount(String xpath){
		List<WebElement> elements = DriverFactory.webDriver.findElements(By.xpath(xpath))
		return elements.size();
	}

	@Keyword
	def verifyElemenentsCount(String xpath,int exptecedCount,FailureHandling flowControl){
		WebUiBuiltInKeywords.verifyEqual(getElemenentsCount(xpath), exptecedCount, flowControl)
	}

	@Keyword
	def verifyElementPresent(String xpath, int timeOut, FailureHandling flowControl){
		TestObject to = new TestObject();
		to.addProperty(new TestObjectProperty("xpath", ConditionType.EQUALS, xpath, true))	
		WebUiBuiltInKeywords.verifyElementPresent(to, timeOut, flowControl)
	}


	@Keyword
	def verifyElementNotVisible(TestObject to, int timeOut, FailureHandling flowControl){
		waitElementNotVisible(to,timeOut,flowControl);
	}

	@Keyword
	def waitElementNotVisible(TestObject to, int timeOut, FailureHandling flowControl){
		try{
		WebElement element = WebUiBuiltInKeywords.findWebElement(to)
		for (int second = 0;second<=timeOut; second++) {
			if(element.isDisplayed()){
				Thread.sleep(1000);
			}else
				break;
		}
		if(element.isDisplayed()){
			WebUIKeywordMain.stepFailed("Element is visible", flowControl, null, true);
		}
		}catch(Exception ex){}
	}

	@Keyword
	def verifyElementVisible(TestObject to, int timeOut, FailureHandling flowControl){
		WebElement element = WebUiBuiltInKeywords.findWebElement(to)
		if(!element.isDisplayed()){
			WebUIKeywordMain.stepFailed("Element is not visible", flowControl, null, true);
		}
	}

	@Keyword
	def elementHasAttribute(TestObject to, String attributeName, String expVal, FailureHandling flow){
		WebElement element = WebUiBuiltInKeywords.findWebElement(to)
		String attr = element.getAttribute(attributeName)
		WebUiBuiltInKeywords.verifyMatch(attr, expVal, false, flow)
	}

	@Keyword
	def elementNotHaveAttribute(TestObject to, String attributeName, FailureHandling flow){
		String attr = null;
		try{
			WebElement element = WebUiBuiltInKeywords.findWebElement(to)
			attr = element.getAttribute(attributeName)
		}
		catch(Exception ex){}
		if(attr != null){
			if(flow == FailureHandling.STOP_ON_FAILURE){
				throw new Exception("Found attribute: '" + attributeName + "' with value: '" + attr+ "'");
			}
		}
	}

	@Keyword
	def clickFirstItem(TestObject to, FailureHandling flowControl) {
		boolean isSwitchIntoFrame = false;
		try {
			isSwitchIntoFrame = WebUiBuiltInKeywords.switchToFrame(to);
			List<WebElement> elementList = WebUiBuiltInKeywords.findWebElements(to, 30);
			for (WebElement element : elementList) {
				if (element.isDisplayed()) {
					element.click();
					break;
				}
			}
		} finally {
			if (isSwitchIntoFrame) {
				WebUiBuiltInKeywords.switchToDefaultContent();
			}
		}
	}
	
	@Keyword
	def clickAllItems(TestObject to, FailureHandling failureHandling) {
		try {
			List<WebElement> elementList = WebUiBuiltInKeywords.findWebElements(to, 30);
			for (WebElement element : elementList) {
				if (element.isDisplayed()) {
					element.click();
				}
			}
			
		}catch(Exception ex){
		WebUIKeywordMain.stepFailed("Error: " + ex.getMessage(), failureHandling, null, true);
		} 
	}

	@Keyword
	def navigateToLink(TestObject lnk){
		String href = WebUiBuiltInKeywords.getAttribute(lnk, "href", FailureHandling.STOP_ON_FAILURE)
		WebUiBuiltInKeywords.navigateToUrl(href, FailureHandling.STOP_ON_FAILURE)
	}

	@Keyword
	def clearCookies(domain) {
		WebDriver driver = DriverFactory.getWebDriver()
		Set<Cookie> cookies = driver.manage().getCookies();
		Iterator<Cookie> itr = cookies.iterator();

		while (itr.hasNext()){
			Cookie c = itr.next();
			((JavascriptExecutor) driver).executeScript("document.cookie = '${c.name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT';");
		}
	}

	@Keyword
	def dismissAssistancePopup(TestObject to, int timeOut) {
		boolean isExist = WebUiBuiltInKeywords.verifyElementPresent(to, timeOut, FailureHandling.OPTIONAL)
		if(isExist){
			WebUiBuiltInKeywords.click(to, FailureHandling.OPTIONAL)
		}
	}
	
	@Keyword
	def int getViewportHeight(){
		KeywordLogger logger = KeywordLogger.getInstance();
		int i=(((JavascriptExecutor) DriverFactory.getWebDriver()).executeScript("return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);"));
		logger.logInfo(MessageFormat.format("Height: ''{0}''", i));
		return i;
	}

	@Keyword
	def int getViewportWidth(){
		KeywordLogger logger = KeywordLogger.getInstance();
		int i= (((JavascriptExecutor) DriverFactory.getWebDriver()).executeScript("return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);"));
		logger.logInfo(MessageFormat.format("Width: ''{0}''", i));
		return i;
	}

	@Keyword
	def hideKeyboard(def FailureHandling failureHandling) {
		AppiumDriver driver = (AppiumDriver) DriverFactory.getWebDriver();
		try{
		driver.context("NATIVE_APP");
		if (driver instanceof AndroidDriver) {
			driver.hideKeyboard();
			Thread.sleep(500);
		} else if (driver instanceof IOSDriver) {
		driver.hideKeyboard();
		Thread.sleep(500);
		}
		Thread.sleep(500);
		}catch(Exception ex){
		WebUIKeywordMain.stepFailed("Error: " + ex.getMessage(), failureHandling, null, true);
		ex.printStackTrace()
		} finally {
			Set contextNames = driver.getContextHandles();
			for (String contextName : contextNames) {
				if (contextName.contains("WEBVIEW")){
					driver.context(contextName);
				}
			}
		}
	}

	/**
	 * @comment it is used to IOS NativeApp
	 * @param acceptAlert
	 * @param flow
	 * @return alert message
	 */
	@Keyword
	def getAlertText(def boolean acceptAlert,def FailureHandling flow) {
		String msg="";
		try{
			AppiumDriver driver = MobileBuiltInKeywords.driver;
			Alert alert = (Alert) driver.switchTo().alert();
			msg=alert.getText();
			logger.logPassed("Alert Text: "+ msg);
			if(acceptAlert==true){
				//driver.findElement(By.name("OK")).click();
				alert.accept();
			}
		}catch(Exception ex){
			WebUIKeywordMain.stepFailed("Error: " + ex.getMessage(), flow, null, true);
			ex.printStackTrace()
		}
		return msg;
	}
	
	public void swipe(TestObject testObject, int offsetX, int offsetY) {
		boolean isSwitchToFrame = false;

		AppiumDriver driver = (AppiumDriver) DriverFactory.getWebDriver();
		try {
			def documentWidth = getViewportWidth();
			def documentHeight = getViewportHeight();
			isSwitchToFrame = WebUiBuiltInKeywords.switchToFrame(testObject);
			WebElement el = WebUiBuiltInKeywords.findWebElement(testObject)
			int middleX = el.getLocation().getX() + (el.getSize().getWidth() / 2)
			int middleY = el.getLocation().getY() + (el.getSize().getHeight() / 2)
			driver.context("NATIVE_APP");

			if (driver instanceof AndroidDriver) {
				WebElement androidWebView = ((AndroidDriver) driver).findElementByAndroidUIAutomator("new UiSelector().classNameMatches(\"^android\\.(.*)\\.(.*)View\$\")")
				int toolbarHeight = driver.manage().window().size.getHeight() - ( documentHeight * 2) - androidWebView.getLocation().getY()
				int tapX = (middleX * 2)
				int tapY = (middleY * 2) + androidWebView.getLocation().getY() + toolbarHeight;
				KeywordLogger.getInstance().logInfo("x=" + (tapX /2) + ";y="+ (tapY / 2));
				KeywordLogger.getInstance().logInfo("offsetX=" + offsetX + ";offsetY="+ offsetY);
				KeywordLogger.getInstance().logInfo("documentWidth="+ documentWidth);
				if (((offsetX + tapX) < 0) || ((offsetX + tapX) > (documentWidth * 2))) {
					KeywordLogger.getInstance().logInfo("offsetX + x out of bound so not swipe");
					return
				}
				driver.swipe(tapX, tapY, tapX + offsetX, tapY + offsetY, 500)
				KeywordLogger.getInstance().logInfo("Swipe successfully");
			} else if (driver instanceof IOSDriver) {
				int toolbarHeight = driver.manage().window().size.getHeight() - ( documentHeight) - 20
				middleY = middleY + 20 + toolbarHeight
				KeywordLogger.getInstance().logInfo("x=" + middleX + ";y="+ middleY);
				KeywordLogger.getInstance().logInfo("offsetX=" + offsetX + ";offsetY="+ offsetY);
				KeywordLogger.getInstance().logInfo("documentWidth="+ documentWidth);
				if (((offsetX + middleX) < 0) || ((offsetX + middleX) > documentWidth)) {
					KeywordLogger.getInstance().logInfo("offsetX + x out of bound so not swipe");
					return
				}
				driver.swipe(middleX, middleY, middleX + offsetX, middleY + offsetY, 500)
				KeywordLogger.getInstance().logInfo("Swipe successfully");
			}
		} finally {
			Set contextNames = driver.getContextHandles();
			for (String contextName : contextNames) {
				if (contextName.contains("WEBVIEW")){
					driver.context(contextName);
				}
			}
			if (isSwitchToFrame) {
				WebUiBuiltInKeywords.switchToDefaultContent();
			}
		}
	}

	@Keyword
	public void swipe(TestObject testObject, int offsetX, int offsetY,int swipeTimes,FailureHandling flowControl) {
		try {
			for (int i=0;i<=swipeTimes;i++) {
				swipe(testObject,offsetX,offsetY)
			}
		} catch (Exception ex) {
			WebUIKeywordMain.stepFailed("Element cannot swipe (" + ex.getMessage() + ")", flowControl, null, true);
			ex.printStackTrace()
		}
	}

	private void context(RemoteWebDriver webDriver, String contextName) {
		if (webDriver instanceof AppiumDriver) {
			((AppiumDriver) webDriver).context(contextName);
		} else {
			if (contextName == null || contextName.isEmpty()) {
				throw new IllegalArgumentException("Must supply a context name");
			}
			webDriver.execute(DriverCommand.SWITCH_TO_CONTEXT, ImmutableMap.of("name", contextName));
		}
	}

	private Rectangle getElementRect(TestObject to, int timeOut) {
		boolean isSwitchIntoFrame = false;
		try {
			isSwitchIntoFrame = WebUiBuiltInKeywords.switchToFrame(to, timeOut);
			WebElement foundElement = null;
			foundElement = WebUiBuiltInKeywords.findWebElement(to, timeOut);
			Thread.sleep(10000)
			WebDriver driver = DriverFactory.getWebDriver()
			if (driver instanceof IOSDriver) {
				int left = (((JavascriptExecutor) DriverFactory.getWebDriver()).executeScript("return arguments[0].getBoundingClientRect().left", foundElement));
				int right = (((JavascriptExecutor) DriverFactory.getWebDriver()).executeScript("return arguments[0].getBoundingClientRect().right", foundElement));
				int top = (((JavascriptExecutor) DriverFactory.getWebDriver()).executeScript("return arguments[0].getBoundingClientRect().top", foundElement));
				int bottom = (((JavascriptExecutor) DriverFactory.getWebDriver()).executeScript("return arguments[0].getBoundingClientRect().bottom", foundElement));
				return new Rectangle(left, top, right, bottom)
			}
			return new Rectangle(foundElement.getLocation().getX(), foundElement.getLocation().getY(), foundElement.getSize().getWidth(), foundElement.getSize().getHeight())

		} finally {
			if (isSwitchIntoFrame) {
				WebUiBuiltInKeywords.switchToDefaultContent();
			}
		}
	}

	@Keyword
	def verifyElementNotVisibleInViewport(TestObject to, int timeOut, FailureHandling flowControl) {
		try {
			Rectangle elementRect = getElementRect(to, timeOut )
			KeywordLogger.getInstance().logInfo('Element rect: ' + elementRect.toString())
			Rectangle documentRect = new Rectangle(0, 0, getViewportWidth(), getViewportHeight());
			KeywordLogger.getInstance().logInfo('Document rect: ' + documentRect.toString())
			if (documentRect.intersects(elementRect)) {
				WebUIKeywordMain.stepFailed("Element is present and visible in viewport", flowControl, null, true);
				return false;
			} else {
				KeywordLogger.getInstance().logPassed("Element is present but not visible in viewport");
				return true;
			}
		} catch (WebElementNotFoundException ex) {
			KeywordLogger.getInstance().logPassed("Element is not present");
		}
		return false;
	}

	@Keyword
	def verifyElementVisibleInViewport(TestObject to, int timeOut, FailureHandling flowControl) {
		try {
			Rectangle elementRect = getElementRect(to, timeOut)
			KeywordLogger.getInstance().logInfo('Element rect: ' + elementRect.toString())
			Rectangle documentRect = new Rectangle(0, 0, getViewportWidth(), getViewportHeight());
			KeywordLogger.getInstance().logInfo('Document rect: ' + documentRect.toString())
			if (documentRect.intersects(elementRect)) {
				KeywordLogger.getInstance().logPassed("Element is present and visible in viewport");
				return false;
			} else {
				WebUIKeywordMain.stepFailed("Element is present and not visible in viewport", flowControl, null, true);
				return true;
			}
		} catch (WebElementNotFoundException ex) {
			KeywordLogger.getInstance().logPassed("Element is not present");
		}
		return false;
	}

	@Keyword
	def verifyTextContains(def text, def containText,def FailureHandling flowControl) {
		if (text.toString().contains(containText.toString())) {
			return true;
		} else {
			WebUIKeywordMain.stepFailed('Text "' + containText + '" are NOT contained in "' + text + '"', flowControl, null, true);
		}
	}

	@Keyword
	def String getCssValue(TestObject testObject, def cssValue) {
		WebElement element = WebUiBuiltInKeywords.findWebElement(testObject)
		return element.getCssValue(cssValue);
	}

	@Keyword
	def verifyCssValue(TestObject testObject, def cssName,def expectedCssValue,FailureHandling flow) {
		WebElement element = WebUiBuiltInKeywords.findWebElement(testObject)
		String value=element.getCssValue(cssName);
		WebUiBuiltInKeywords.verifyMatch(value, expectedCssValue, false, flow)
	}
	
	@Keyword
	def scrollToElement(TestObject testObject,def timeout,def FailureHandling flow) {
		WebDriver driver = DriverFactory.getWebDriver()
		WebElement element = WebUiBuiltInKeywords.findWebElement(testObject)
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		WebUiBuiltInKeywords.waitForElementPresent(testObject, timeout, flow)
		Thread.sleep(500);
	}

	@Keyword
	def click(TestObject testObject,def timeout,def FailureHandling flow) {
		WebElement elementToClick = WebUiBuiltInKeywords.findWebElement(testObject)
		WebDriver driver = DriverFactory.getWebDriver()
		Thread.sleep(500);
		WebUiBuiltInKeywords.waitForElementClickable(testObject, timeout, flow)
		((JavascriptExecutor) driver).executeScript("arguments[0].click();", elementToClick);
	}
	
	@Keyword
	def cleartext(String xpath,def FailureHandling flow) {
		try{
			AppiumDriver driver = MobileBuiltInKeywords.driver;
			// Get context
			Set<String> contextNames = driver.getContextHandles()
			// Switch to WEBVIEW context
			driver.context(contextNames.toArray()[1]);
			List<WebElement> elements = driver.findElements(By.xpath(xpath))
			for (WebElement element : elements) {
				element.click()
				element.clear()
			}
			driver.context(contextNames.toArray()[0]);
		}catch(Exception ex){
			WebUIKeywordMain.stepFailed("Error: " + ex.getMessage(), flow, null, true);
			ex.printStackTrace()
		}
	}
	
	@Keyword
	def verifyArrayListIsSorted(ArrayList<String> listValues, String sortOption, FailureHandling failureHandling) {
		ArrayList<String> temp=new ArrayList<String>();
		temp=listValues;
		sortOption=sortOption.toLowerCase();
		try{
			if(sortOption.equalsIgnoreCase('asc')){
				Collections.sort(temp);
			}
			if(sortOption.equalsIgnoreCase('desc')){
				Collections.sort(temp,Collections.reverseOrder());
			}
			listValues.equals(temp);

		}catch(Exception ex){
			WebUIKeywordMain.stepFailed("The list is not sorted. Error: " + ex.getMessage(), failureHandling, null, true);
			ex.printStackTrace()
		}
	}
	
	@Keyword
	def equalList( ArrayList<String> list1,  ArrayList<String> list2,Boolean sortOption, FailureHandling failureHandling) {
		if(sortOption){
			list1=Collections.sort(list1);
			list2=Collections.sort(list2);
		}
		try{
			list1.equals(list2)
		} catch(Exception ex){
			WebUIKeywordMain.stepFailed("The first list does not equal the second list. Error: " + ex.getMessage(), failureHandling, null, true);
			ex.printStackTrace()
		}
	}

	@Keyword
	def convertStringtoArrayList(String string,String delimiter, FailureHandling failureHandling) {
		//   String[] array = StringUtils.split(string, delimiter)
		//   return new ArrayList<String>(Arrays.asList(array != null ? array : new String[]{}))
		String[] strValues=null;
		ArrayList<String> listValues=null;
		try{
			strValues = string.split(delimiter);
			listValues = new ArrayList<String>(Arrays.asList(strValues));
		}
		catch(Exception ex){
			WebUIKeywordMain.stepFailed("Cannot convert String to ArrayList. Error: " + ex.getMessage(), failureHandling, null, true);
			ex.printStackTrace()
		}
		return listValues
	}
	
	@Keyword
	def generateID(){
		String randomID=UUID.randomUUID().toString();
		randomID=randomID.substring(1, 6);
		return randomID;	
	}

	
}
