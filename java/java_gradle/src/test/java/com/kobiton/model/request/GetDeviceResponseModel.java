/*
 * Created on Nov 9, 2017, 2:50:38 PM
 *
 * Copyright(c) 2017 Kobiton Inc.  All Rights Reserved.
 * This software is the proprietary information of Kobiton Company.
 *
 */

package com.kobiton.model.request;

import com.kobiton.model.Device;
import java.util.List;

public class GetDeviceResponseModel {
    private List<Device> privateDevices;
    private List<Device> favoriteDevices;
    private List<Device> cloudDevices;

    public List<Device> getPrivateDevices() {
        return privateDevices;
    }

    public void setPrivateDevices(List<Device> privateDevices) {
        this.privateDevices = privateDevices;
    }

    public List<Device> getFavoriteDevices() {
        return favoriteDevices;
    }

    public void setFavoriteDevices(List<Device> favoriteDevices) {
        this.favoriteDevices = favoriteDevices;
    }

    public List<Device> getCloudDevices() {
        return cloudDevices;
    }

    public void setCloudDevices(List<Device> cloudDevices) {
        this.cloudDevices = cloudDevices;
    }
    
    
}
