package kobiton.com.testng;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.ios.IOSDriver;
import kobiton.com.configs.Configs;
import com.google.common.collect.ImmutableMap;

public class iOSAppTest {
	
	public static IOSDriver<WebElement> driver = null;
			
	@BeforeTest
    public void Setup() {
		driver = new IOSDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesiOSApp());
		driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
    }
	
   @AfterTest
    public void Teardown() {
      try {
      	if(driver != null)
          driver.quit();
      } catch (Exception e) {
          e.printStackTrace();
      }
    }
   
   @Test(priority = 1, description="should allow to navigate to some devices on Acura Support Community")
   public void testNavigationOnAcuraSupportCommunity() {
	   /*
		 * Steps: 
		 * 1. Click on "Car and Truck" Categories on Homepage 
		 * 2. Click on "Acura" Categories
		 * 
		 * Expected: 
		 * 1. General Information is "Acura".
		 * 2.Verify five devices below displays.
		 * + Acura Integra 
		 * + Acura MDX
		 * + Acura RL 
		 * + Acura TL 
		 * + Acura TSX
		 */
	   
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
	   /*
	    Steps:
	    1. Reopen iFixit app
	    2. Click Search menu on the left menu bar
	    3. Search keyword 'Macbook Pro 2015'
	    4. Press Enter button on keyboard

	    Expected: It should show at least 33 results.

	    5. Clear the current content
	    6. Search keyword 'Acura' on Categories tab

	    Expected: It should show at least 6 results.
	    */
	   
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
	   driver.executeScript("mobile: scroll", ImmutableMap.of("direction", "down"));
	   driver.executeScript("mobile: scroll", ImmutableMap.of("direction", "up"));
	   
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
