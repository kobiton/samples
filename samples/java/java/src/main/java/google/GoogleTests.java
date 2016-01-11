package google;

import java.net.MalformedURLException;
import java.net.URL;

import org.apache.commons.codec.binary.Base64;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.internal.ApacheHttpClient;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.remote.MobilePlatform;

public class GoogleTests {
	private AndroidDriver<WebElement> driver = null;
	URL url = null;
	String USER_NAME = "tester01";
	String API_KEY = "fe82cbb9-a8df-4c60-95cc-90a2ac1ccf21";
	String HOST_NAME = "ec2-54-226-177-179.compute-1.amazonaws.com";
	String PORT = "3001";
	String GOOGLE_URL = "https://mail.google.com";
	String GOOGLE_URL_HOMEPAGE = "https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal";
	String TRASH_URL = "https://mail.google.com/mail/mu/mp/4/#tl/Trash";
	String EMAIL_ADDRESS1 = "krypton.portal@gmail.com";
	String EMAIL_ADDRESS2 = "krypton.portal2@gmail.com";
	String PASSWORDSEND = "Admin@123456";
	String PASSWORDTO = "Admin@123456";
	String SUBJECT1 = "It is a subject";
	String BODY1 = "It is a body";
	String MSG_NOEMAIL = "You have no mail here.";
	String MSG_NOEMAIL_PRIMARY = "You have no mail.\nPlease enjoy your day!";

