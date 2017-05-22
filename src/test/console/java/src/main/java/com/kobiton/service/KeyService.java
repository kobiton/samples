/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kobiton.service;

import com.google.gson.Gson;
import com.kobiton.config.Config;
import com.kobiton.service.model.APIKey;
import java.io.IOException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class KeyService {

    public APIKey getApiKey() throws IOException {
        String hostUrl = Config.getInstance().getTestServerUrl();
        String secretKey = Config.getInstance().getTestServerSecretKey();

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(hostUrl + "/api-keys")
                .header("token", secretKey)
                .build();

        Response response = client.newCall(request).execute();

        APIKey key = null;

        if (response.body() != null) {
            String responseBodyString = response.body().string();
            APIKey[] allKeys = new Gson().fromJson(responseBodyString, APIKey[].class);
            key = allKeys[0];
        }

        return key;
    }
}
