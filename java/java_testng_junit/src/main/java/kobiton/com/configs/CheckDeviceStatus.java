package kobiton.com.configs;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.*;

public class CheckDeviceStatus {

    public static JSONObject filterDeviceInfo(JSONObject device) {
        JSONObject filteredDeviceInfo = new JSONObject();
        filteredDeviceInfo.put("id", device.get("id"));
        filteredDeviceInfo.put("udid", device.get("udid"));
        filteredDeviceInfo.put("isBooked", device.get("isBooked"));
        filteredDeviceInfo.put("isOnline", device.get("isOnline"));
        filteredDeviceInfo.put("modelName", device.get("modelName"));
        filteredDeviceInfo.put("deviceName", device.get("deviceName"));
        filteredDeviceInfo.put("platformName", device.get("platformName"));
        filteredDeviceInfo.put("platformVersion", device.get("platformVersion"));
        return filteredDeviceInfo;
    }

    public static JSONArray getOnlineDevices(String username, String apiKey, String deviceGroup) {

        try {
            URL obj = new URL("https://api.kobiton.com/v1/devices?isOnline=true&isBooked=false");
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", Configs.generateBasicAuth(username, apiKey));
            int responseCode = con.getResponseCode();

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            if (responseCode != 200) {
                System.exit(1);
            }

            JSONObject deviceList = new JSONObject(response.toString());
            JSONArray cloudDevices = deviceList.getJSONArray(deviceGroup);
            JSONArray filteredDeviceInfo = new JSONArray();

            for (int i = 0; i < cloudDevices.length(); i++) {
                boolean isBooked = cloudDevices.getJSONObject(i).getBoolean("isBooked");
                boolean isOnline = cloudDevices.getJSONObject(i).getBoolean("isOnline");
                if (isOnline && !isBooked) {
                    filteredDeviceInfo.put(filterDeviceInfo(cloudDevices.getJSONObject(i)));
                }
            }

            return filteredDeviceInfo;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static boolean fitlterDeviceOnlineByUDID(JSONArray devices, String udid) {
        boolean flag = false;
        if (udid.equals("*") && devices.length() > 0) return true;
        for (int i = 0; i < devices.length(); i++) {
            String data = devices.getJSONObject(i).getString("udid");
            if (data.equals(udid)) {
                System.out.println(data);
                flag = true;
                break;
            }
        }
        return flag;
    }
}
