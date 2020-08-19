package configs;

import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.remote.DesiredCapabilities;

public class Configs {

    static String USERNAME = "";
    static String ACCESS_KEY =  "";
    public static final URL kobitonServerUrl(){
        try {
            return new URL("https://" + USERNAME + ":" + ACCESS_KEY + "@api.kobiton.com/wd/hub");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidApp(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Java TestNG - Android App");
        capabilities.setCapability("sessionDescription", "This is an example for Android app testing");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("platformVersion", "*");
        capabilities.setCapability("allowMobileShell", true);

        return capabilities;
    }
}
