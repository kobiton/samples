import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

'delete All Cookies'
WebUiBuiltInKeywords.deleteAllCookies(FailureHandling.STOP_ON_FAILURE)
'refresh'
WebUiBuiltInKeywords.refresh(FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.SHORT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Click Next button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/HomePage/btn_Next'), FailureHandling.STOP_ON_FAILURE)
'delay 3 seconds'
WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
'Get error message'
getErrorMessage = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/MainPage/lbl_error_enter_email'), FailureHandling.STOP_ON_FAILURE)
'Verify message "Please enter your email." displays'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getErrorMessage, ErrorEnterEmail, FailureHandling.STOP_ON_FAILURE)
'Enter "wrongemailenterhere" to Email textbox'
WebUiBuiltInKeywords.setText(ObjectRepository.findTestObject('Object Repository/HomePage/txt_Email'), InvalidEmail, FailureHandling.STOP_ON_FAILURE)
'CLick Next button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/HomePage/btn_Next'), FailureHandling.STOP_ON_FAILURE)
'delay 3 seconds'
WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
'Get error message'
getErrorMessage = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/MainPage/lbl_error_enter_email'), FailureHandling.STOP_ON_FAILURE)
'Verify message "Sorry, Google doesn\'t recognize that email." displays'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getErrorMessage, ErrorWrongEmail, FailureHandling.STOP_ON_FAILURE)
