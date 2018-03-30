import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.*;
import org.testng.ITestContext;
import org.openqa.selenium.Keys;
import org.openqa.selenium.remote.RemoteWebDriver;
import java.util.Map;

public class WebTest {
    public static Map<String, String> testngParams;
    String kobitonURL;
    RemoteWebDriver driver = null;

    @BeforeTest
    @Parameters({"platform"})
    public void Setup(ITestContext testContext, String platform) throws MalformedURLException {
        testngParams = testContext.getCurrentXmlTest().getAllParameters();
        kobitonURL = testngParams.get("kobitonURL");
        driver = new RemoteWebDriver(new URL(kobitonURL), this.generateDesiredCaps(platform));
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

    public static DesiredCapabilities generateDesiredCaps(String platform) {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        String browserName = "chrome";
        String deviceName = "Galaxy";
        if (platform.equals("iOS")) {
            browserName = "safari";
            deviceName = "iPhone";
        }
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