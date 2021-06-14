package testng;

import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.*;
import io.appium.java_client.android.AndroidDriver;
import configs.*;

public class AndroidTests {

	public static AndroidDriver<WebElement> driver = null;

	String wrongUsernameMsg = "Your username is invalid!";
	String wrongPasswordMsg = "Your password is invalid!";
	String successMsg = "You logged into a secure area!";

	@Parameters("externalCaseId")
	@BeforeMethod
	public void Setup(String externalCaseId){
		driver = new AndroidDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesAndroidTests(externalCaseId));
		driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
	}

	@AfterMethod
	public void Teardown() {
		try {
			if (driver != null)
				driver.quit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test(priority = 1, description = "should return error when we input wrong username")
	public void testInvalidUsername() {
		login("foo", "SuperSecretPassword!");
		Assert.assertTrue(getMessage().contains(wrongUsernameMsg));
	}

	@Test(priority = 2, description = "should return error when we input wrong password")
	public void testInvalidPassword() {
		login("tomsmith", "SuperSecretPassword");
		Assert.assertTrue(getMessage().contains(wrongPasswordMsg));
	}

	@Test(priority = 3, description = "should run test successfully with correct username and password")
	public void testLoginSuccessfully() {
		login("tomsmith", "SuperSecretPassword!");
		Assert.assertTrue(getMessage().contains(successMsg));
	}

	public void login(String userName, String password) {
		driver.get("http://the-internet.herokuapp.com/login");
		driver.findElementById("username").sendKeys(userName);
		driver.findElementById("password").sendKeys(password);
		driver.findElementByXPath("//button[@type='submit']").click();
	}

	public String getMessage() {
		return driver.findElementById("flash").getText();
	}
}
