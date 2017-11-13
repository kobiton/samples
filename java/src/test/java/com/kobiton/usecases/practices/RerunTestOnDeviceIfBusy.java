/*
 * Created on Sep 26, 2017, 5:17:43 PM
 *
 * Copyright(c) 2017 Kobiton Company, Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */
package com.kobiton.usecases.practices;

import com.kobiton.usecases.*;
import io.appium.java_client.android.AndroidDriver;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class RerunTestOnDeviceIfBusy extends BaseTest {

    private AndroidDriver<WebElement> driver = null;

    @BeforeTest
    @Override
    public void Setup() throws Exception {
        super.Setup();

        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android App Test - Rerun test on device if busy");
        capabilities.setCapability("sessionDescription", "Kobiton sample session");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk");
        capabilities.setCapability("deviceName", "Galaxy J7");
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("platformVersion", "6.0.1");

        long pollingStartedAt = System.currentTimeMillis();
        long FIFTEEN_MINS = 15 * 60 * 1000;
        boolean continuePollingCheck = true;

        // The do {} while loop here is used for occupying the device until
        // either it's success or the timeout is reached
        do {
            try {
                driver = new AndroidDriver<>(getAutomationUrl(), capabilities);
                driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
                continuePollingCheck = false;
            } catch (org.openqa.selenium.SessionNotCreatedException e) {
                System.err.println("DEVICE BUSY!! RETRYING.");
                long attemptDuration = System.currentTimeMillis() - pollingStartedAt;

                // SessionNotCreatedException exception is thrown if the expected device
                // is unavailable
                if (attemptDuration > FIFTEEN_MINS) {
                    throw e;
                }
            }
            
            //Sleep 30s before retry
            sleep(30);
        } while (continuePollingCheck);
    }

    @AfterTest
    public void Teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test(description = "should verify Acura categories")
    public void testSearchQuestionsOnAcuraSupportCommunity() {
        /*
      * Steps:
      * 1. Click on "Car and Truck" Categories on Homepage
      * 2. Click on "Acura" Categories
      *
      * Expected:
      * General Information is "Acura".
         */
        driver.findElementByXPath("//*[@resource-id='android:id/home']").click();
        sleep(3);
        driver.findElementByXPath("//*[@text='Car and Truck']").click();
        driver.findElementByXPath("//*[@text='Acura']").click();
        sleep(3);
        String acuraText = driver.findElementByXPath("//*[@resource-id='com.dozuki.ifixit:id/topic_title' and @index=1]")
                .getText();

        Assert.assertEquals(acuraText, "Acura");
    }

    public void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            //Do nothing if sleep failed
        }
    }
}
