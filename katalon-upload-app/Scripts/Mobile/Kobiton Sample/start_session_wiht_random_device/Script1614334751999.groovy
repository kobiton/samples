import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable
import kobiton.*

import org.json.JSONArray
import org.json.JSONObject
import org.openqa.selenium.Keys as Keys

//Get Kobiton Account
AccountObject account = new AccountObject(GlobalVariable.G_kobitonUsername, GlobalVariable.G_kobitonAPIKey, 
  GlobalVariable.G_kobitonAPIUrl, GlobalVariable.G_kobitonServerUrl)

//Start new session on Cloud Android Device
CustomKeywords.'kobiton.StartApplication.startSessionCloudAndroid'("https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk", account)

//Close application
Mobile.closeApplication()

//Start new session on Cloud iOS Device
CustomKeywords.'kobiton.StartApplication.startSessionCloudiOS'('https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa', account)

//Close application
Mobile.closeApplication()

//Start new session on Private Android Device
CustomKeywords.'kobiton.StartApplication.startSessionPrivateAndroid'("https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk", account)

//Close application
Mobile.closeApplication()

//Start new session on Private iOS Device
CustomKeywords.'kobiton.StartApplication.startSessionPrivateiOS'('https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa', account)

//Close application
Mobile.closeApplication()
