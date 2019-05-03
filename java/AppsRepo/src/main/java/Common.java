import com.google.gson.JsonObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.codec.binary.Base64;

public class Common {

    static String username = "";
    static String apiKey = "";

    static String generateBasicAuth() {
        String authString = username + ":" + apiKey;
        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
        String authStringEnc = new String(authEncBytes);
        return "Basic " + authStringEnc;
    }

    public static void createAnAppOrVersion(String filename, String appPath) {
        try {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("filename", filename);
            jsonObject.addProperty("appPath", appPath);

            URL uri = new URL("https://api.kobiton.com/v1/apps");
            HttpURLConnection con = (HttpURLConnection) uri.openConnection();

            con.setDoOutput(true);
            con.setDoInput(true);
            con.setUseCaches(false);

            String postData = jsonObject.toString();

            con.setRequestProperty("Authorization", generateBasicAuth());
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");

            OutputStream os = con.getOutputStream();
            os.write(postData.getBytes());
            os.flush();

            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }

            in.close();
            System.out.println("createAnAppOrVersion: " + response.toString());

            con.disconnect();
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public static String generateUploadURL(String filePath) {
        try {

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("filename", filePath);

            URL obj = new URL("https://api.kobiton.com/v1/apps/uploadUrl");
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setFixedLengthStreamingMode(jsonObject.toString().getBytes().length);
            con.setRequestProperty("Authorization", generateBasicAuth());

            OutputStream os = new BufferedOutputStream(con.getOutputStream());
            os.write(jsonObject.toString().getBytes());
            os.flush();

            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            String result = response.toString();
            System.out.println("generateUploadURL: " + result);
            return result;

        } catch (Exception ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    public static void uploadFileToS3(String filePath, String presignedUrl) {
        try {
            URLConnection urlconnection = null;
            File appFile = new File(filePath);
            URL url = new URL(presignedUrl);

            urlconnection = url.openConnection();
            urlconnection.setDoOutput(true);
            urlconnection.setDoInput(true);

            if (urlconnection instanceof HttpURLConnection) {
                ((HttpURLConnection) urlconnection).setRequestMethod("PUT");
                ((HttpURLConnection) urlconnection).setRequestProperty("Content-type", "application/octet-stream");
                ((HttpURLConnection) urlconnection).setRequestProperty("x-amz-tagging", "unsaved=true");
                ((HttpURLConnection) urlconnection).connect();
            }

            BufferedOutputStream bos = new BufferedOutputStream(urlconnection.getOutputStream());
            FileInputStream bis = new FileInputStream(appFile);
            int i;
            while ((i = bis.read()) != -1) {
                bos.write(i);
            }
            bis.close();

            System.out.println("uploadFileToS3:" + ((HttpURLConnection) urlconnection).getResponseMessage());

            InputStream inputStream;
            int responseCode = ((HttpURLConnection) urlconnection).getResponseCode();
            if ((responseCode >= 200) && (responseCode <= 202)) {
                inputStream = ((HttpURLConnection) urlconnection).getInputStream();
                int j;
                while ((j = inputStream.read()) > 0) {
                    System.out.println(j);
                }

            } else {
                inputStream = ((HttpURLConnection) urlconnection).getErrorStream();
            }
            ((HttpURLConnection) urlconnection).disconnect();

        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public static void deleteApp(int appId) {
        try {
            URL obj = new URL("https://api.kobiton.com/v1/apps/" + appId);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("DELETE");
            con.setRequestProperty("Authorization", generateBasicAuth());
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public static void deleteAppVersion(int appIdVersion) {
        try {
            URL obj = new URL("https://api.kobiton.com/v1/app/versions/" + appIdVersion);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("DELETE");
            con.setRequestProperty("Authorization", generateBasicAuth());
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public static void getApp(int appId) {
        try {
            URL obj = new URL("https://api.kobiton.com/v1/apps/" + appId);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", generateBasicAuth());
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public static void getAppVersion(int appIdVersion) {
        try {
            URL obj = new URL("https://api.kobiton.com/v1/app/versions/" + appIdVersion);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", generateBasicAuth());
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public static void getApps() {
        try {
            URL obj = new URL("https://api.kobiton.com/v1/apps");
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", generateBasicAuth());
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }


    public static void downloadFile(final String urlString, final String filename) {
        BufferedInputStream in = null;
        FileOutputStream fout = null;
        try {
            in = new BufferedInputStream(new URL(urlString).openStream());
            fout = new FileOutputStream(filename);

            final byte data[] = new byte[1024];
            int count;
            while ((count = in.read(data, 0, 1024)) != -1) {
                fout.write(data, 0, count);
            }

            if (in != null) {
                in.close();
            }
            if (fout != null) {
                fout.close();
            }
        } catch (Exception ex){
            ex.printStackTrace();
        }
    }

}
