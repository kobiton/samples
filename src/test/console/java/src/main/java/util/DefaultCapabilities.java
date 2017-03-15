package util;

import org.openqa.selenium.remote.DesiredCapabilities;

public class DefaultCapabilities {
  public static DesiredCapabilities getDefaultCapabilities(String platFormName) {
    DesiredCapabilities capabilities = new DesiredCapabilities();
    capabilities.setCapability("sessionName", "Android: java-jsonwired");
    capabilities.setCapability("sessionDescription", "Java Selenium Webdriver");
    capabilities.setCapability("deviceOrientation", "portrait");
    capabilities.setCapability("captureScreenshots", true);
    capabilities.setCapability("deviceGroup", "KOBITON");

    if (platFormName.equals("iOS")) {
      capabilities.setCapability("browserName", "safari");
      capabilities.setCapability("deviceName", "iPhone 5");
      capabilities.setCapability("platformName", "iOS");
    }
    else {

      capabilities.setCapability("browserName", "chrome");
      capabilities.setCapability("deviceName", "Galaxy J3");
      capabilities.setCapability("platformName", "Android");
    }
    return  capabilities;
  }
}
