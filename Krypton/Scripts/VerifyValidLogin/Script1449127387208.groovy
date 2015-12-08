import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

'deleteAllCookies'
WebUiBuiltInKeywords.deleteAllCookies(FailureHandling.STOP_ON_FAILURE)
'refresh'
WebUiBuiltInKeywords.refresh(FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.SHORT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Call test case: Login'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_Login'), ['EmailAddress' : GlobalVariable.GmailAddress1, 'Password' : GlobalVariable.GmailPassword], FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.DEFAULT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Verify Left Bar Menu exists.'
WebUiBuiltInKeywords.verifyElementPresent(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), GlobalVariable.LONG_WAIT, FailureHandling.STOP_ON_FAILURE)
'Verify Compose button exists.'
WebUiBuiltInKeywords.verifyElementPresent(ObjectRepository.findTestObject('Object Repository/MainPage/btn_Compose'), GlobalVariable.LONG_WAIT, FailureHandling.STOP_ON_FAILURE)
'Click on Left Bar Menu'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
'Get Email Address'
getEmailAddress = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/MainPage/lbl_emailAdrress'), FailureHandling.STOP_ON_FAILURE)
'Verify email exists.'
WebUiBuiltInKeywords.verifyMatch(getEmailAddress, GlobalVariable.GmailAddress1, false, FailureHandling.STOP_ON_FAILURE)