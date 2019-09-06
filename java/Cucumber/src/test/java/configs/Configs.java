package configs;

import java.net.MalformedURLException;
import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;

public class Configs {

    static String USERNAME = "";
    static String API_KEY = "";
    public static final URL kobitonServerUrl(){
        try {
            return new URL("https://" + USERNAME + ":" + API_KEY + "@api.kobiton.com/wd/hub");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidWeb(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android Web Cucumber");
        capabilities.setCapability("sessionDescription", "This is an example for Android Web testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "chrome");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "Android");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android App Cucumber");
        capabilities.setCapability("sessionDescription", "Automation test android app session");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "Android");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSWeb(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "iOS Web Cucumber");
        capabilities.setCapability("sessionDescription", "This is an example for iOS Web testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "safari");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "iOS");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "iOS App Cucumber");
        capabilities.setCapability("sessionDescription", "This is an example for iOS App testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "iOS");
        return capabilities;
    }
}
