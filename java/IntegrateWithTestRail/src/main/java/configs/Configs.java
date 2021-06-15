package configs;

import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.remote.DesiredCapabilities;

public class Configs {

    static String USERNAME = "";
    static String ACCESS_KEY = "";

    public static final URL kobitonServerUrl() {
        try {
            return new URL("https://" + USERNAME + ":" + ACCESS_KEY + "@api.kobiton.com/wd/hub");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidTests(String externalCaseId) {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android Test - Integrate Kobiton with TestRail");
        capabilities.setCapability("sessionDescription", "This is an example for Integrate Kobiton with TestRail");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "chrome");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("platformVersion", "*");

        capabilities.setCapability("kobiton:tcmServerAddress", "");
        capabilities.setCapability("kobiton:tcmUsername", "");
        capabilities.setCapability("kobiton:tcmApiKey", "");
        capabilities.setCapability("kobiton:externalRunId", "");
        capabilities.setCapability("kobiton:externalCaseId", externalCaseId);
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSTests(String externalCaseId) {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "iOS Test - Integrate Kobiton with TestRail");
        capabilities.setCapability("sessionDescription", "This is an example for Integrate Kobiton with TestRail");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa");
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", "*");
        capabilities.setCapability("platformName", "iOS");
        capabilities.setCapability("platformVersion", "*");
        capabilities.setCapability("automationName", "XCUITest");

        capabilities.setCapability("kobiton:tcmServerAddress", "");
        capabilities.setCapability("kobiton:tcmUsername", "");
        capabilities.setCapability("kobiton:tcmApiKey", "");
        capabilities.setCapability("kobiton:externalRunId", "");
        capabilities.setCapability("kobiton:externalCaseId", externalCaseId);
        return capabilities;
    }
}