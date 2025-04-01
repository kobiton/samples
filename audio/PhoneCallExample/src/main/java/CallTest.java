// package com.example.appium
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.AppiumBy;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

public class CallTest {
    // Constants
    
    // REPLACE: <phone_number> with the phone number of the device you want to call. +1 is not needed for US number to US number calls
    private static final String PHONE_NUMBER = "<phone_number>"; // e.g. 1231234567
    // REPLACE: <audio_file_url> with the URL of the audio file you want to inject
    // Ensure the URL is accessible and points to a valid audio file (8 kHz, 16-bit, mono PCM WAV format)
    private static final String AUDIO_FILE_URL = "<audio_file_url>";
    private static final int AUDIO_INJECTION_DURATION_SECONDS = 30;

    public static void main(String[] args) {
        IOSDriver driver = null;

        try {
            // Set up capabilities
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities.setCapability("kobiton:device", "00008110-001119590C62801E"); // iPhone 14
            capabilities.setCapability("appium:deviceName", "iPhone14,4");
            // BLUETOOTH capability is set to true to enable Bluetooth for the call
            capabilities.setCapability("kobiton:bluetooth", true);
            capabilities.setCapability("appium:bundleId", "com.apple.mobilephone"); // Phone app
            capabilities.setCapability("appium:automationName", "XCUITest");
            capabilities.setCapability("kobiton:existingsession", "delete");
            capabilities.setCapability("appium:noReset", true);
            capabilities.setCapability("platformName", "iOS");
            capabilities.setCapability("kobiton:sessionName", "Streamlined Audio Injection Test - iPhone 14");
            capabilities.setCapability("kobiton:sessionDescription", "Calling Pixel 4 with audio injection - Streamlined");
            capabilities.setCapability("kobiton:deviceOrientation", "portrait");
            capabilities.setCapability("kobiton:captureScreenshots", true);
            capabilities.setCapability("appium:javascriptEnabled", true);

            // Initialize driver
            // REPLACE: <user_name>, <api_key>, <api_url> with your Kobiton credentials
            String kobitonServerUrl = "https://<user_name>:<api_key>c@<api_url>";
            driver = new IOSDriver(new URL(kobitonServerUrl), capabilities);
            System.out.println("Driver initialized successfully");

            // Create wait with appropriate timeout
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

            // Navigate to Keypad using accessibilityId (worked in logs)
            System.out.println("Navigating to Keypad...");
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Keypad"))).click();

            // Dial phone number
            System.out.println("Dialing phone number: " + PHONE_NUMBER);
            for (char digit : PHONE_NUMBER.toCharArray()) {
                wait.until(ExpectedConditions.elementToBeClickable(
                        AppiumBy.accessibilityId(String.valueOf(digit)))).click();
                System.out.println("Clicked digit: " + digit);
                Thread.sleep(200); // Small delay between digits for stability
            }

            // Initiate call using ACCEPT button (worked in logs)
            System.out.println("Initiating call...");
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("ACCEPT"))).click();
            System.out.println("Call initiated");

            // Wait for call connection
            System.out.println("Waiting for call to connect...");
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("End call")));
            System.out.println("Call connected successfully");

            // Start audio injection
            System.out.println("Starting audio injection...");
            Map<String, Object> audioParams = new HashMap<>();
            audioParams.put("url", AUDIO_FILE_URL);
            driver.executeScript("kobiton:startaudioinjection", audioParams);
            System.out.println("Audio injection started");

            // Wait for audio to play
            System.out.println("Waiting for audio to play for " + AUDIO_INJECTION_DURATION_SECONDS + " seconds");
            Thread.sleep(AUDIO_INJECTION_DURATION_SECONDS * 1000);

            // Poll audio injection status
            Object status = driver.executeScript("kobiton:pollaudioinjection");
            System.out.println("Audio injection status: " + status);
            /*
             * RETURNS:
             * { "state": "INITIALIZATION", "operationResult": { "success": true/false, "msg"="optional error message field" } }
             * { "state": "DOWNLOAD_START", "operationResult": { "success": true } } 
             * { "state": "DOWNLOAD_END", "operationResult": { "success": true/false } }
             * { "state": "INJECT_START", "operationResult": { "success": true } }
             * { "state": "INJECT_END", "operationResult": { "success": true/false } }
             * 
             * FALSE in any state means the audio injection failed or was stopped. 'msg' field is emitted when success is false.
             */

            // End the call using accessibilityId (worked in logs)
            System.out.println("Ending call...");
            wait.until(ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("End call"))).click();
            System.out.println("Call ended");

            // Stop audio injection
            System.out.println("Stopping audio injection...");
            driver.executeScript("kobiton:stopaudioinjection");
            System.out.println("Audio injection stopped");

        } catch (Exception e) {
            System.err.println("ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
                System.out.println("Session ended and resources cleaned up");
            }
        }
    }
}



