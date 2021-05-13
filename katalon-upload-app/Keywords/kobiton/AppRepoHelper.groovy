package kobiton
import org.apache.commons.codec.binary.Base64
import com.google.gson.*
import com.kms.katalon.core.annotation.Keyword
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable

public class AppRepoHelper {
  @Keyword
  def uploadFileToKobitonPortal(String filePath, String fileName, AccountObject account, int timeout = 30) {
    WebUI.comment("Step 1: Generate Upload URL")

    File file = new File(filePath)
    filePath = file.getAbsolutePath()

    String jsonData = generateUploadURL(fileName, account)

    JsonParser parser = new JsonParser()
    def jsonDataParsed = parser.parse(jsonData)
    JsonObject jsonObject =(JsonObject) (jsonDataParsed)

    String appPath = jsonObject.getAsJsonPrimitive("appPath").getAsString()
    String appURL = jsonObject.getAsJsonPrimitive("url").getAsString()

    WebUI.comment("Step 2: Upload file to S3")

    uploadFileToS3(filePath, appURL)

    WebUI.comment("Step 3: Create an app or app version")
    String appResult = createAnAppOrVersion(fileName, appPath, account)

    jsonObject =(JsonObject) (new JsonParser()).parse(appResult)
    int appId = jsonObject.getAsJsonPrimitive("appId").getAsInt()
    int versionId = jsonObject.getAsJsonPrimitive("versionId").getAsInt()

    WebUI.comment("Wait for few seconds to sync data")
    sleep(timeout)

    WebUI.comment("Step 4: Make app private")
    makePrivateApp(appId, account)

    WebUI.comment("Step 5: Get App Info")
    getApp(appId, account)
    getAppVersion(versionId, account)
    getApps(account)
    GlobalVariable.G_appId = appId
    GlobalVariable.G_appVersion = versionId
  }

  @Keyword
  def removeAppAndAppVersion(int appId, int versionId, AccountObject account) {
    WebUI.comment("Remove App")
    deleteAppVersion(versionId, account);
    deleteApp(appId, account);
  }

  static String generateBasicAuth(AccountObject account) {
    String authString = "${account.username}:${account.apiKey}"
    byte[] authEncBytes = Base64.encodeBase64(authString.getBytes())
    String authStringEnc = new String(authEncBytes)
    return "Basic " + authStringEnc
  }

  public static String createAnAppOrVersion(String appPath, AccountObject account) {
    return createAnAppOrVersion("", appPath, account)
  }

  public static String createAnAppOrVersion(String filename, String appPath, AccountObject account) {
    try {
      JsonObject jsonObject = new JsonObject()
      if (filename != null && filename.length() > 0) {
        jsonObject.addProperty("filename", filename)
      }
      jsonObject.addProperty("appPath", appPath)

      URL uri = new URL("${account.apiUrl}/apps")
      HttpURLConnection con = (HttpURLConnection) uri.openConnection()

      con.setDoOutput(true)
      con.setDoInput(true)
      con.setUseCaches(false)

      String postData = jsonObject.toString()

      con.setRequestProperty("Authorization", generateBasicAuth(account))
      con.setRequestMethod("POST")
      con.setRequestProperty("Content-Type", "application/json")
      con.setRequestProperty("Accept", "application/json")

      OutputStream os = con.getOutputStream()
      os.write(postData.getBytes())
      os.flush()

      int responseCode = con.getResponseCode()
      BufferedReader inBr = new BufferedReader(new InputStreamReader(con.getInputStream()))

      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }

      inBr.close()
      con.disconnect()

      WebUI.comment("createAnAppOrVersion: " + response.toString())
      return response.toString()
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }

