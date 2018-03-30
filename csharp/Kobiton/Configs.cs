using OpenQA.Selenium.Remote;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kobiton
{
  public class Configs
  {

    private const string AUTH_USERNAME = "";
    private const string AUTH_ACCESSKEY = "";
    public const int SESSION_TIMEOUT = 20*60;

    public static Uri kobitonServerUrl()
    {
      return new Uri("https://api.kobiton.com/wd/hub");
    }

    public static DesiredCapabilities desiredCapabilitiesAndroidWeb()
    {
      DesiredCapabilities capabilities = new DesiredCapabilities();
      capabilities.SetCapability("username", AUTH_USERNAME);
      capabilities.SetCapability("accessKey", AUTH_ACCESSKEY);
      capabilities.SetCapability("sessionName", "Android Web");
      capabilities.SetCapability("sessionDescription", "This is an example for Android Web testing");
      capabilities.SetCapability("deviceOrientation", "portrait");
      capabilities.SetCapability("captureScreenshots", true);
      capabilities.SetCapability("browserName", "chrome");
      capabilities.SetCapability("deviceGroup", "KOBITON");
      capabilities.SetCapability("deviceName", "Galaxy S5");
      capabilities.SetCapability("platformName", "Android");
      return capabilities;
    }

    public static DesiredCapabilities desiredCapabilitiesAndroidApp()
    {
      DesiredCapabilities capabilities = new DesiredCapabilities();
      capabilities.SetCapability("username", AUTH_USERNAME);
      capabilities.SetCapability("accessKey", AUTH_ACCESSKEY);
      capabilities.SetCapability("sessionName", "Android app");
      capabilities.SetCapability("sessionDescription", "This is an example for Android app testing");
      capabilities.SetCapability("deviceOrientation", "portrait");
      capabilities.SetCapability("captureScreenshots", true);
      capabilities.SetCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk");
      capabilities.SetCapability("deviceGroup", "KOBITON");
      capabilities.SetCapability("deviceName", "Galaxy S5");
      capabilities.SetCapability("platformName", "Android");
      return capabilities;
    }

    public static DesiredCapabilities desiredCapabilitiesiOSWeb()
    {
      DesiredCapabilities capabilities = new DesiredCapabilities();
      capabilities.SetCapability("username", AUTH_USERNAME);
      capabilities.SetCapability("accessKey", AUTH_ACCESSKEY);
      capabilities.SetCapability("sessionName", "iOS Web");
      capabilities.SetCapability("sessionDescription", "This is an example for iOS Web testing");
      capabilities.SetCapability("deviceOrientation", "portrait");
      capabilities.SetCapability("captureScreenshots", true);
      capabilities.SetCapability("browserName", "safari");
      capabilities.SetCapability("deviceGroup", "KOBITON");
      capabilities.SetCapability("deviceName", "iPhone 7");
      capabilities.SetCapability("platformName", "iOS");
      return capabilities;
    }

    public static DesiredCapabilities desiredCapabilitiesiOSApp()
    {
      DesiredCapabilities capabilities = new DesiredCapabilities();
      capabilities.SetCapability("username", AUTH_USERNAME);
      capabilities.SetCapability("accessKey", AUTH_ACCESSKEY);
      capabilities.SetCapability("sessionName", "iOS app");
      capabilities.SetCapability("sessionDescription", "This is an example for iOS App testing");
      capabilities.SetCapability("deviceOrientation", "portrait");
      capabilities.SetCapability("captureScreenshots", true);
      capabilities.SetCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa");
      capabilities.SetCapability("deviceGroup", "KOBITON");
      capabilities.SetCapability("deviceName", "iPhone 7");
      capabilities.SetCapability("platformName", "iOS");
      return capabilities;
    }
  }
}
