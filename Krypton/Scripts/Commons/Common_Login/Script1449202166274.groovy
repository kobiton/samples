import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

'delay 3 seconds'
WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
getLinkSignInDifferentAccountStatus = WebUiBuiltInKeywords.waitForElementPresent(ObjectRepository.findTestObject('Object Repository/MainPage/lnk_SignInDifferentAccount'), GlobalVariable.DEFAULT_WAIT, FailureHandling.OPTIONAL)
if (getLinkSignInDifferentAccountStatus == true) {
    'Click on Sign In with a different account link'
    WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/lnk_SignInDifferentAccount'), FailureHandling.STOP_ON_FAILURE)
    'Click Add Account button'
    WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_AddAccount'), FailureHandling.STOP_ON_FAILURE)
    'delay'
    WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
}
getAddAccountStatus = WebUiBuiltInKeywords.waitForElementPresent(ObjectRepository.findTestObject('Object Repository/MainPage/btn_AddAccount'), GlobalVariable.SHORT_WAIT, FailureHandling.OPTIONAL)
if (getAddAccountStatus == true) {
    'Click Add Account button'
    WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_AddAccount'), FailureHandling.STOP_ON_FAILURE)
    'delay'
    WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
}
'Enter email to email textbox'
WebUiBuiltInKeywords.setText(ObjectRepository.findTestObject('Object Repository/HomePage/txt_Email'), EmailAddress, FailureHandling.STOP_ON_FAILURE)
'Click Next button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/HomePage/btn_Next'), FailureHandling.STOP_ON_FAILURE)
'delay 10 seconds'
WebUiBuiltInKeywords.delay(GlobalVariable.DEFAULT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Enter password to password textbox'
WebUiBuiltInKeywords.setText(ObjectRepository.findTestObject('Object Repository/HomePage/txt_Password'), Password, FailureHandling.STOP_ON_FAILURE)
'Click Sign In button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/HomePage/btn_SignIn'), FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.DEFAULT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Navigate to homepage'
WebUiBuiltInKeywords.navigateToUrl(GlobalVariable.GMAIL_URL, FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.DEFAULT_WAIT, FailureHandling.STOP_ON_FAILURE)
