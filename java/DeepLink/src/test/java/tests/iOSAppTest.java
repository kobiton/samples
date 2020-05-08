package tests;

import java.util.concurrent.TimeUnit;
import com.google.common.collect.ImmutableMap;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.ios.IOSDriver;
import configs.Configs;

public class iOSAppTest {

    public static IOSDriver<WebElement> driver = null;

    @BeforeTest
    public void Setup() {
        driver = new IOSDriver<WebElement>(Configs.kobitonServerUrl(), Configs.desiredCapabilitiesiOSApp());
        driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
    }

    @AfterTest
    public void Teardown() {
        try {
            if(driver != null)
                driver.quit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test(priority = 1, description = "Should launch app successfully by deep link url")
    public void testAppLaunchSuccessfullyByDeepLinkUrl() throws InterruptedException {
        /*
         * Steps:
         * 1. Terminate the app under test (optional)
         * 2. Launch Safari and enter the deep link in the address bar
         * 3. Confirm the notification pop-up
         *
         * Expected:
         * 1. Verify app launch successfully
         */

        String bundleIdAppTest = "io.cloudgrey.the-app";
        String bundleIdSafari = "com.apple.mobilesafari";
        String deepLinkUrl = "theapp://login/alice/mypassword";

        driver.executeScript("mobile: terminateApp", ImmutableMap.of("bundleId", bundleIdAppTest));
        driver.executeScript("mobile: launchApp", ImmutableMap.of("bundleId", bundleIdSafari));

        if (driver.isKeyboardShown()) {
            driver.findElementByXPath("//XCUIElementTypeButton[@name='URL']").wait(15);
            driver.findElementByXPath("//XCUIElementTypeButton[@name='URL']").click();
        }

        driver.findElementByXPath("XCUIElementTypeTextField[@name='URL']").sendKeys(deepLinkUrl + "\uE007");

        driver.findElementByXPath("XCUIElementTypeButton[@name='Open']").wait(15);
        driver.findElementByXPath("XCUIElementTypeButton[@name='Open']").click();

        driver.findElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").wait(15);
        boolean appLaunchStatus = driver.findElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").isDisplayed();
        Assert.assertTrue(appLaunchStatus, "The app launched successfully by deep link url");
    }
}
