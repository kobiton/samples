/*
 * Created on Sep 26, 2017, 5:17:43 PM
 *
 * Copyright(c) 2017 Kobiton Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */
package com.kobiton.usecases.practices;

import com.kobiton.usecases.*;
import io.appium.java_client.android.AndroidDriver;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.concurrent.TimeUnit;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.Test;

public class RetrieveAutomationDetails extends BaseTest {
    
    @Test()
    public void testGetAllSessions() throws IOException {
        //API details: https://api.kobiton.com/docs/?java#get-sessions
        String url = String.format("https://%s/v1/sessions", getHostName());
        
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .header("Authorization", getAuthorization())
                .build();
        
        Response response = client.newCall(request).execute();
        
        Assert.assertNotNull(response.body(), "Response body is null");
        
        // responseBodyString is JSON format, you could parse to use it as your demand
        String responseBodyString = response.body().string();
        Assert.assertNotNull(responseBodyString, "Response body string is null");
    }
    
    @Test
    public void testGetSessionDetailAfterExecuteTest() throws MalformedURLException, IOException {
        AndroidDriver<WebElement> driver = executeSimpleAppTest();
        
        String kobitonSessionId = driver.getSessionDetails().get("kobitonSessionId").toString();
        
        String url = String.format("https://%s/v1/sessions/%s", getHostName(), kobitonSessionId);
        
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .header("Authorization", getAuthorization())
                .build();
        
        Response response = client.newCall(request).execute();
        Assert.assertNotNull(response.body(), "Response body is null");
        
        // responseBodyString is JSON format, you could parse to use it as your demand
        String responseBodyString = response.body().string();
        System.err.println("response body: " + responseBodyString);
        Assert.assertNotNull(responseBodyString, "Response body string is null");
    }

    private AndroidDriver<WebElement> executeSimpleAppTest() throws MalformedURLException {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("sessionName", "Android App Test");
        capabilities.setCapability("sessionDescription", "Kobiton sample session");
        capabilities.setCapability("deviceOrientation", "portrait");
        capabilities.setCapability("captureScreenshots", true);
        capabilities.setCapability("app", "https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk");
        capabilities.setCapability("deviceName", "Galaxy J7");
        capabilities.setCapability("platformName", "Android");
        
        AndroidDriver<WebElement> driver = new AndroidDriver<>(getAutomationUrl(), capabilities);
        
        try {
            driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
            driver.findElementByXPath("//*[@resource-id='android:id/home']").click();
        } catch (Exception e) {
            driver.quit();
            throw e;
        }
        
        return driver;
    }
}
