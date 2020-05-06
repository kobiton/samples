package tests;

import java.util.concurrent.TimeUnit;

import com.google.common.collect.ImmutableMap;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.android.AndroidDriver;
import configs.Configs;

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

    @Test(priority = 1, description = "Should launch app successfully by deep link url")
    public void testAppLaunchSuccessfullyByDeepLinkUrl() throws InterruptedException {
        /*
         * Steps:
         * 1. Access the deep link on mobile
         *
         * Expected:
         * 1. Verify app launch successfully
         */

        String deepLinkUrl = "theapp://login/darlene/testing123";
        String packageName = "io.cloudgrey.the_app";

        driver.executeScript("mobile:deepLink", ImmutableMap.of("url", deepLinkUrl, "package", packageName));

        driver.findElementByXPath("//*[@resource-id='android:id/home']").wait(15);
        boolean appLaunchStatus = driver.findElementByXPath("//*[@resource-id='android:id/home']").isDisplayed();
        Assert.assertTrue(appLaunchStatus, "The app launched successfully by deep link url");
    }
}
