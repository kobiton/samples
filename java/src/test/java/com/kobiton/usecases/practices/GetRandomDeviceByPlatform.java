/*
 * Created on Sep 26, 2017, 5:17:43 PM
 *
 * Copyright(c) 2017 Kobiton Company, Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */
package com.kobiton.usecases.practices;

import com.google.gson.Gson;
import com.kobiton.model.Device;
import com.kobiton.model.request.GetDeviceResponseModel;
import com.kobiton.usecases.*;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

public class GetRandomDeviceByPlatform extends BaseTest {

    @Test()
    public void testGetRandomDeviceByPlatform() throws IOException {
        String url = String.format("https://%s/v1/devices", getHostName());
        
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .header("Authorization", getAuthorization())
                .build();
        
        Response response = client.newCall(request).execute();
        
        Assert.assertNotNull(response.body(), "Response body is null");
        String responseBodyString = response.body().string();
        Assert.assertNotNull(responseBodyString, "Response body string is null");
        
        GetDeviceResponseModel responseModel = new Gson().fromJson(responseBodyString, GetDeviceResponseModel.class);
        List<Device> allDevices = responseModel.getCloudDevices();
        
        Assert.assertTrue(allDevices.size() > 0, "Device list is empty");
        
        Device androidDevice = getRandomDevice(allDevices, "Android");
        Assert.assertNotNull(androidDevice);
        Assert.assertEquals(androidDevice.getPlatformName(), "Android");
    }

    private Device getRandomDevice(List<Device> allDevices, String platform) {
        List<Device> devices = allDevices.stream()
                .filter(d -> platform.equalsIgnoreCase(d.getPlatformName()))
                .collect(Collectors.toList());
        
        int randomNumber = (int) (Math.random() % devices.size());
        return devices.get(randomNumber);
    }
}
