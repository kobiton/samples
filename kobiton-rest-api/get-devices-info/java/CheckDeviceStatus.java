import javax.xml.ws.Response;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import org.json.*;
import org.apache.commons.codec.binary.Base64;

public class CheckDeviceStatus {

    static String username = System.getenv("KOBITON_USERNAME");
    static String apiKey = System.getenv("KOBITON_APIKEY");

    static String generateBasicAuth() {
        String authString = username + ":" + apiKey;
        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
        String authStringEnc = new String(authEncBytes);
        return "Basic " + authStringEnc;
    }

    static JSONObject filterDeviceInfo(JSONObject device) {
      JSONObject filteredDeviceInfo = new JSONObject();
      filteredDeviceInfo.put("id", device.get("id"));
      filteredDeviceInfo.put("udid", device.get("udid"));
      filteredDeviceInfo.put("isBooked", device.get("isBooked"));
      filteredDeviceInfo.put("modelName", device.get("modelName"));
      filteredDeviceInfo.put("deviceName", device.get("deviceName"));
      filteredDeviceInfo.put("platformName", device.get("platformName"));
      filteredDeviceInfo.put("platformVersion", device.get("platformVersion"));
      return filteredDeviceInfo;
    } 

    static JSONArray getOnlineDevices() {
      try {
        URL obj = new URL("https://api.kobiton.com/v1/devices?isOnline=true");
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty ("Authorization", generateBasicAuth());
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
          System.out.println(response.toString());
          System.exit(1);
        }

        JSONObject deviceList = new JSONObject(response.toString());
        JSONArray cloudDevices = deviceList.getJSONArray("cloudDevices");
        JSONArray filteredDeviceInfo = new JSONArray();

        for (int i = 0; i < cloudDevices.length(); i++) {
          filteredDeviceInfo.put(filterDeviceInfo(cloudDevices.getJSONObject(i)));
        }

        return filteredDeviceInfo;
      }
      catch (Exception e) {
        e.printStackTrace();
      }

      return null;
    }

    public static void main(String[] args) {
      if (username == null || apiKey == null) {
        System.out.println("KOBITON_USERNAME and KOBITON_APIKEY variables are need to execute the script");
        System.exit(1);
      }

      JSONArray onlineDevices = getOnlineDevices();
      if (onlineDevices.length() == 0) {
        System.out.println("There is no online device");
      }
      else {
        System.out.println("Online device list: " + onlineDevices.toString(4));
      }
    }
}
