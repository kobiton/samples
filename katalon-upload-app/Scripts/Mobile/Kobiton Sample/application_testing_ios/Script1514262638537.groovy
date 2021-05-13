import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory as CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable

@com.kms.katalon.core.annotation.SetUp
def setUp() {
	// Open application
	Mobile.startApplication(
		'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa', false)
	Mobile.waitForElementPresent(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/uiKitCatalog'), GlobalVariable.G_minTimeout)
}

@com.kms.katalon.core.annotation.TearDown
@com.kms.katalon.core.annotation.TearDownIfFailed
@com.kms.katalon.core.annotation.TearDownIfError
@com.kms.katalon.core.annotation.TearDownIfPassed
def tearDown(def param) {
	// Close application
	Mobile.closeApplication()
}

Mobile.tap(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/uiKitCatalog'), GlobalVariable.G_minTimeout)

// Verify UIKit Catalog Menu
Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/activity'), GlobalVariable.G_minTimeout)

Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_controller'), GlobalVariable.G_minTimeout)

Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/datePicker'), GlobalVariable.G_minTimeout)

Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/button'), GlobalVariable.G_minTimeout)

Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/imageView'), GlobalVariable.G_minTimeout)

// Go to Allert Controller
Mobile.waitForElementPresent(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_controller'), GlobalVariable.G_minTimeout)

Mobile.tap(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_controller'), GlobalVariable.G_minTimeout)

Mobile.waitForElementPresent(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_simple'), GlobalVariable.G_minTimeout)

// Verify Alert screen
Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_simple'), GlobalVariable.G_minTimeout)

Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_other'), GlobalVariable.G_minTimeout)

Mobile.verifyElementExist(findTestObject('Mobile/Kobiton Sample/IOS_app_objects/alert_textEntry'), GlobalVariable.G_minTimeout)


