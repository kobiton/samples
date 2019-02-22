package kobiton.com.testng;

import com.kobiton.service.DeviceService;
import com.kobiton.service.model.Device;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.android.AndroidDriver;
import java.io.IOException;
import kobiton.com.utils.AutomationUtils;

public class AndroidAppTest {

    public static AndroidDriver<WebElement> driver = null;
    public final String question = "Acura MDX";

    @BeforeTest
    public void Setup() {
        try {
            Device device = new DeviceService().getOnlineDevice("Android");
            System.out.println(String.format("Execute with: %s  udid: %s", device.getDeviceName(), device.getUdid()));
            driver = new AndroidDriver<>(AutomationUtils.kobitonServerUrl(), AutomationUtils.desiredCapabilitiesAndroidApp(device));
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

    @Test(priority = 1, description = "should verify Acura categories")
    public void testSearchQuestionsOnAcuraSupportCommunity() {

        /*
      * Steps:
      * 1. Click on "Car and Truck" Categories on Homepage
      * 2. Click on "Acura" Categories
      *
      * Expected:
      * General Information is "Acura".
        */

        driver.findElementByXPath("//*[@resource-id='android:id/home']").click();
        sleep(3);
        driver.findElementByXPath("//*[@text='Car and Truck']").click();
        driver.findElementByXPath("//*[@text='Acura']").click();
        sleep(3);
        String acuraText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]")
                .getText();

        Assert.assertEquals(acuraText, "Acura");

    }

    public void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
