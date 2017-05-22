/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kobiton.config;

public class Config {

    private static final Config INSTANCE = new Config();

    public static final Config getInstance() {
        return INSTANCE;
    }

    private String apiUrl;
    private String testServerUrl;
    private String testServerSecretKey;

    private Config() {
        apiUrl = System.getenv("KOBITON_API_URL");
        testServerUrl = System.getenv("KOBITON_REPORT_SERVER_URL");
        testServerSecretKey = System.getenv("KOBITON_REPORT_SECRET_KEY");
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getTestServerUrl() {
        return testServerUrl;
    }

    public void setTestServerUrl(String testServerUrl) {
        this.testServerUrl = testServerUrl;
    }

    public String getTestServerSecretKey() {
        return testServerSecretKey;
    }

    public void setTestServerSecretKey(String testServerSecretKey) {
        this.testServerSecretKey = testServerSecretKey;
    }

}
