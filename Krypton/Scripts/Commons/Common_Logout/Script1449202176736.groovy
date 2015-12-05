import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

getLeftBarMenuStatus = WebUiBuiltInKeywords.waitForElementPresent(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), GlobalVariable.WAIT, FailureHandling.OPTIONAL)
if(getLeftBarMenuStatus==true){
	'Click on Left Bar Menu'
	WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), FailureHandling.STOP_ON_FAILURE)
}
'Click on Email Address'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/lbl_emailAdrress'), FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
'Click Sign Out button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_SignOut'), FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.SHORT_WAIT, FailureHandling.STOP_ON_FAILURE)
