package kobiton.com.testng;

import com.kobiton.service.DeviceService;
import com.kobiton.service.model.Device;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.ios.IOSDriver;
import java.io.IOException;
import kobiton.com.utils.AutomationUtils;

public class iOSWebTest {

    public static IOSDriver<WebElement> driver = null;
    String successMsg = "You logged into a secure area!";

    @BeforeTest
    public void Setup() {
        try {
            Device device = new DeviceService().getOnlineDevice("iOS");
            System.out.println(String.format("Execute with: %s  udid: %s", device.getDeviceName(), device.getUdid()));
            driver = new IOSDriver<>(AutomationUtils.kobitonServerUrl(), AutomationUtils.desiredCapabilitiesiOSWeb(device));
            driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
        } catch (IOException ex) {
            Assert.fail("set up failed", ex);
        }

    }

    @AfterTest
    public void Teardown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            //Do-nothing
        }
    }

    @Test(priority = 1, description = "should run test successfully with correct username and password")
    public void testLoginSuccessfully() {
        login("tomsmith", "SuperSecretPassword!");
        Assert.assertTrue(getMessage().contains(successMsg));
    }

    public void login(String userName, String password) {
        driver.get("http://the-internet.herokuapp.com/login");
        driver.findElementById("username").sendKeys(userName);
        driver.findElementById("password").sendKeys(password);
        driver.findElementByXPath("//form[@name='login']").submit();
    }

    public String getMessage() {
        return driver.findElementById("flash").getText();
    }
}