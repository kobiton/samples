package kobiton.com.testng;

import com.kobiton.service.DeviceService;
import com.kobiton.service.model.Device;
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
import java.io.IOException;
import kobiton.com.utils.AutomationUtils;

public class iOSAppTest {

    public static IOSDriver<WebElement> driver = null;

    @BeforeTest
    public void Setup() {
        try {
            Device device = new DeviceService().getOnlineDevice("iOS");
            System.out.println(String.format("Execute with: %s  udid: %s", device.getDeviceName(), device.getUdid()));
            driver = new IOSDriver<>(AutomationUtils.kobitonServerUrl(), AutomationUtils.desiredCapabilitiesiOSApp(device));
            driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
            String kobitonSessionId = driver.getSessionDetails().get("kobitonSessionId").toString();
            System.out.println("https://portal.kobiton.com/sessions/" + kobitonSessionId);
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

    @Test
    public void test() {
        driver.findElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").click();
    }

    public void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
