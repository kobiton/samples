import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import org.json.simple.JSONObject;

public class UIAutomator {
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
      jsonObject.put("sessionDescription", "This is an example for XCUITest testing");
      jsonObject.put("deviceName", "*");
      jsonObject.put("platformVersion", "*");
      jsonObject.put("deviceGroup", "KOBITON");
      jsonObject.put("app", "https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/6/XCUITestSample-cf0cae10-1f0e-11eb-bc6c-e3417e3453b3.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586603&Signature=OrqPAP8KJWapIuStzXmHwS28fNo%3D");
      jsonObject.put("testRunner", "https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/6/XCUITestSampleUITestRunner-e3ef3500-1f0e-11eb-b45a-478d7efceb5e.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586641&Signature=DDhYizx%2FdKMZyMe%2F5QEXx5gLoGs%3D");
      jsonObject.put("sessionTimeout", 30);
      jsonObject.put("testFramework", "XCUITEST");
      jsonObject.puit("tests", []);
      jsonObject.puit("testPlan","https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-plan/users/6/sample-fe1f27f0-1f0e-11eb-964e-0f0d0f83dd07.xctestplan?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586682&Signature=WESzuwFm55OqM4R4%2B8Zq0rD6TnA%3D");

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
