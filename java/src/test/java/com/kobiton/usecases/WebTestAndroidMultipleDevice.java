/*
 * Created on Sep 26, 2017, 5:17:43 PM
 *
 * Copyright(c) 2017 Kobiton Company, Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */
package com.kobiton.usecases;

import java.net.MalformedURLException;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class WebTestAndroidMultipleDevice extends BaseTest {

    private RemoteWebDriver driver = null;

    @DataProvider(name = "devices")
    public Object[][] createData() {
        DesiredCapabilities firstCaps = new DesiredCapabilities();
        firstCaps.setCapability("sessionName", "Android Web Test 2 devices parallel");
        firstCaps.setCapability("sessionDescription", "Kobiton sample session");
        firstCaps.setCapability("deviceOrientation", "portrait");
        firstCaps.setCapability("captureScreenshots", true);
        firstCaps.setCapability("browserName", "chrome");
        firstCaps.setCapability("deviceName", "Galaxy J7");
        firstCaps.setCapability("platformName", "Android");

        DesiredCapabilities secondCaps = new DesiredCapabilities();
        secondCaps.setCapability("sessionName", "Android Web Test 2 devices parallel");
        secondCaps.setCapability("sessionDescription", "Kobiton sample session");
        secondCaps.setCapability("deviceOrientation", "portrait");
        secondCaps.setCapability("captureScreenshots", true);
        secondCaps.setCapability("browserName", "chrome");
        secondCaps.setCapability("deviceName", "Galaxy S6");
        secondCaps.setCapability("platformName", "Android");

        return new Object[][]{
            new Object[]{firstCaps},
            new Object[]{secondCaps}
        };
    }

    @AfterTest
    public void Teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test(priority = 1, description = "should create driver successfully", dataProvider = "devices")
    public void createDriver(Capabilities capabilities) throws MalformedURLException {
        driver = new RemoteWebDriver(getAutomationUrl(), capabilities);
    }

    @Test(priority = 2, description = "should run test successfully with correct username and password")
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
