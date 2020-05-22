package kobiton.com.configs;

import org.json.JSONArray;

public class Utils {
    public static void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static boolean waitForDevice(String deviceGroup, String udid) {
        int loop = 120;
        int start = 0;
        boolean flag = false;
        while(start < loop) {
            JSONArray onlineDevices = CheckDeviceStatus.getOnlineDevices(Configs.USERNAME, Configs.ACCESS_KEY, deviceGroup);
            if(CheckDeviceStatus.fitlterDeviceOnlineByUDID(onlineDevices, udid) == true) {
                flag = true;
                break;
            } else {
                sleep(1);
                start++;
            }
        }

        return flag;
    }
}
