package kobiton
import org.apache.commons.codec.binary.Base64
import org.json.*
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.annotation.Keyword

public class DeviceHelper {
  static String generateBasicAuth(AccountObject account) {
    String authString = "${account.username}:${account.apiKey}"
    byte[] authEncBytes = Base64.encodeBase64(authString.getBytes())
    String authStringEnc = new String(authEncBytes)
    return "Basic " + authStringEnc
  }

  static JSONObject filterDeviceInfo(JSONObject device) {
    JSONObject filteredDeviceInfo = new JSONObject();
    filteredDeviceInfo.put("id", device.get("id"));
    filteredDeviceInfo.put("udid", device.get("udid"));
    filteredDeviceInfo.put("isBooked", device.get("isBooked"))
    filteredDeviceInfo.put("isOnline", device.get("isOnline"))
    filteredDeviceInfo.put("modelName", device.get("modelName"))
    filteredDeviceInfo.put("deviceName", device.get("deviceName"))
    filteredDeviceInfo.put("platformName", device.get("platformName"))
    filteredDeviceInfo.put("platformVersion", device.get("platformVersion"))
    return filteredDeviceInfo
  }

  public JSONArray getOnlineCloudDevices(AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/devices?isOnline=true&isBooked=false");
      HttpURLConnection con = (HttpURLConnection) obj.openConnection();
      con.setRequestMethod("GET");
      con.setRequestProperty ("Authorization", generateBasicAuth(account));
      int responseCode = con.getResponseCode();

      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()));
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine);
      }
      inBr.close();

      if (responseCode != 200) {
        System.out.println(response.toString());
        System.exit(1);
      }

      JSONObject deviceList = new JSONObject(response.toString());
      JSONArray cloudDevices = deviceList.getJSONArray("cloudDevices");
      JSONArray filteredDeviceInfo = new JSONArray();

      for (int i = 0; i < cloudDevices.length(); i++) {
        boolean isBooked = cloudDevices.getJSONObject(i).getBoolean("isBooked");
        boolean isOnline = cloudDevices.getJSONObject(i).getBoolean("isOnline");
        if (isOnline && !isBooked) {
          filteredDeviceInfo.put(filterDeviceInfo(cloudDevices.getJSONObject(i)));
        }
      }

      return filteredDeviceInfo;
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

  public JSONArray getOnlinePrivateDevices(AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/devices?isOnline=true&isBooked=false");
      HttpURLConnection con = (HttpURLConnection) obj.openConnection();
      con.setRequestMethod("GET");
      con.setRequestProperty ("Authorization", generateBasicAuth(account));
      int responseCode = con.getResponseCode();

      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()));
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine);
      }
      inBr.close();

      if (responseCode != 200) {
        System.out.println(response.toString());
        System.exit(1);
      }

      JSONObject deviceList = new JSONObject(response.toString());
      JSONArray cloudDevices = deviceList.getJSONArray("privateDevices");
      JSONArray filteredDeviceInfo = new JSONArray();

      for (int i = 0; i < cloudDevices.length(); i++) {
        boolean isBooked = cloudDevices.getJSONObject(i).getBoolean("isBooked");
        boolean isOnline = cloudDevices.getJSONObject(i).getBoolean("isOnline");
        if (isOnline && !isBooked) {
          filteredDeviceInfo.put(filterDeviceInfo(cloudDevices.getJSONObject(i)));
        }
      }

      return filteredDeviceInfo;
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }
  @Keyword
  public JSONObject getOnlineCloudDevice(AccountObject account, String inputPlatform = 'android') {
    try {
      JSONArray cloudDevices = getOnlineCloudDevices(account);
      JSONArray filteredDeviceInfo = new JSONArray();

      for (int i = 0; i < cloudDevices.length(); i++) {
        if (cloudDevices.getJSONObject(i).getString('platformName').toLowerCase() == inputPlatform.toLowerCase()) {
          filteredDeviceInfo.put(filterDeviceInfo(cloudDevices.getJSONObject(i)))
          return filteredDeviceInfo.get(0)
        }
      }

      return filteredDeviceInfo.get(0)
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

  @Keyword
  public JSONObject getOnlinePrivateDevice(AccountObject account, String inputPlatform = 'android') {
    try {
      JSONArray privateDevices = getOnlinePrivateDevices(account);
      JSONArray filteredDeviceInfo = new JSONArray();

      for (int i = 0; i < privateDevices.length(); i++) {
        if (privateDevices.getJSONObject(i).getString('platformName').toLowerCase() == inputPlatform.toLowerCase()) {
          filteredDeviceInfo.put(filterDeviceInfo(privateDevices.getJSONObject(i)))
          return filteredDeviceInfo.get(0)
        }
      }

      return filteredDeviceInfo.get(0)
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }
  
  @Keyword
  public JSONObject getOnlineCloudDeviceWithVersion(AccountObject account, String inputVersion = '', String inputPlatform = 'android') {
    try {
      JSONArray cloudDevices = getOnlineCloudDevices(account);
      JSONArray filteredDeviceInfo = new JSONArray();

      for (int i = 0; i < cloudDevices.length(); i++) {
        if (cloudDevices.getJSONObject(i).getString('platformName').toLowerCase() == inputPlatform.toLowerCase() &&
          cloudDevices.getJSONObject(i).getString('platformVersion').toLowerCase().contains(inputVersion)) {
          filteredDeviceInfo.put(filterDeviceInfo(cloudDevices.getJSONObject(i)))
          return filteredDeviceInfo.get(0)
        }
      }

      return filteredDeviceInfo.get(0)
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }
}
