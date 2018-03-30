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
	WebUI.openBrowser('http://the-internet.herokuapp.com/login')

	WebUI.waitForElementPresent(findTestObject('Heroku_web/username'), 10)
}

@com.kms.katalon.core.annotation.TearDown
def tearDown() {
	// Exit session
	WebUI.closeBrowser()
}

// Test case 1: should return error when we input wrong username

WebUI.sendKeys(findTestObject('Heroku_web/username'), 'foo')

WebUI.sendKeys(findTestObject('Heroku_web/password'), 'SuperSecretPassword!')

WebUI.submit(findTestObject('Heroku_web/form_login'))

WebUI.verifyTextPresent('Your username is invalid!', false)

// Test case 2: should return error when we input wrong password

WebUI.sendKeys(findTestObject('Heroku_web/username'), 'tomsmith')

WebUI.sendKeys(findTestObject('Heroku_web/password'), 'SuperSecretPassword')

WebUI.submit(findTestObject('Heroku_web/form_login'))

WebUI.verifyTextPresent('Your password is invalid!', false)

// Test case 3: should run test successfully with correct username and password

WebUI.sendKeys(findTestObject('Heroku_web/username'), 'tomsmith')

WebUI.sendKeys(findTestObject('Heroku_web/password'), 'SuperSecretPassword!')

WebUI.submit(findTestObject('Heroku_web/form_login'))

WebUI.verifyTextPresent('You logged into a secure area!', false)
