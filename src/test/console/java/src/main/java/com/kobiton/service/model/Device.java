/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kobiton.service.model;

public class Device {
    private String id;
    private String udid;
    private boolean isBooked;
    private boolean isOnline;
    private String modelName;
    private String deviceName;
    private String platformName;
    private String platformVersion;
    private boolean isFavorite;
    private boolean isCloud;
    private boolean isMyOrg;
    private boolean isMyOwn;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUdid() {
        return udid;
    }

    public void setUdid(String udid) {
        this.udid = udid;
    }

    public boolean isIsBooked() {
        return isBooked;
    }

    public void setIsBooked(boolean isBooked) {
        this.isBooked = isBooked;
    }

    public boolean isIsOnline() {
        return isOnline;
    }

    public void setIsOnline(boolean isOnline) {
        this.isOnline = isOnline;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getPlatformVersion() {
        return platformVersion;
    }

    public void setPlatformVersion(String platformVersion) {
        this.platformVersion = platformVersion;
    }

    public boolean isIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

    public boolean isIsCloud() {
        return isCloud;
    }

    public void setIsCloud(boolean isCloud) {
        this.isCloud = isCloud;
    }

    public boolean isIsMyOrg() {
        return isMyOrg;
    }

    public void setIsMyOrg(boolean isMyOrg) {
        this.isMyOrg = isMyOrg;
    }

    public boolean isIsMyOwn() {
        return isMyOwn;
    }

    public void setIsMyOwn(boolean isMyOwn) {
        this.isMyOwn = isMyOwn;
    }
}
