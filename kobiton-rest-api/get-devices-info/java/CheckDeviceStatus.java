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
    static Integer deviceId = Integer.parseInt(System.getenv("KOBITON_DEVICE_ID"));

    static String generateBasicAuth() {
        String authString = username + ":" + apiKey;
        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
        String authStringEnc = new String(authEncBytes);
        return "Basic " + authStringEnc;
    }

    static JSONObject getDeviceStatus() {
      try {
        URL obj = new URL("https://api.kobiton.com/v1/devices/" + deviceId + "/status");
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

        JSONObject deviceStatus = new JSONObject(response.toString());
        return deviceStatus;
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

      JSONObject deviceStatus = getDeviceStatus();
      Boolean isOnline = (Boolean)deviceStatus.get("isOnline");
      Boolean isBooked = (Boolean)deviceStatus.get("isBooked");

      if (isOnline == true && isBooked == false) {
        System.out.println("The device is ready to use");
      }
      else if (isOnline == true && isBooked == true) {
        System.out.println("The device is busy");
      }
      else {
        System.out.println("The device is offline");
      }
    }
}
