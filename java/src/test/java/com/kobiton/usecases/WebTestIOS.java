/*
 * Created on Sep 26, 2017, 5:17:43 PM
 *
 * Copyright(c) 2017 Kobiton Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */
package com.kobiton.usecases;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class WebTestIOS extends BaseTest {

    private RemoteWebDriver driver = null;

    @BeforeTest
    @Override
    public void Setup() throws Exception {
        super.Setup();

        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "IOS Web Test");
        capabilities.setCapability("sessionDescription", "Kobiton sample session");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("browserName", "safari");
        capabilities.setCapability("deviceName", "iPhone 6");
        capabilities.setCapability("platformName", "iOS");

        driver = new RemoteWebDriver(getAutomationUrl(), capabilities);
    }

    @AfterTest
    public void Teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test(description = "should run test successfully with correct username and password")
    public void testLoginSuccessfully() {
        driver.get("http://google.com");
        WebElement searchFieldE = driver.findElementByXPath("//input[@name='q']");
        searchFieldE.sendKeys("Kobiton");
        searchFieldE.sendKeys(Keys.ENTER);
        driver.findElementByXPath("//a[@href='https://kobiton.com/']").click();
        String message = driver.findElementByXPath("//div[@class='intro-message']/h2").getText();

        Assert.assertTrue(message.contains("Real Devices in the Cloud, Better Testing for You"));
    }
}
