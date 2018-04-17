package androidWeb;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import io.appium.java_client.android.AndroidDriver;

public class Android_web {
	public static AndroidDriver<WebElement> driver = null;

	@Given("^User starts a session on android device$")
	public void start_an_android_web_session() throws MalformedURLException {
		URL kobitonServerUrl = new URL("https://<KOBITON_USERNAME>:<KOBITON_API_KEY>@api.kobiton.com/wd/hub");
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("sessionName", "Automation test session");
		capabilities.setCapability("sessionDescription", ""); 
		capabilities.setCapability("deviceOrientation", "portrait");  
		capabilities.setCapability("captureScreenshots", true); 
		capabilities.setCapability("browserName", "chrome"); 
		capabilities.setCapability("deviceGroup", "KOBITON"); 
		capabilities.setCapability("deviceName", "Desire 728G dual sim");
		capabilities.setCapability("platformVersion", "5.1");
		capabilities.setCapability("platformName", "Android");
		driver = new AndroidDriver<WebElement>(kobitonServerUrl, capabilities);
		driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
	}

	@Given("^User go to login page$")
	public void go_to_login_page() {
		driver.get("http://the-internet.herokuapp.com/login");
		sleep(2);
	}

	@And("^User inputs username ([^\"]*)$")
	public void input_username(String username) {
		driver.findElementById("username").sendKeys(username);
	}

	@And("^User inputs password ([^\"]*)$")
	public void input_password(String password) {
		driver.findElementById("password").sendKeys(password);
	}

	@And("^User clicks login button$")
	public void click_Login() {
		driver.findElementByXPath("//form[@name='login']").submit();
	}

	@Then("^User will see message ([^\"]*)$")
	public void verify_login_message(String mesg) {
		Assert.assertTrue(getMessage().contains(mesg));
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
		sleep(2);
		return driver.findElementById("flash").getText();
	}
	
	public void sleep(int seconds) {
	    try {
	      Thread.sleep(seconds * 1000);
	    } catch (InterruptedException e) {
	      e.printStackTrace();
	    }
	  }
}