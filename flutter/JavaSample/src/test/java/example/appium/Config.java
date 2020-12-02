package example.appium;

import java.net.MalformedURLException;
import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.net.URL;

public class Config {
    static String USERNAME = "kobitonadmin";
    static String API_KEY = "c6d29894-9633-41ec-8346-dd77029998ab";
    static String HOST = "@api-test.kobiton.com/wd/hub";
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

        capabilities.setCapability("groupId", 583); // Group: Im Group
        capabilities.setCapability("deviceGroup", "ORGANIZATION");

        capabilities.setCapability("deviceName", "XIAOMI Redmi Note 7");
        capabilities.setCapability("udid", "6ec7ca0e");

        capabilities.setCapability("tagName", "");
        capabilities.setCapability("platformVersion", "9");
        capabilities.setCapability("platformName", "Android");


        capabilities.setCapability("app", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/app-debug-all.apk");

        System.out.println("Application Native is running ......");
        capabilities.setCapability("automationName", "Flutter");
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
// The given group is used for finding devices and the created session will be visible for all members within the group.
        capabilities.setCapability("groupId", 583); // Group: Im Group
        capabilities.setCapability("deviceGroup", "ORGANIZATION");

        capabilities.setCapability("deviceName", "iPhone 7");
        capabilities.setCapability("udid", "cbb5910d5599d29d264f2f52387b4f7cda7a213d");


        capabilities.setCapability("tagName", "");
        capabilities.setCapability("platformVersion", "14.2");
        capabilities.setCapability("platformName", "iOS");


        capabilities.setCapability("app", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/demo/Runner.zip");

        System.out.println("Application Native is running ......");
        capabilities.setCapability("automationName", "Flutter");
        return capabilities;
    }

}
