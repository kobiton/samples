package kobiton.com.testng;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.Test;

import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;

public class azureTestNG {
  public URL url;
  public DesiredCapabilities capabilities;
  public AndroidDriver<MobileElement> driver;

  @BeforeSuite
  public void Setup() throws MalformedURLException {

    String kobitonServerUrl = "https://" + System.getenv("KOBITON_USERNAME") + ":" + System.getenv("KOBITON_API_KEY") + "@api.kobiton.com/wd/hub";
    String deviceName = System.getenv("KOBITON_DEVICE_NAME") != null ? System.getenv("KOBITON_DEVICE_NAME") : "Galaxy*";
    DesiredCapabilities capabilities = new DesiredCapabilities();
    
    capabilities.setCapability("sessionName", "azureTestNG");
    capabilities.setCapability("sessionDescription", "This is an example for Azure tetsting");
    capabilities.setCapability("deviceOrientation", "portrait");
    capabilities.setCapability("captureScreenshots", true);
    capabilities.setCapability("app", (System.getenv("KOBITON_SESSION_APPLICATION") != null ? 
      System.getenv("KOBITON_SESSION_APPLICATION") : "https://appium.github.io/appium/assets/ApiDemos-debug.apk"
    ));
    capabilities.setCapability("deviceGroup", "KOBITON");
    capabilities.setCapability("deviceName", deviceName);
    capabilities.setCapability("platformName", "Android");

    url = new URL(kobitonServerUrl);

    driver = new AndroidDriver<MobileElement>(url, capabilities);
    driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
  }

  @AfterSuite
  public void Teardown() {
    try {
      if(driver != null)
        driver.quit();
    } catch (Exception e) {
        e.printStackTrace();
    }
  }

  @Test
  public void myFirstTest() throws InterruptedException {
    driver.resetApp();
  }
}
