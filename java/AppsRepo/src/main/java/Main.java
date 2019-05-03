
import com.google.gson.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;


public class Main {

    static int appId = 57;
    static  String filePath ="com.dozuki.ifixit.apk";
    static  String fileName ="iFixit";

    public static void main(String[] args) {

        System.out.println("If you want to use your app at local, please comment the downloadFile() method");
        Common.downloadFile("https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk", "com.dozuki.ifixit.apk");
        System.out.println("Step 1: Generate Upload URL");

        String jsonData = Common.generateUploadURL(filePath);
        JsonObject jsonObject =(JsonObject) (new JsonParser()).parse(jsonData);

        String appPath = jsonObject.getAsJsonPrimitive("appPath").getAsString();
        String appURL = jsonObject.getAsJsonPrimitive("url").getAsString();

        System.out.println("Step 2: Upload file to S3");

        Common. uploadFileToS3(filePath, appURL);

        System.out.println("Step 3: Create an app or app version");
        Common. createAnAppOrVersion(fileName, appPath);

        Common.getApps();
    }


}
