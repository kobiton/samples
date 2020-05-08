package tests;

import java.util.concurrent.TimeUnit;

import com.google.inject.internal.util.ImmutableMap;
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

    @Test(priority = 1, description = "Should be able to launch application with a deep link")
    public void testAppLaunchSuccessfullyByDeepLinkUrl() throws InterruptedException {
        /*
         * Steps:
         * 1. Access the deep link on mobile
         *
         * Expected:
         * 1. Verify app launch successfully
         */

        String deepLinkUrl = "example://hello";
        String packageName = "com.hld.helloworld";

        driver.executeScript("mobile:deepLink", ImmutableMap.of("url", deepLinkUrl, "package", packageName));

        boolean appLaunchStatus = driver.findElementById("com.hld.helloworld:id/text_home").isDisplayed();
        Assert.assertTrue(appLaunchStatus, "The application launched successfully by deep link url");
    }
}
