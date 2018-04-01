import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.*;
import org.testng.ITestContext;
import org.openqa.selenium.Keys;
import java.util.Map;

public class WebTest {
    AppiumDriver driver = null;

    @BeforeTest
    @Parameters({"platform", "deviceName", "browserName"})
    public void Setup(ITestContext testContext, String platform, String deviceName, String browserName) throws MalformedURLException {
        Map<String, String> testngParams = testContext.getCurrentXmlTest().getAllParameters();
        String kobitonURL = testngParams.get("kobitonURL");
        if (platform.toLowerCase().equals("android")) {
            driver = new AndroidDriver(new URL(kobitonURL), this.generateDesiredCaps(platform, deviceName, browserName));
        } else {
            driver = new IOSDriver(new URL(kobitonURL), this.generateDesiredCaps(platform, deviceName, browserName));
        }
        driver.manage().timeouts().implicitlyWait(90, TimeUnit.SECONDS);
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

    @Test
    public void testKobitonWebsite() {
        driver.get("http://google.com");
        WebElement searchFieldE = driver.findElementByXPath("//input[@name='q']");
        searchFieldE.sendKeys("Kobiton");
        searchFieldE.sendKeys(Keys.ENTER);
        String message = driver.getTitle();
        Assert.assertTrue(message.contains("Kobiton"));
    }

    public static DesiredCapabilities generateDesiredCaps(String platform, String deviceName, String browserName) {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Run test on " + platform);
        capabilities.setCapability("sessionDescription", "This is an example for Web testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("platformName", platform);
        capabilities.setCapability("browserName", browserName);
        capabilities.setCapability("deviceName", deviceName);
        return capabilities;
    }

}