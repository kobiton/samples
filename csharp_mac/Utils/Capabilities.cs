using OpenQA.Selenium.Remote;

namespace Appium.Utils
{
    public class Capabilities
    {
        private DesiredCapabilities capabilities_;
        private Environments env_;
        public Capabilities()
        {
            capabilities_ = new DesiredCapabilities();
            env_ = new Environments();
        }

        public DesiredCapabilities GetAndroidWebDesiredCapability()
        {
            capabilities_.SetCapability("username", env_.GetEnvironmentInfo().USER_NAME);
            capabilities_.SetCapability("accessKey", env_.GetEnvironmentInfo().API_KEY);
            capabilities_.SetCapability("sessionName", "[C#] Android Web");
            capabilities_.SetCapability("sessionDescription", "testing selenium web with c# on android device");
            capabilities_.SetCapability("deviceOrientation", "portrait");
            capabilities_.SetCapability("captureScreenshots", true);
            capabilities_.SetCapability("deviceGroup", "KOBITON");
            capabilities_.SetCapability("browserName", "chrome");
            capabilities_.SetCapability("deviceGroup", "KOBITON");
            capabilities_.SetCapability("platformName", "Android");
            capabilities_.SetCapability("deviceName", "*");
            capabilities_.SetCapability("platformVersion", "*");


            // capabilities_.SetCapability("automationName", "UIAutomator2");
            // capabilities_.SetCapability("udid", "940337a");
            // capabilities_.SetCapability("forceMjsonwp", false);
            return capabilities_;
        }

        public DesiredCapabilities GetiOSWebDesiredCapability()
        {
            capabilities_.SetCapability("username", env_.GetEnvironmentInfo().USER_NAME);
            capabilities_.SetCapability("accessKey", env_.GetEnvironmentInfo().API_KEY);
            capabilities_.SetCapability("sessionName", "[C#] iOS Web");
            capabilities_.SetCapability("sessionDescription", "testing selenium web with c# on ios device");
            capabilities_.SetCapability("deviceOrientation", "portrait");
            capabilities_.SetCapability("captureScreenshots", true);
            capabilities_.SetCapability("browserName", "safari");
            capabilities_.SetCapability("deviceGroup", "KOBITON");
            capabilities_.SetCapability("platformName", "IOS");
            capabilities_.SetCapability("deviceName", "*");
            capabilities_.SetCapability("platformVersion", "*");
            return capabilities_;
        }

        public DesiredCapabilities GetAndroidAppDesiredCapability()
        {
            capabilities_.SetCapability("username", env_.GetEnvironmentInfo().USER_NAME);
            capabilities_.SetCapability("accessKey", env_.GetEnvironmentInfo().API_KEY);
            capabilities_.SetCapability("sessionName", "[C#] Android App");
            capabilities_.SetCapability("sessionDescription", "This is an example for Android app testing");
            capabilities_.SetCapability("deviceOrientation", "portrait");
            capabilities_.SetCapability("captureScreenshots", true);
            capabilities_.SetCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk");
            capabilities_.SetCapability("deviceGroup", "KOBITON");
            capabilities_.SetCapability("platformName", "Android");
            capabilities_.SetCapability("deviceName", "*");
            capabilities_.SetCapability("platformVersion", "*");    
            return capabilities_;
        }

        public DesiredCapabilities GetIOSAppDesiredCapability()
        {
            capabilities_.SetCapability("username", env_.GetEnvironmentInfo().USER_NAME);
            capabilities_.SetCapability("accessKey", env_.GetEnvironmentInfo().API_KEY);
            capabilities_.SetCapability("sessionName", "[C#] IOS App");
            capabilities_.SetCapability("sessionDescription", "This is an example for iOS app testing");
            capabilities_.SetCapability("deviceOrientation", "portrait");
            capabilities_.SetCapability("captureScreenshots", true);
            capabilities_.SetCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa");
            capabilities_.SetCapability("deviceGroup", "KOBITON");
            capabilities_.SetCapability("platformName", "IOS");
            capabilities_.SetCapability("deviceName", "*");
            capabilities_.SetCapability("platformVersion", "*");
            return capabilities_;
        }

    }
}
