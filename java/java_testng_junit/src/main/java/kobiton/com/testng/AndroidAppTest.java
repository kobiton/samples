package kobiton.com.testng;

import java.util.concurrent.TimeUnit;
import java.util.HashMap;
import java.util.Map;

import com.google.common.collect.Lists;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.android.AndroidDriver;
import kobiton.com.configs.Configs;

public class AndroidAppTest {
	public static AndroidDriver<WebElement> driver = null;

	@BeforeTest
	public void Setup() {
		driver = new AndroidDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesAndroidApp());
		driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
	}

	@AfterTest
	public void Teardown() {
		try {
			if (driver != null)
				driver.quit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test(priority = 1, description = "should allow to search some questions on Acura Support Community")
	public void testSearchQuestionsOnAcuraSupportCommunity() {

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

		driver.findElementByXPath("//*[@resource-id='android:id/home']").click();
		sleep(2);
		driver.findElementByXPath("//*[@text='Car and Truck']").click();
		driver.findElementByXPath("//*[@text='Acura']").click();
		sleep(2);
		String acuraText = driver
			.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]").getText();
		String acuraIntegraText = driver
			.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=3]").getText();
		String acuraMDXText = driver
			.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=4]").getText();
		String acuraRLText = driver
			.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=5]").getText();
		String acuraTLText = driver
			.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=6]").getText();
		String acuraTSXText = driver
			.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=7]").getText();

		Assert.assertEquals(acuraText, "Acura");
		Assert.assertEquals(acuraIntegraText, "Acura Integra");
		Assert.assertEquals(acuraMDXText, "Acura MDX");
		Assert.assertEquals(acuraRLText, "Acura RL");
		Assert.assertEquals(acuraTLText, "Acura TL");
		Assert.assertEquals(acuraTSXText, "Acura TSX");
	}

	@Test(priority = 2, description = "should allow to search iFixit on Home screen")
	public void testSearchIFixitOnHomeScreen() {

		/*
		 * Steps: 
		 * 1. Reopen iFixit app 
		 * 2. Click Search menu on the left menu bar
		 * 3. Search keyword 'Macbook Pro 2015' 
		 * 4. Press Enter button on keyboard
		 * 
		 * Expected: It should show at least 48 results.
		 * 
		 * 5. Select Devices item on the Guides/Devices dropdown
		 * 
		 * Expected: It should show at least 5 results.
		 */

		driver.launchApp();
		sleep(2);
		driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/action_search']").click();
		driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/abs__search_src_text']")
			.sendKeys("Macbook Pro 2015");
		driver.pressKeyCode(66);
		sleep(2);
		String firstResult = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']")
			.getText();
		driver.findElementByXPath("//*[@resource-id='android:id/text1' and @text='Guides']").click();
		driver.findElementByXPath("//*[@resource-id='android:id/text1' and @text='Devices']").click();

		String secondResult = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/search_result_count']")
			.getText();
		
		firstResult = firstResult.replaceAll("[^0-9]", "");
		Assert.assertTrue(Integer.parseInt(firstResult) >= 48,
			"The returned results are greater or equal to 48 results.");
		secondResult = secondResult.replaceAll("[^0-9]", "");
		Assert.assertTrue(Integer.parseInt(secondResult) >= 5,
			"The returned results are greater or equal to 5 results.");
	}

	@Test(priority = 3, description = "should allow to send command mobile shell")
	public void testMobileShell() {

		/*
		 * Steps:
		 * 1. Send mobile:shell command line to device
		 *
		 * Expected: It should allow to send command mobile shell.
		 */

		Map<String, Object> args = new HashMap<String, Object>();
		args.put("command", "echo");
		args.put("args", Lists.newArrayList("hello", "world"));

		Object output = driver.executeScript("mobile: shell", args);
		Assert.assertEquals(output, "hello world");
	}

	public void sleep(int seconds) {
		try {
			Thread.sleep(seconds * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
