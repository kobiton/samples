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
		'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk', false)
	Mobile.waitForElementPresent(findTestObject('Android_app_objects/accessibility_menu'), 2)
}

@com.kms.katalon.core.annotation.TearDown
@com.kms.katalon.core.annotation.TearDownIfFailed
@com.kms.katalon.core.annotation.TearDownIfError
@com.kms.katalon.core.annotation.TearDownIfPassed
def tearDown(def param) {
	// Close application
	Mobile.closeApplication()
}

Mobile.tap(findTestObject('Android_app_objects/accessibility_menu'), 0)

// Verify accessibility screen

Mobile.verifyElementExist(findTestObject('Android_app_objects/accessibility_provider'), 2)

Mobile.verifyElementExist(findTestObject('Android_app_objects/accessibility_query'), 2)

Mobile.verifyElementExist(findTestObject('Android_app_objects/accessibility_service'), 2)

Mobile.verifyElementExist(findTestObject('Android_app_objects/accessibility_customView'), 2)

// Back to main menu

Mobile.pressBack()

Mobile.waitForElementPresent(findTestObject('Android_app_objects/accessibility_menu'), 2)

// Verify main menu

Mobile.verifyElementExist(findTestObject('Android_app_objects/accessibility_menu'), 2)

