using System;
using MobileAutomation.Config;
using MobileAutomation.Service;
using MobileAutomation.Service.Model;
using OpenQA.Selenium.Remote;

namespace MobileAutomation.Tests.Utils
{
  public class AutomationUtils
  {
    private static readonly AutomationUtils instance = new AutomationUtils();
    public static AutomationUtils Instance
    {
        get
        {
            return instance;
        }
    }

    public Uri KobitonServerUrl { get; internal set; }

    private AutomationUtils()
    {
      KobitonServerUrl = new Uri("https://api.kobiton.com/wd/hub");
    }

    public DesiredCapabilities DesiredCapabilitiesAndroidWeb(Device device)
    {
      var capabilities = CreateCapabilitiesFor(device);
      capabilities.SetCapability("sessionName", "[C#]Android Web");
      capabilities.SetCapability("sessionDescription", "This is an example for Android Web testing");
      capabilities.SetCapability("browserName", "chrome");
      return capabilities;
    }

    public DesiredCapabilities DesiredCapabilitiesAndroidApp(Device device)
    {
      var capabilities = CreateCapabilitiesFor(device);
      capabilities.SetCapability("sessionName", "[C#]Android app");
      capabilities.SetCapability("sessionDescription", "This is an example for Android app testing");
      capabilities.SetCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk");
      return capabilities;
    }

    public DesiredCapabilities DesiredCapabilitiesIOSWeb(Device device)
    {
      var capabilities = CreateCapabilitiesFor(device);
      capabilities.SetCapability("sessionName", "[C#]iOS web");
      capabilities.SetCapability("sessionDescription", "This is an example for iOS web testing");
      capabilities.SetCapability("browserName", "safari");
      return capabilities;
    }

    public DesiredCapabilities DesiredCapabilitiesIOSApp(Device device)
    {
      var capabilities = CreateCapabilitiesFor(device);
      capabilities.SetCapability("sessionName", "[C#]iOS app");
      capabilities.SetCapability("sessionDescription", "This is an example for iOS app testing");
      capabilities.SetCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa");
      return capabilities;
    }

    private DesiredCapabilities CreateCapabilitiesFor(Device device)
    {
      var capabilities = new DesiredCapabilities();
      var keyService = new KeyService();
      var key = keyService.GetAPIKey();
      capabilities.SetCapability("username", key.Username);
      capabilities.SetCapability("accessKey", key.Key);
      capabilities.SetCapability("deviceOrientation", "portrait");
      capabilities.SetCapability("captureScreenshots", true);
      capabilities.SetCapability("deviceGroup", "KOBITON");
      capabilities.SetCapability("deviceName", device.DeviceName);
      capabilities.SetCapability("platformName", device.PlatformName);
      capabilities.SetCapability("platformVersion", device.PlatformVersion);
      return capabilities;
    }
  }
}
