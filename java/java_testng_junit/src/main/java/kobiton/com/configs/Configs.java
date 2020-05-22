package kobiton.com.configs;

import java.net.MalformedURLException;
import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;

public class Configs {

    static String USERNAME = "";
    static String ACCESS_KEY = "";
    public static final URL kobitonServerUrl(){
        try {
            return new URL("https://" + USERNAME + ":" + ACCESS_KEY + "@api.kobiton.com/wd/hub");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String generateBasicAuth() {
        String authString = USERNAME + ":" + ACCESS_KEY;
        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
        String authStringEnc = new String(authEncBytes);
        return "Basic " + authStringEnc;
    }
    
    public static final DesiredCapabilities desiredCapabilitiesAndroidWeb(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android Web");
        capabilities.setCapability("sessionDescription", "This is an example for Android Web testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "chrome");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "Galaxy S5");
        capabilities.setCapability("platformName", "Android");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android app");
        capabilities.setCapability("sessionDescription", "This is an example for Android app testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "Galaxy S5");
        capabilities.setCapability("platformName", "Android");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSWeb(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "iOS Web");
        capabilities.setCapability("sessionDescription", "This is an example for iOS Web testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "safari");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "iPhone 7");
        capabilities.setCapability("platformName", "iOS");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "iOS app");
        capabilities.setCapability("sessionDescription", "This is an example for iOS App testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "iPhone 7");
        capabilities.setCapability("platformName", "iOS");
        return capabilities;
    }
}
