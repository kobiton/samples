package example.appium;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import io.appium.java_client.service.local.AppiumServerHasNotBeenStartedLocallyException;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.net.URL;


public class BaseDriver extends Config  {
  public AppiumDriver<MobileElement> driver;
  public WebDriverWait wait;


  @Before
  public void setUp() throws Exception {
    if(Config.TYPE=="IOS")
    {
      driver = new IOSDriver<MobileElement>(Config.kobitonServerUrl(), Config.desiredCapabilitiesIosApp());
      wait = new WebDriverWait(driver, 10);
    }
    else
    {
      driver = new AndroidDriver<MobileElement>(Config.kobitonServerUrl(), Config.desiredCapabilitiesAndroidApp());
      wait = new WebDriverWait(driver, 10);
    }

  }

  @After
  public void tearDown() throws Exception {
    if (driver != null) {
      driver.quit();
    }

  }
}
