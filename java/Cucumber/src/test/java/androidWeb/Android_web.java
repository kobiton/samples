package androidWeb;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import configs.Configs;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.Utils;

public class Android_web {
	static AndroidDriver<WebElement> driver = null;

	@Given("^User starts a session on android device$")
	public void start_an_android_web_session() throws MalformedURLException {
		driver = new AndroidDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesAndroidWeb());
		driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
		driver.manage().timeouts().pageLoadTimeout(120, TimeUnit.SECONDS);
	}

	@Given("^User go to login page$")
	public void go_to_login_page() {
		driver.get("https://the-internet.herokuapp.com/login");
	}

	@And("^User inputs username ([^\"]*)$")
	public void input_username(String username) {
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
		driver.findElementById("username").sendKeys(username);
	}

	@And("^User inputs password ([^\"]*)$")
	public void input_password(String password) {
		driver.findElementById("password").sendKeys(password);
	}

	@And("^User clicks login button$")
	public void click_Login() {
		driver.findElementByXPath("//button/i[contains(text(), 'Login')]").click();
	}

	@Then("^User will see message ([^\"]*)$")
	public void verify_login_message(String msg) {
		Utils.sleep(2);
		Assert.assertTrue(getMessage().contains(msg));
	}
	
	@Given("^User ends session on Android device$")
	public void end_an_android_web_session() {
		try {
			if (driver != null)
				driver.quit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getMessage() {
		return driver.findElementById("flash").getText();
	}
}
