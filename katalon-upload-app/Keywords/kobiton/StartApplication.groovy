package kobiton
import org.json.JSONObject
import org.openqa.selenium.remote.DesiredCapabilities
import com.google.gson.Gson
import com.kms.katalon.core.annotation.Keyword
import com.kms.katalon.core.appium.driver.AppiumDriverManager
import com.kms.katalon.core.mobile.driver.MobileDriverType
import com.kms.katalon.core.util.KeywordUtil
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import io.appium.java_client.AppiumDriver

public class StartApplication extends DeviceHelper {
	private DesiredCapabilities cap = new DesiredCapabilities();
	private AppiumDriver<?> driver;

	@Keyword
	def startSessionCloudAndroid(String appId, AccountObject account){
		try {
			JSONObject deviceInfo = getOnlineCloudDevice(account)
			deviceInfo = generateCapsAndroid(deviceInfo, appId)
			cap = new Gson().fromJson(deviceInfo.toString(), HashMap.class);
			WebUI.comment("Start session for Android with: ${cap.toString()}")
			driver  = AppiumDriverManager.createMobileDriver(MobileDriverType.ANDROID_DRIVER, cap, new URL(account.serverUrl))
		}
		catch(Exception e) {
			e.printStackTrace()
			KeywordUtil.markFailedAndStop("Can't start new session with capabilities on Kobiton")
		}
	}

  @Keyword
  def startSessionCloudAndroidWithVersion(String appId, AccountObject account, String inputVersion = ''){
    try {
      JSONObject deviceInfo = getOnlineCloudDeviceWithVersion(account, inputVersion)
      deviceInfo     = generateCapsAndroid(deviceInfo, appId)
      cap = new Gson().fromJson(deviceInfo.toString(), HashMap.class);
      WebUI.comment("Start session for Android with: ${cap.toString()}")
      driver  = AppiumDriverManager.createMobileDriver(MobileDriverType.ANDROID_DRIVER, cap, new URL(account.serverUrl))
    }
    catch(Exception e) {
      e.printStackTrace()
      KeywordUtil.markFailedAndStop("Can't start new session with capabilities on Kobiton")
    }
  }
  
  @Keyword
  def startSessionCloudiOS(String appId, AccountObject account){
    try {
      JSONObject deviceInfo = getOnlineCloudDevice(account, 'ios')
      deviceInfo = generateCapsiOS(deviceInfo, appId)
      cap = new Gson().fromJson(deviceInfo.toString(), HashMap.class);
      WebUI.comment("Start session for iOS with: ${cap.toString()}")
      driver  = AppiumDriverManager.createMobileDriver(MobileDriverType.IOS_DRIVER, cap, new URL(account.serverUrl))
    }
    catch(Exception e) {
      KeywordUtil.markFailedAndStop("Can't start new session with capabilities on Kobiton")
    }
  }

  @Keyword
  def startSessionCloudiOSWithVersion(String appId, AccountObject account, String inputVersion = ''){
    try {
      JSONObject deviceInfo = getOnlineCloudDevice(account, inputVersion, 'ios')
      deviceInfo = generateCapsiOS(deviceInfo, appId)
      cap = new Gson().fromJson(deviceInfo.toString(), HashMap.class);
      WebUI.comment("Start session for iOS with: ${cap.toString()}")
      driver  = AppiumDriverManager.createMobileDriver(MobileDriverType.IOS_DRIVER, cap, new URL(account.serverUrl))
    }
    catch(Exception e) {
      KeywordUtil.markFailedAndStop("Can't start new session with capabilities on Kobiton")
    }
  }
  
  @Keyword
  def startSessionPrivateAndroid(String appId, AccountObject account){
    try {
      JSONObject deviceInfo = getOnlinePrivateDevice(account)
      deviceInfo     = generateCapsAndroid(deviceInfo, appId)
      cap = new Gson().fromJson(deviceInfo.toString(), HashMap.class);
      WebUI.comment("Start session for Android with: ${cap.toString()}")
      driver  = AppiumDriverManager.createMobileDriver(MobileDriverType.ANDROID_DRIVER, cap, new URL(account.serverUrl))
    }
    catch(Exception e) {
      KeywordUtil.markFailedAndStop("Can't start new session with capabilities on Kobiton")
    }
  }

	@Keyword
	def startSessionPrivateiOS(String appId, AccountObject account){
		try {
			JSONObject deviceInfo = getOnlinePrivateDevice(account, 'ios')
			deviceInfo = generateCapsiOS(deviceInfo, appId)
			cap = new Gson().fromJson(deviceInfo.toString(), HashMap.class);
			WebUI.comment("Start session for iOS with: ${cap.toString()}")
			driver  = AppiumDriverManager.createMobileDriver(MobileDriverType.IOS_DRIVER, cap, new URL(account.serverUrl))
		}
		catch(Exception e) {
			KeywordUtil.markFailedAndStop("Can't start new session with capabilities on Kobiton")
		}
	}

	static generateCapsAndroid(JSONObject device, String appId) {
		device.put("sessionName", "Automation test session from Katalon")
		device.put("sessionDescription", "Automation test session")
		device.put("deviceOrientation", "portrait")
		device.put("captureScreenshots", true)
		device.put("browserName", "chrome")
		device.put("autoGrantPermissions", true)
		device.put("app", appId)
	}

	static generateCapsiOS(JSONObject device, String appId) {
		device.put("sessionName", "Automation test session from Katalon")
		device.put("sessionDescription", "Automation test session")
		device.put("deviceOrientation", "portrait")
		device.put("captureScreenshots", true)
		device.put("browserName", "safari")
		device.put("app", appId)
	}
}
