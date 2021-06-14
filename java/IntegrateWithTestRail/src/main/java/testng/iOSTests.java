package testng;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;
import io.appium.java_client.ios.IOSDriver;
import configs.Configs;

public class iOSTests {
	
	public static IOSDriver<WebElement> driver = null;

	@Parameters("externalCaseId")
	@BeforeMethod
    public void Setup(String externalCaseId) {
		driver = new IOSDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesiOSTests(externalCaseId));
		driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
    }

	@AfterMethod
    public void Teardown() {
      try {
      	if(driver != null)
          driver.quit();
      } catch (Exception e) {
          e.printStackTrace();
      }
    }

    @Test
	public void testInstall() {
		driver.findElementByXPath("//*").click();
		sleep(60);
	}

   @Test(priority = 1, description="should allow to navigate to some devices on Acura Support Community")
   public void testNavigationOnAcuraSupportCommunity() {
		driver.findElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").click();
		sleep(2);
		driver.findElementByXPath("//*[@name='Car and Truck']").click();
		driver.findElementByXPath("//*[@name='Acura']").click();
		sleep(2);
		(new WebDriverWait(driver, 60)).until(
			ExpectedConditions.elementToBeClickable(By.xpath("//XCUIElementTypeNavigationBar")));
		String acuraText = driver
			.findElementByXPath("//XCUIElementTypeNavigationBar").getAttribute("name");
		boolean hasAcuraIntegra = driver
			.findElementByXPath("//XCUIElementTypeStaticText[@name='Acura Integra']").isDisplayed();
		boolean hasAcuraMDX = driver
			.findElementByXPath("//XCUIElementTypeStaticText[@name='Acura MDX']").isDisplayed();
		boolean hasAcuraRL = driver
			.findElementByXPath("//XCUIElementTypeStaticText[@name='Acura RL']").isDisplayed();
		boolean hasAcuraTL = driver
			.findElementByXPath("//XCUIElementTypeStaticText[@name='Acura TL']").isDisplayed();
		boolean hasAcuraTSX = driver
			.findElementByXPath("//XCUIElementTypeStaticText[@name='Acura TSX']").isDisplayed();
		driver.closeApp();

		Assert.assertEquals(acuraText, "Acura");
		Assert.assertEquals(hasAcuraIntegra, true);
		Assert.assertEquals(hasAcuraMDX, true);
		Assert.assertEquals(hasAcuraRL, true);
		Assert.assertEquals(hasAcuraTL, true);
		Assert.assertEquals(hasAcuraTSX, true);
   }

   @Test(priority = 2, description="should allow to search iFixit on Home screen")
   public void testSearchIFixitOnHomeScreen() {
	   driver.launchApp();
	   driver.findElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").click();
	   sleep(2);
	   driver.findElementByXPath("//*[@name='Search']").click();
	   driver.findElementByXPath("//XCUIElementTypeSearchField[@name='Search']").sendKeys("Macbook Pro 2015");
	   sleep(2);
	   List<WebElement> firstResult = driver.findElementsByXPath("//XCUIElementTypeStaticText[contains(@label,'MacBook Pro')]");
	   driver.findElementByXPath("//XCUIElementTypeButton[@name='Cancel']").click();
	   driver.findElementByXPath("//*[@name='Search']").click();
	   driver.findElementByXPath("//XCUIElementTypeSearchField[@name='Search']").sendKeys("Acura");
	   driver.findElementByXPath("//XCUIElementTypeButton[@name='Categories']").click();
	   sleep(2);
	   List<WebElement> secondResult = driver.findElementsByXPath("//XCUIElementTypeStaticText[contains(@label,'Acura')]");

	   Assert.assertTrue(firstResult.size() >= 33,
			"The expected results are greater or equal to 33 results.");
	   Assert.assertTrue(secondResult.size() >= 6,
			"The expected results are greater or equal to 6 results.");
   }

   public void sleep(int seconds) {
		try {
			Thread.sleep(seconds * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