	@Parameters({ "browserName", "deviceName", "platformVersion", "emailSend", "passwordSend", "emailTo", "passwordTo", "username", "apikey" })
	@BeforeTest
	public void Setup(String browserName, String deviceName, String platformVersion, String emailSend, String passwordSend, String emailTo,
			String passwordTo, String username, String apikey) {

		EMAIL_ADDRESS1 = emailSend;
		PASSWORDSEND = passwordSend;
		EMAIL_ADDRESS2 = emailTo;
		PASSWORDTO = passwordTo;
		USER_NAME= username;
		API_KEY=apikey;
		DesiredCapabilities capabilities = DesiredCapabilities.android();
		capabilities.setCapability(MobileCapabilityType.BROWSER_NAME, browserName);
		capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, MobilePlatform.ANDROID);
		capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, deviceName);
		capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, platformVersion);
		capabilities.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);

		try {
			String parseUrl="http://" + USER_NAME +":" + API_KEY +"@" +  HOST_NAME +":"+PORT+"/wd/hub";
			url = new URL(parseUrl);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		driver = new AndroidDriver<WebElement>(url, capabilities);
		driver.manage().deleteAllCookies();
		driver.navigate().refresh();
	}

	@AfterTest
	public void Teardown() {
		try {
			driver.quit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test(priority = 1, description = "should not accept empty email or invalid email")
	public void GoogleLogin_Invalid() {
		driver.get(GOOGLE_URL);
		Sleep(5000);
		driver.findElementById("next").click();
		Sleep(2000);
		String errorMsg = driver.findElementById("errormsg_0_Email").getText();
		Assert.assertEquals(errorMsg, "Please enter your email.");
		driver.findElementById("Email").sendKeys("invalid_email@where.about");
		driver.findElementById("next").click();
		Sleep(2000);
		String errorMsg2 = driver.findElementById("errormsg_0_Email").getText();
		Assert.assertEquals(errorMsg2,
				"Sorry, Google doesn't recognize that email. Create an account using that address?");
	}

	@Test(priority = 2, description = "should accept valid credentials")
	public void GoogleLogin_Valid() {
		Login(EMAIL_ADDRESS1, PASSWORDSEND);
		Sleep(5000);
		String getURL = driver.getCurrentUrl();
		Assert.assertEquals(true, getURL.contains("https://mail.google.com/mail"));
	}

	@Test(priority = 3, description = "should compose email successfully by Gmail1")
	public void GoogleComposeEmail() {
		// should compose email successfully by Gmail1
		driver.findElementByXPath("//div[@id='views']//div[@aria-label='Compose']").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@id='cmcc_composeto']//input[@id='composeto']").sendKeys(EMAIL_ADDRESS2);
		driver.findElementByXPath("//input[@id='cmcsubj']").sendKeys(SUBJECT1);
		driver.findElementById("cmcbody").sendKeys(BODY1);
		Sleep(1000);
		driver.findElementByXPath("//div[@id='views']//div[text()='Send']").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@aria-label='Menu']").click();
		Sleep(1000);
		driver.findElementByXPath("//span[text()='Sent Mail']").click();
		Sleep(1000);

		// verify the new email exists on Sent Email folder on Gmail1
		String getText = driver.findElementByXPath("//div[@class='fm']").getText();
		Assert.assertEquals(true, getText.contains(SUBJECT1));
		Assert.assertEquals(true, getText.contains(BODY1));
		driver.findElementByXPath("//div[contains(@class,'m')]//div[@role='listitem'][1]").click();
		Sleep(2000);
		driver.findElementByXPath("//div[contains(@class,'V j hj') and text()='Details']").click();
		Sleep(3000);
		String getSubject = driver.findElementByXPath("//span[@class='kj']/span").getText();
		String getBody = driver.findElementByXPath("//div[@class='Hi']").getText();
		String getSentEmail = driver.findElementByXPath("//div[@class='Kg']/span").getText();
		String getToEmail = driver.findElementByXPath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']")
				.getText();

		Assert.assertEquals(SUBJECT1, getSubject);
		Assert.assertEquals(BODY1, getBody);
		Assert.assertEquals(EMAIL_ADDRESS1, getSentEmail);
		Assert.assertEquals(EMAIL_ADDRESS2, getToEmail);

		// delete email on Sent Email and Trash folder on Gmail1
		driver.findElementByXPath("//div[@id='cv__cntbt']//div[@class='V j Y Mm Kg']").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@class='V j cb Ol'][1]").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").click();
		Sleep(2000);
		String getNoEmailMsg = driver.findElementByXPath("//div[@class='Wl']").getText();

		Assert.assertEquals(MSG_NOEMAIL, getNoEmailMsg);

		driver.get(TRASH_URL);
		Sleep(5000);
		driver.findElementByXPath("//div[@class='V j cb Ol'][1]").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@class='M j T b hc q m']//div[text()='Delete forever']").click();
		getNoEmailMsg = driver.findElementByXPath("//div[@class='Wl']").getText();

		Assert.assertEquals(MSG_NOEMAIL, getNoEmailMsg);

		driver.findElementByXPath("//div[@aria-label='Menu']").click();
		Sleep(1000);
		driver.findElementByXPath("//div[contains(@class,'V Y Rx Kg')]").click();
		Sleep(1000);
		driver.findElementByXPath("//button[@id='signout']").click();
		Sleep(5000);

		driver.get(GOOGLE_URL);
		driver.manage().deleteAllCookies();
		driver.navigate().refresh();

		// verify Gmail2 received a new email from Gmail1
		Login(EMAIL_ADDRESS2, PASSWORDTO);
		driver.get(GOOGLE_URL_HOMEPAGE);
		driver.navigate().refresh();
		Sleep(5000);

		getText = driver.findElementByXPath("//div[@class='fm']").getText();
		Assert.assertEquals(true, getText.contains(SUBJECT1));
		Assert.assertEquals(true, getText.contains(BODY1));
		driver.findElementByXPath("//div[contains(@class,'fm')]//div[@role='listitem'][1]").click();
		Sleep(1000);
		driver.findElementByXPath("//div[contains(@class,'V j hj') and text()='Details']").click();
		Sleep(2000);
		getSubject = driver.findElementByXPath("//span[@class='kj']/span").getText();
		getBody = driver.findElementByXPath("//div[@class='Hi']").getText();
		getSentEmail = driver.findElementByXPath("//div[@class='Kg']/span").getText();
		getToEmail = driver.findElementByXPath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']").getText();

		Assert.assertEquals(SUBJECT1, getSubject);
		Assert.assertEquals(BODY1, getBody);
		Assert.assertEquals(EMAIL_ADDRESS1, getSentEmail);
		Assert.assertEquals(EMAIL_ADDRESS2, getToEmail);

		// delete email on Primary Email and Trash folder on Gmail2
		driver.findElementByXPath("//div[contains(@class,'M j T b hc Om o')]//div[text()='Primary'][1]").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@class='V j cb Ol'][1]").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']").click();
		getNoEmailMsg = driver.findElementByXPath("//div[@class='Wl']").getText();

		Assert.assertEquals(MSG_NOEMAIL_PRIMARY, getNoEmailMsg);

		driver.get(TRASH_URL);
		Sleep(5000);
		driver.findElementByXPath("//div[@class='V j cb Ol'][1]").click();
		Sleep(1000);
		driver.findElementByXPath("//div[@class='M j T b hc q m']//div[text()='Delete forever']").click();
		getNoEmailMsg = driver.findElementByXPath("//div[@class='Wl']").getText();

		Assert.assertEquals(MSG_NOEMAIL, getNoEmailMsg);
	}

	private void Login(String username, String password) {
		driver.get(GOOGLE_URL);
		Sleep(5000);
		driver.findElementById("Email").sendKeys(username);
		driver.findElementById("next").click();
		Sleep(1000);
		driver.findElementById("Passwd").sendKeys(password);
		driver.findElementById("signIn").click();
		Sleep(10000);
	}

	private void Sleep(int millis) {
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