    return ""
  }

  public static String generateUploadURL(String filePath, AccountObject account) {
    return generateUploadURL(filePath, 0, account)
  }

  public static String generateUploadURL(String filePath, int appId, AccountObject account) {
    try {

      JsonObject jsonObject = new JsonObject()
      jsonObject.addProperty("filename", filePath)
      if (appId != 0) {
        jsonObject.addProperty("appId", appId)
      }

      URL obj = new URL("${account.apiUrl}/apps/uploadUrl")
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("POST")
      con.setDoInput(true)
      con.setDoOutput(true)
      con.setRequestProperty("Content-Type", "application/json")
      con.setRequestProperty("Accept", "application/json")
      con.setFixedLengthStreamingMode(jsonObject.toString().getBytes().length)
      con.setRequestProperty("Authorization", generateBasicAuth(account))

      OutputStream os = new BufferedOutputStream(con.getOutputStream())
      os.write(jsonObject.toString().getBytes())
      os.flush()

      int responseCode = con.getResponseCode()
      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      String result = response.toString()
      WebUI.comment("generateUploadURL: " + result)
      return result
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
      return null
    }
  }

  static String getFileSizeBytes(File file) {
    return file.length() + " bytes"
  }

  static void uploadFileToS3(String filePath, String presignedUrl) {
    try {
      URLConnection urlconnection = null
      File appFile = new File(filePath)
      URL url = new URL(presignedUrl)

      urlconnection = url.openConnection()
      urlconnection.setUseCaches(false)
      urlconnection.setDoOutput(true)
      urlconnection.setDoInput(true)

      if (urlconnection instanceof HttpURLConnection) {
        ((HttpURLConnection) urlconnection).setRequestMethod("PUT")
        ((HttpURLConnection) urlconnection).setRequestProperty("Content-Type", "application/octet-stream")
        ((HttpURLConnection) urlconnection).setRequestProperty("x-amz-tagging", "unsaved=true")
        ((HttpURLConnection) urlconnection).setRequestProperty("Content-Length", getFileSizeBytes(appFile))
        ((HttpURLConnection) urlconnection).connect()
      }

      BufferedOutputStream bos = new BufferedOutputStream(urlconnection.getOutputStream())
      FileInputStream bis = new FileInputStream(appFile)
      WebUI.comment("Total file size to read (in bytes) : " + bis.available())
      int i
      while ((i = bis.read()) != -1) {
        bos.write(i)
      }
      bos.close()
      bis.close()

      InputStream inputStream
      int responseCode = ((HttpURLConnection) urlconnection).getResponseCode()
      if ((responseCode >= 200) && (responseCode <= 202)) {
        inputStream = ((HttpURLConnection) urlconnection).getInputStream()
        int j
        while ((j = inputStream.read()) > 0) {
          WebUI.comment(j)
        }
      } else {
        inputStream = ((HttpURLConnection) urlconnection).getErrorStream()
      }
      ((HttpURLConnection) urlconnection).disconnect()
      WebUI.comment("uploadFileToS3: " + ((HttpURLConnection) urlconnection).getResponseMessage())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }

  static void deleteApp(int appId, AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/apps/" + appId)
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("DELETE")
      con.setRequestProperty("Authorization", generateBasicAuth(account))
      int responseCode = con.getResponseCode()
      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      WebUI.comment(response.toString())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }

  static void deleteAppVersion(int appIdVersion, AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/app/versions/${appIdVersion}")
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("DELETE")
      con.setRequestProperty("Authorization", generateBasicAuth(account))
      int responseCode = con.getResponseCode()
      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      WebUI.comment(response.toString())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }

  static void getApp(int appId, AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/apps/${appId}")
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("GET")
      con.setRequestProperty("Authorization", generateBasicAuth(account))
      int responseCode = con.getResponseCode()

      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      WebUI.comment("getApp: " + response.toString())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }

  static void getAppVersion(int appIdVersion, AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/app/versions/${appIdVersion}")
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("GET")
      con.setRequestProperty("Authorization", generateBasicAuth(account))
      int responseCode = con.getResponseCode()
      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      WebUI.comment("getAppVersion: " + response.toString())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }

  static void getApps(AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/apps")
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("GET")
      con.setRequestProperty("Authorization", generateBasicAuth(account))
      int responseCode = con.getResponseCode()
      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      WebUI.comment("getApps: " + response.toString())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }

  public static void downloadFile(final String urlString, final String filename) {
    BufferedInputStream inBr = null
    FileOutputStream fout = null
    try {
      inBr = new BufferedInputStream(new URL(urlString).openStream())
      fout = new FileOutputStream(filename)

      final def data = new byte[1024]
      int count
      while ((count = inBr.read(data, 0, 1024)) != -1) {
        fout.write(data, 0, count)
      }

      if (inBr != null) {
        inBr.close()
      }
      if (fout != null) {
        fout.close()
      }
    } catch (Exception ex) {
      ex.printStackTrace()
    }
  }

  static void sleep(int milliseconds) {
    try {
      Thread.sleep(milliseconds)
    } catch (Exception ex) {
      ex.printStackTrace()
    }
  }

  static void makePrivateApp(int appId, AccountObject account) {
    try {
      URL obj = new URL("${account.apiUrl}/apps/${appId}/private")
      HttpURLConnection con = (HttpURLConnection) obj.openConnection()
      con.setRequestMethod("PUT")
      con.setRequestProperty("Authorization", generateBasicAuth(account))
      int responseCode = con.getResponseCode()

      BufferedReader inBr = new BufferedReader(
          new InputStreamReader(con.getInputStream()))
      String inputLine
      StringBuffer response = new StringBuffer()
      while ((inputLine = inBr.readLine()) != null) {
        response.append(inputLine)
      }
      inBr.close()
      WebUI.comment("getApp: " + response.toString())
    } catch (Exception ex) {
      WebUI.comment(ex.toString())
    }
  }
}