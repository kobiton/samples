import com.google.gson.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;


public class Main {

    static  String filePath ="com.dozuki.ifixit.apk";
    static  String fileName ="iFixit.apk";

    public static void main(String[] args) {

        System.out.println("If you want to use your app at local, please comment the downloadFile() method");
        Common.downloadFile("https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/com.dozuki.ifixit.apk", "com.dozuki.ifixit.apk");
        System.out.println("Step 1: Generate Upload URL");

        File file = new File(filePath);
        filePath = file.getAbsolutePath();

        String jsonData = Common.generateUploadURL(fileName);
        JsonObject jsonObject =(JsonObject) (new JsonParser()).parse(jsonData);

        String appPath = jsonObject.getAsJsonPrimitive("appPath").getAsString();
        String appURL = jsonObject.getAsJsonPrimitive("url").getAsString();

        System.out.println("Step 2: Upload file to S3");

        Common.uploadFileToS3(filePath, appURL);

        System.out.println("Step 3: Create an app or app version");
        String appResult = Common.createAnAppOrVersion(fileName, appPath);

        jsonObject =(JsonObject) (new JsonParser()).parse(appResult);
        int appId = jsonObject.getAsJsonPrimitive("appId").getAsInt();
        int versionId = jsonObject.getAsJsonPrimitive("versionId").getAsInt();

        System.out.println("Wait for few seconds to sync data");
        Common.sleep(3000);

        System.out.println("Step 4: Get App Info");
        Common.getApp(appId);
        Common.getAppVersion(versionId);
        Common.getApps();

        System.out.println("Step 5: Remove App");
//        Common.deleteAppVersion(versionId);
//        Common.deleteApp(appId);
    }
}
