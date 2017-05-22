/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kobiton.service;

import com.google.gson.Gson;
import com.kobiton.config.Config;
import com.kobiton.service.model.Device;
import java.io.IOException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class DeviceService {

    public Device getOnlineDevice(String platformName) throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(String.format("%s/devices/bookable/%s/1", Config.getInstance().getTestServerUrl(), platformName))
                .header("token", Config.getInstance().getTestServerSecretKey())
                .build();

        Response response = client.newCall(request).execute();
        Device device = null;
        if (response.body() != null) {
            String resBodyString = response.body().string();
            Device[] devices = new Gson().fromJson(resBodyString, Device[].class);
            if (devices.length > 0) {
                device = devices[0];
            }
        }
        return device;
    }

}
