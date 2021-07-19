package configs;

import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.remote.DesiredCapabilities;

public class Configs {

    static String USERNAME = "<YOUR_KOBITON_USERNAME>";
    static String API_KEY = "<YOUR_KOBITON_API_KEY>";

    public static final URL kobitonServerUrl() {
        try {
            return new URL("https://" + USERNAME + ":" + API_KEY + "@api.kobiton.com/wd/hub");
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

        capabilities.setCapability("kobiton:tcmServerAddress", "<YOUR_TCM_SERVER_ADDRESS>");
        capabilities.setCapability("kobiton:tcmUsername", "<YOUR_TCM_USERNAME>");
        capabilities.setCapability("kobiton:tcmApiKey", "<YOUR_TCM_API_KEY>");
        capabilities.setCapability("kobiton:externalRunId", "<YOUR_TCM_TEST_RUN_ID>");
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

        capabilities.setCapability("kobiton:tcmServerAddress", "<YOUR_TCM_SERVER_ADDRESS>");
        capabilities.setCapability("kobiton:tcmUsername", "<YOUR_TCM_USERNAME>");
        capabilities.setCapability("kobiton:tcmApiKey", "<YOUR_TCM_API_KEY>");
        capabilities.setCapability("kobiton:externalRunId", "<YOUR_TCM_TEST_RUN_ID>");
        capabilities.setCapability("kobiton:externalCaseId", externalCaseId);
        return capabilities;
    }
}