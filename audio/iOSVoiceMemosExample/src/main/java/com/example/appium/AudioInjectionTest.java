package com.example.appium;

import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.AppiumBy;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

public class AudioInjectionTest {

    public static void main(String[] args) {
        IOSDriver driver = null;
        try {
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities.setCapability("kobiton:device", "00008020-001875EE21D8003A");
            capabilities.setCapability("appium:deviceName", "iPhone XS Max");
            capabilities.setCapability("kobiton:bluetooth", true);
            capabilities.setCapability("appium:bundleId", "com.apple.VoiceMemos");
            capabilities.setCapability("appium:automationName", "XCUITest");
            capabilities.setCapability("kobiton:existingsession", "delete");
            capabilities.setCapability("appium:noReset", true);
            capabilities.setCapability("platformName", "iOS");
            capabilities.setCapability("kobiton:sessionName", "Audio Injection Test Session");
            capabilities.setCapability("kobiton:sessionDescription", "Testing audio injection with Voice Memos");
            capabilities.setCapability("kobiton:deviceOrientation", "portrait");
            capabilities.setCapability("kobiton:captureScreenshots", true);
            // Removed "logLevel" to reduce Appium debug output; can set to "error" if needed
            capabilities.setCapability("appium:javascriptEnabled", true);

            String kobitonServerUrl = "https://<user>:<api_key>@api.kobiton.com/wd/hub";
            driver = new IOSDriver(new URL(kobitonServerUrl), capabilities);
            System.out.println("Launching Voice Memos app...");

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

            // Handle the "Continue" button on first launch
            try {
                WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
                shortWait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Continue"))).click();
                System.out.println("Clicked 'Continue' button.");
                Thread.sleep(2000);
            } catch (org.openqa.selenium.TimeoutException e) {
                System.out.println("No 'Continue' button found.");
            }

            // Handle the "Allow While Using App" permission prompt
            try {
                WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
                shortWait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Allow While Using App"))).click();
                System.out.println("Clicked 'Allow While Using App' button.");
                Thread.sleep(2000);
            } catch (org.openqa.selenium.TimeoutException e) {
                System.out.println("No 'Allow While Using App' button found.");
            }

            // Navigate to the recording screen if necessary
            try {
                wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("New Recording"))).click();
                System.out.println("Clicked 'New Recording' button.");
            } catch (org.openqa.selenium.TimeoutException e) {
                System.out.println("No 'New Recording' button found.");
            }

            // Start recording
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Record"))).click();
            System.out.println("Recording started...");
            Thread.sleep(15000);

            // Attempt audio injection
            Map<String, Object> audioParams = new HashMap<>();
            audioParams.put("url", "https://drive.google.com/uc?export=download&id=1xrT5q3yWjZRt_-V8xSXEEj8FEUKtqDLb");
            driver.executeScript("kobiton:startaudioinjection", audioParams);
            System.out.println("Audio injection started...");
            Thread.sleep(50000);

            // Poll audio injection status
            Object status = driver.executeScript("kobiton:pollaudioinjection");
            System.out.println("Audio injection status: " + status);

            // Stop recording
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Stop"))).click();
            System.out.println("Recording stopped!");

            // Stop audio injection
            driver.executeScript("kobiton:stopaudioinjection");
            System.out.println("Audio injection stopped.");

        } catch (MalformedURLException e) {
            System.out.println("Error: Invalid Kobiton server URL.");
        } catch (InterruptedException e) {
            System.out.println("Error: Script interrupted.");
        } catch (Exception e) {
            System.out.println("Error: An unexpected issue occurred - " + e.getMessage());
        } finally {
            if (driver != null) {
                driver.quit();
                System.out.println("Session ended.");
            }
        }
    }
}
