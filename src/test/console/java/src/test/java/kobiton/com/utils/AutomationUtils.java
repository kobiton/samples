package kobiton.com.utils;

import com.kobiton.config.Config;
import com.kobiton.service.KeyService;
import com.kobiton.service.model.APIKey;
import com.kobiton.service.model.Device;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openqa.selenium.remote.DesiredCapabilities;

public class AutomationUtils {    
    public static final URL kobitonServerUrl() {             
        try {
            APIKey key = new KeyService().getApiKey();
            
            URL apiUrl = new URL(Config.getInstance().getApiUrl());
            String automationUrl = String.format("%s://%s:%s@%s/wd/hub", 
                    apiUrl.getProtocol(),
                    key.getUsername(),
                    key.getKey(),
                    apiUrl.getHost()
            );
            Logger.getLogger(AutomationUtils.class.getName()).log(Level.SEVERE, "automationUrl:" + automationUrl);
            return new URL(automationUrl);
        } catch (MalformedURLException e) {
            Logger.getLogger(AutomationUtils.class.getName()).log(Level.SEVERE, null, e);
        } catch (IOException ex) {
            Logger.getLogger(AutomationUtils.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidWeb(Device device) {
        DesiredCapabilities capabilities = createCapabilitiesFor(device);
        capabilities.setCapability("sessionName", "Android Web");
        capabilities.setCapability("sessionDescription", "This is an example for Android Web testing");
        capabilities.setCapability("browserName", "chrome");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesAndroidApp(Device device) {
        DesiredCapabilities capabilities = createCapabilitiesFor(device);
        capabilities.setCapability("sessionName", "Android app");
        capabilities.setCapability("sessionDescription", "This is an example for Android app testing");
        capabilities.setCapability("app", "https://s3.amazonaws.com/kobiton-dev/apps-test/demo/com.dozuki.ifixit.apk");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSWeb(Device device) {
        DesiredCapabilities capabilities = createCapabilitiesFor(device);
        capabilities.setCapability("sessionName", "iOS Web");
        capabilities.setCapability("sessionDescription", "This is an example for iOS Web testing");
        capabilities.setCapability("browserName", "safari");
        return capabilities;
    }

    public static final DesiredCapabilities desiredCapabilitiesiOSApp(Device device) {
        DesiredCapabilities capabilities = createCapabilitiesFor(device);
        capabilities.setCapability("sessionName", "iOS app");
        capabilities.setCapability("sessionDescription", "This is an example for iOS App testing");
        capabilities.setCapability("app", "https://s3.amazonaws.com/kobiton-dev/apps-test/demo/iFixit.ipa");
        return capabilities;
    }
    
    private static DesiredCapabilities createCapabilitiesFor(Device device) {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("deviceGroup", "KOBITON");
        capabilities.setCapability("deviceName", device.getDeviceName());
        capabilities.setCapability("platformName", device.getPlatformName());
        capabilities.setCapability("platformVersion", device.getPlatformVersion());
        return capabilities;
    }
}
