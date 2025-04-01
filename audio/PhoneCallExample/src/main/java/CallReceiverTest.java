// package com.example.appium

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.AppiumBy;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class CallReceiverTest {
    public static void main(String[] args) {
        AndroidDriver driver = null;
        try {
            // Set up capabilities
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities.setCapability("kobiton:device", "99151FFAZ00AQ5"); // Pixel 4 UDID
            capabilities.setCapability("appium:deviceName", "Pixel 4");
            // BLUETOOTH capability is set to true to enable Bluetooth for the call. For this call, the audio will be recorded. Recording is default for all bluetooth sessions.
            capabilities.setCapability("kobiton:bluetooth", true);
            capabilities.setCapability("appium:appPackage", "com.google.android.dialer");
            capabilities.setCapability("appium:appActivity", "com.google.android.dialer.extensions.GoogleDialtactsActivity");
            capabilities.setCapability("appium:automationName", "UiAutomator2");
            capabilities.setCapability("kobiton:existingsession", "delete");
            capabilities.setCapability("appium:noReset", true);
            capabilities.setCapability("platformName", "Android");
            capabilities.setCapability("platformVersion", "13");
            capabilities.setCapability("kobiton:sessionName", "Call Receiver Test - Pixel 4");
            capabilities.setCapability("kobiton:sessionDescription", "Answering call from iPhone 14");
            capabilities.setCapability("kobiton:deviceOrientation", "portrait");
            capabilities.setCapability("kobiton:captureScreenshots", true);

            // Initialize driver
            // REPLACE: <user_name>, <api_key>, <api_url> with your Kobiton credentials
            String kobitonServerUrl = "https://<user_name>:<api_key>c@<api_url>";

            driver = new AndroidDriver(new URL(kobitonServerUrl), capabilities);
            System.out.println("Launching Phone app on Pixel 4...");

            // Create wait with appropriate timeout
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(90));

            // Wait for incoming call
            System.out.println("Waiting for incoming call...");
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Answer")));
            System.out.println("Incoming call detected!");

            // Answer the call using Accessibility ID (worked in logs)
            System.out.println("Attempting to answer incoming call...");
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Answer"))).click();
            System.out.println("Call answered successfully");

            // Wait for call duration
            System.out.println("Call connected. Waiting for audio playback...");
            Thread.sleep(35000);

            // End the call using coordinates (only strategy that worked in logs)
            System.out.println("Ending call using coordinates...");
            new TouchAction<>(driver)
                    .tap(PointOption.point(540, 1700))
                    .perform();
            System.out.println("Call ended successfully");

        } catch (Exception e) {
            System.err.println("ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
                System.out.println("Session ended.");
            }
        }
    }
}


