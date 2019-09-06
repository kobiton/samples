package androidApp;

import java.net.MalformedURLException;
import java.util.concurrent.TimeUnit;

import configs.Configs;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import io.appium.java_client.android.AndroidDriver;
import utils.Utils;

public class Android_app {
	static AndroidDriver<WebElement> driver = null;

	@Given("^User starts a session on android device$")
	public void start_an_android_app_session() throws MalformedURLException {
		driver = new AndroidDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesAndroidApp());
		driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
	}

	@Given("^User goes to Home page$")
	public void go_to_Home_Page() {
		WebElement homepage = driver.findElementByXPath("//android.widget.TextView[@text='iFixit']");
		homepage.click();
		Utils.sleep(2);
	}

	@And("^User clicks on Car and Truck category$")
	public void go_to_Car_and_Truck_category() {
		driver.findElementByXPath("//android.widget.TextView[@text='Car and Truck']").click();
	}

	@And("^User clicks on Acura category$")
	public void go_to_Acura_cateogry() {
		driver.findElementByXPath("//android.widget.TextView[@text='Acura']").click();
		Utils.sleep(2);
	}

	@Then("^User see items display: Acura Integra, Acura MDX, Acura RL, Acura TL, Acura TSX$")
	public void verify_five_items() {
	    boolean hasAcuraIntegra = driver.findElementByXPath("//android.widget.TextView[@text='Acura Integra']")
	      .isDisplayed();
	    boolean hasAcuraMDX = driver.findElementByXPath("//android.widget.TextView[@text='Acura MDX']").isDisplayed();
	    boolean hasAcuraRL = driver.findElementByXPath("//android.widget.TextView[@text='Acura RL']").isDisplayed();
	    boolean hasAcuraTL = driver.findElementByXPath("//android.widget.TextView[@text='Acura TL']").isDisplayed();
	    boolean hasAcuraTSX = driver.findElementByXPath("//android.widget.TextView[@text='Acura TSX']").isDisplayed();
	    
	    Assert.assertEquals(hasAcuraIntegra, true);
	    Assert.assertEquals(hasAcuraMDX, true);
	    Assert.assertEquals(hasAcuraRL, true);
	    Assert.assertEquals(hasAcuraTL, true);
	    Assert.assertEquals(hasAcuraTSX, true);
	}
	
	@Given("^User ends session on Android device$")
	public void end_an_android_app_session() {
		try {
			if (driver != null)
				driver.quit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
