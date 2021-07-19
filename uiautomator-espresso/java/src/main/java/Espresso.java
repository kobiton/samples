import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.json.simple.JSONObject;

public class Espresso {
  public static void main(String[] args) {
    UIAutomatorTest();
  }

  public static String generateBasicAuth() {
    String username = "";
    String apiKey = "";
    byte[] encodedBytes = Base64.getEncoder().encode((username + ":" + apiKey).getBytes());
    String encodeAuth = new String(encodedBytes);
    return "Basic " + encodeAuth;
  }

  public static void UIAutomatorTest() {
    try {
      List<String> tests = new ArrayList<String>();
      tests.add("com.example.android.testing.uiautomator.BasicSample.test");
      tests.add("ChangeTextBehaviorTest");
      tests.add("ChangeTextBehaviorTest#testChangeText_sameActivity");

      JSONObject jsonObject = new JSONObject();
      jsonObject.put("sessionName", "Automation test session");
      jsonObject.put("sessionDescription", "This is an example for UIAutomator testing");
      jsonObject.put("deviceName", "*");
      jsonObject.put("deviceGroup", "KOBITON");
      jsonObject.put("app", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/espresso-app.apk");
      jsonObject.put("testRunner", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/esspresso-test-runner.apk");
      jsonObject.put("sessionTimeout", 30);
      jsonObject.put("testTimeout", 10);
      jsonObject.put("retryTimes", 3);
      jsonObject.put("continueWhenFail", true);
      jsonObject.put("tests", tests);

      String url = "https://api.kobiton.com/hub/session";
      URL uri = new URL(url);
      HttpURLConnection con = (HttpURLConnection) uri.openConnection();

      con.setDoOutput(true);
      con.setDoInput(true);
      con.setUseCaches(false);

      JSONObject configuration = new JSONObject();
      configuration.put("configuration", jsonObject);

      String postData = configuration.toString();

      con.setRequestMethod("POST");
      con.setRequestProperty("Content-Type", "application/json");
      con.setRequestProperty("Accept", "application/json");
      con.setRequestProperty("Authorization", generateBasicAuth());
      OutputStream os = con.getOutputStream();
      os.write(postData.getBytes());
      os.flush();

      BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = in.readLine()) != null) {
        response.append(inputLine);
      }

      in.close();
      con.disconnect();

      System.out.println("Result: " + response.toString());
    } catch (Exception ex) {
      System.out.println(ex.toString());
    }
  }
}
