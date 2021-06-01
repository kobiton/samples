package example.appium;

import java.net.MalformedURLException;
import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.net.URL;

public class Config {
    static String USERNAME = "";
    static String API_KEY = "";
    static String HOST = "@api.kobiton.com/wd/hub";
    static String TYPE = "IOS";
    public static final URL kobitonServerUrl(){
        try {
            String tmp = "https://"+USERNAME+":"+API_KEY+HOST;
            return new URL(tmp);
        } catch ( MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static DesiredCapabilities desiredCapabilitiesAndroidApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Automation test session");
        capabilities.setCapability("sessionDescription", "");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("noReset", true);
        capabilities.setCapability("fullReset", false);
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "chrome");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("udid", "");
        capabilities.setCapability("tagName", "");
        capabilities.setCapability("platformVersion", "*");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("app", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/app-debug-all.apk");
        capabilities.setCapability("automationName", "Flutter");
        System.out.println("Application Native is running ......");
        return capabilities;
    }

    public static DesiredCapabilities desiredCapabilitiesIosApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Automation test session");
        capabilities.setCapability("sessionDescription", "");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("noReset", true);
        capabilities.setCapability("fullReset", false);
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "safari");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("udid", "");
        capabilities.setCapability("tagName", "");
        capabilities.setCapability("platformVersion", "*");
        capabilities.setCapability("platformName", "iOS");
        capabilities.setCapability("app", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/Runner.zip");
        capabilities.setCapability("automationName", "Flutter");
        System.out.println("Application Native is running ......");
        return capabilities;
    }

}
