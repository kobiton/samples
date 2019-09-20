package com.pcc.testngAzureDemo;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

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
    capabilities.setCapability("app", System.getenv("KOBITON_SESSION_APPLICATION"));

    capabilities.setCapability("deviceGroup", "KOBITON");
    // For deviceName, platformVersion Kobiton supports wildcard
    // character *, with 3 formats: *text, text* and *text*
    // If there is no *, Kobiton will match the exact text provided
    
    String deviceName = System.getenv("KOBITON_DEVICE_NAME") != null ? System.getenv("KOBITON_DEVICE_NAME") : "Galaxy*";
    String platformVersion = System.getenv("KOBITON_SESSION_PLATFORM_VERSION") != null ? System.getenv("KOBITON_SESSION_PLATFORM_VERSION") : "6*";
    String platformName = System.getenv("KOBITON_DEVICE_PLATFORM_NAME") != null ? System.getenv("KOBITON_DEVICE_PLATFORM_NAME") : "android";
    
    capabilities.setCapability("deviceName", deviceName);
    capabilities.setCapability("platformVersion", platformVersion);
    capabilities.setCapability("platformName", platformName);

    url = new URL(kobitonServerUrl);

    driver = new AndroidDriver<MobileElement>(url, capabilities);
    driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
  }

  @AfterSuite
  public void uninstallApp() throws InterruptedException {
  System.out.println("After Suite");
    driver.removeApp("io.appium.android.apis" );
    String kobitonSessionId = driver.getSessionDetails().get("kobitonSessionId").toString();
    System.out.println("kobitonSessionId: " + kobitonSessionId);
    driver.quit();
  }

  @Test (enabled=true) public void myFirstTest() throws InterruptedException {
    System.out.println("First Test");
    Thread.sleep(5000);
    System.out.println("1");
    System.out.println("2");
    driver.resetApp();
  }
}