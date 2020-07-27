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
        String authString = username + ":" + apiKey;
        byte[] encodedBytes = Base64.getEncoder().encode(authString.getBytes());
        String authStringEnc = new String(encodedBytes);
        return "Basic " + authStringEnc;
    }

    public static void UIAutomatorTest() {
        try {
            List<String> tests = new ArrayList<String>();
            tests.add("ChangeTextBehaviorTest#testChangeText_sameActivity");
            tests.add("ChangeTextBehaviorTest");

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("sessionName", "UIAutomator/ Espresso Test");
            jsonObject.put("sessionDescription", "UIAutomator/ Espresso Test");
            jsonObject.put("deviceName", "*");
            jsonObject.put("deviceGroup", "KOBITON");
            jsonObject.put("app", "https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/quyen-lam-local/app-debug-KD.apk");
            jsonObject.put("testRunner", "https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/quyen-lam-local/test-runner/users/2/apps/app-debug-androidTest-KD-37c39f10-c64d-11ea-bf41-abbb0f21eb6d.apk?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1594827753&Signature=qHoWSD%2B%2FkxfxORJ9Wn2q%2BdTaVcM%3D");
            jsonObject.put("sessionTimeout", 60);
            jsonObject.put("testTimeout", 30);
            jsonObject.put("retryTimes", 3);
            jsonObject.put("continueWhenFail", true);
            jsonObject.put("tests", tests);
            jsonObject.put("testPackage", "");
            jsonObject.put("runnerClass", "");

            String url = "https://api.kobiton.com/hub/session";
            URL uri = new URL(url);
            HttpURLConnection con = (HttpURLConnection) uri.openConnection();

            con.setDoOutput(true);
            con.setDoInput(true);
            con.setUseCaches(false);

            JSONObject configuration = new JSONObject();
            configuration.put("configuration", jsonObject);

            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Authorization", generateBasicAuth());

            String postData = configuration.toString();
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
