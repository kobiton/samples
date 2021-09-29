
import com.google.gson.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;


public class Main {
    static  String filePath ="";
    static  String fileName ="";

    public static void main(String[] args) {
        if (filePath == null || filePath.trim().isEmpty() || fileName == null || fileName.trim().isEmpty()) {
            System.out.println("Failed to upload app to app repo because the 'filePath' or 'fileName' is null or empty");
            return;
        }

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
        int appId = 0;
        int versionId = 0;

        JsonElement appIdElement = jsonObject.get("appId");
        JsonElement versionIdElement = jsonObject.get("versionId");

        if (!(appIdElement instanceof JsonNull)) {
            appId = ((JsonPrimitive) appIdElement).getAsInt();
        }

        if (!(versionIdElement instanceof JsonNull)) {
            versionId = ((JsonPrimitive) versionIdElement).getAsInt();
        }

        System.out.println("Wait for few seconds to sync data");
        Common.sleep(3000);

        System.out.println("Step 4: Get App Info");
        if (appId > 0) {
            Common.getApp(appId);
        }

        if (versionId > 0) {
            Common.getAppVersion(versionId);
        }

        Common.getApps();
    }
}
