package kobiton.com.parallelTestcases;

import io.appium.java_client.ios.IOSDriver;
import kobiton.com.configs.Configs;
import kobiton.com.configs.Utils;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.*;

import java.util.concurrent.TimeUnit;

public class IOSTestcase {

    private IOSDriver<WebElement> driver = null;

    @Parameters({"udid"})
    @BeforeTest
    public void Setup(@Optional("*") String udid) {
        boolean flag = Utils.waitForDevice("privateDevices", udid);
        if (flag) {
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities = Configs.desiredCapabilitiesiOSWeb();
            capabilities.setCapability("udid", udid);
            capabilities.setCapability("deviceGroup", "ORGANIZATION");
            capabilities.setCapability("deviceName", "*");
            
            driver = new IOSDriver<WebElement>(Configs.kobitonServerUrl(), capabilities);
            driver.manage().timeouts().implicitlyWait(120, TimeUnit.SECONDS);
        }
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
    public void test() {
        driver.get("http://the-internet.herokuapp.com/login");
    }
}
