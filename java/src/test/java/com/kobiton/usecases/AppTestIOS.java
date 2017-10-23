/*
 * Created on Sep 26, 2017, 5:17:43 PM
 *
 * Copyright(c) 2017 Kobiton Company, Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */
package com.kobiton.usecases;

import io.appium.java_client.ios.IOSDriver;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class AppTestIOS extends BaseTest {

    private IOSDriver<WebElement> driver = null;

    @BeforeTest
    @Override
    public void Setup() throws Exception {
        super.Setup();

        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "iOS App Test");
        capabilities.setCapability("sessionDescription", "Kobiton sample session");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa");
        capabilities.setCapability("deviceName", "iPhone 6s");
        capabilities.setCapability("platformName", "iOS");

        driver = new IOSDriver<>(getAutomationUrl(), capabilities);
        driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
    }

    @AfterTest
    public void Teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test(description = "should allow to navigate to some devices on Acura Support Community")
    public void testNavigationOnAcuraSupportCommunity() {

        /*
      * Steps:
      * 1. Click on "Car and Truck" Categories on Homepage
      * 2. Click on "Acura" Categories
      *
      * Expected:
      * 1. General Information is "Acura".
      * 2.Verify Acura Integra displays.
         */
        driver.findElementByXPath("//XCUIElementTypeButton[@name='START A REPAIR']").click();
        sleep(2);
        driver.findElementByXPath("//*[@name='Car and Truck']").click();
        driver.findElementByXPath("//*[@name='Acura']").click();
        sleep(2);
        (new WebDriverWait(driver, 60))
                .until(ExpectedConditions.elementToBeClickable(By.xpath("//XCUIElementTypeNavigationBar")));

        String acuraText = driver.findElementByXPath("//XCUIElementTypeNavigationBar").getAttribute("name");
        boolean hasAcuraIntegra = driver.findElementByXPath("//XCUIElementTypeStaticText[@name='Acura Integra']")
                .isDisplayed();

        driver.closeApp();

        Assert.assertEquals(acuraText, "Acura");
        Assert.assertEquals(hasAcuraIntegra, true);
    }

    public void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            //Do nothing if sleep failed
        }
    }
}
