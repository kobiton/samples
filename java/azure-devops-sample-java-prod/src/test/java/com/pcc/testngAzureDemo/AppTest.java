package com.pcc.testngAzureDemo;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import io.appium.java_client.MobileBy;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;
import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;
import org.testng.annotations.AfterSuite;

import org.testng.annotations.Test;
import io.appium.java_client.MobileElement;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;

public class AppTest {
  public static URL url;
  public static DesiredCapabilities capabilities;
  public static AndroidDriver<MobileElement> driver;
  //@Parameters({ deviceName_,"platformVersion_"})
  @BeforeSuite
  public void setupAppium() throws MalformedURLException {
    //Run test on Kobiton


    //The generated session will be visible to you only.
    String kobitonServerUrl = "https://" + System.getenv("KOBITON_USERNAME") + ":" + System.getenv("KOBITON_API_KEY") + "@api.kobiton.com/wd/hub";
    DesiredCapabilities capabilities = new DesiredCapabilities();
    // The generated session will be visible to you only.
    capabilities.setCapability("sessionName", "PMO test");
    capabilities.setCapability("sessionDescription", "abc");
    capabilities.setCapability("deviceOrientation", "portrait");
    capabilities.setCapability("captureScreenshots", true);
    // The maximum size of application is 500MB
    // By default, HTTP requests from testing library are expired
    // in 2 minutes while the app copying and installation may
    // take up-to 30 minutes. Therefore, you need to extend the HTTP
    // request timeout duration in your testing library so that
    // it doesn't interrupt while the device is being initialized.
    String app = System.getenv("KOBITON_SESSION_APPLICATION") != null ? System.getenv("KOBITON_SESSION_APPLICATION") : "kobiton-store:91041";
    capabilities.setCapability("app", app);

    capabilities.setCapability("deviceGroup", "ORGANIZATION");
    // For deviceName, platformVersion Kobiton supports wildcard
    // character *, with 3 formats: *text, text* and *text*
    // If there is no *, Kobiton will match the exact text provided

    String deviceName = System.getenv("KOBITON_DEVICE_NAME") != null ? System.getenv("KOBITON_DEVICE_NAME") : "Galaxy*";
    String platformVersion = System.getenv("KOBITON_SESSION_PLATFORM_VERSION") != null ? System.getenv("KOBITON_SESSION_PLATFORM_VERSION") : "6*";
    String platformName = System.getenv("KOBITON_DEVICE_PLATFORM_NAME") != null ? System.getenv("KOBITON_DEVICE_PLATFORM_NAME") : "android";

    capabilities.setCapability("deviceName", deviceName);
    capabilities.setCapability("platformVersion", platformVersion);
    capabilities.setCapability("platformName", platformName);
    capabilities.setCapability("kobiton:scriptlessEnable", true);

    System.out.println(kobitonServerUrl);
    System.out.println(capabilities);

    url = new URL(kobitonServerUrl);

    driver = new AndroidDriver<MobileElement>(url, capabilities);
    String kobitonSessionId = driver.getSessionDetails().get("kobitonSessionId").toString();
    System.out.println("kobitonSessionId: " + kobitonSessionId);
    driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
  }

  @AfterSuite
  public void quitAppium() throws InterruptedException {
    System.out.println("After Suite");
    driver.quit();
  }

  @Test (enabled=true) public void myFirstTest() throws InterruptedException {
    driver.findElement(MobileBy.AccessibilityId("Views")).click();

    driver.findElement(MobileBy.AccessibilityId("Auto Complete")).click();

    driver.findElement(MobileBy.AccessibilityId("1. Screen Top")).click();

    driver.findElement(MobileBy.xpath("//*[@resource-id='io.appium.android.apis:id/edit']")).sendKeys("Kobiton");

    driver.pressKey(new KeyEvent(AndroidKey.BACK));

    driver.pressKey(new KeyEvent(AndroidKey.BACK));
  }
}
