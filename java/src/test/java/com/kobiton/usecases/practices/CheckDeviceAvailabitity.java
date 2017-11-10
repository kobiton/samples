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

public class CheckDeviceAvailabitity extends BaseTest {

    @Test()
    public void testCheckDeviceAvailabitity() throws IOException {
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
        
        List<Device> devices = getDevicesBy(allDevices, "Galaxy J7");
        boolean deviceAvailable = devices.stream()
                .filter(d -> d.isIsOnline() && !d.isIsBooked())
                .collect(Collectors.toList())
                .size() > 0;
       
        Assert.assertTrue(deviceAvailable, "All Galaxy J7 is busy");
    }

    private List<Device> getDevicesBy(List<Device> allDevices, String deviceName) {
        List<Device> devices = allDevices.stream()
                .filter(d -> deviceName.equalsIgnoreCase(d.getDeviceName()))
                .collect(Collectors.toList());
        
        return devices;
    }
}
