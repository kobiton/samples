import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

getDetailsButtonStatus = WebUiBuiltInKeywords.waitForElementPresent(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/btn_Details'), GlobalVariable.DEFAULT_WAIT, FailureHandling.STOP_ON_FAILURE)
if (getDetailsButtonStatus == true) {
    'Click Details button'
    WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/btn_Details'), FailureHandling.STOP_ON_FAILURE)
    'delay'
    WebUiBuiltInKeywords.delay(5, FailureHandling.STOP_ON_FAILURE)
}
'get Email Subject text'
getEmailSubject = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/lbl_EmailSubject'), FailureHandling.STOP_ON_FAILURE)
'get Email To'
getEmailTo = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/lbl_ToEmail'), FailureHandling.STOP_ON_FAILURE)
'get Email Sent'
getEmailSent = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/lbl_SentEmail'), FailureHandling.STOP_ON_FAILURE)
'get Email Body'
getEmailBody = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/lbl_Body'), FailureHandling.STOP_ON_FAILURE)
'Verify subject is the same.'
WebUiBuiltInKeywords.verifyMatch(getEmailSubject, Subject, false, FailureHandling.CONTINUE_ON_FAILURE)
'Verify To user is the same.'
WebUiBuiltInKeywords.verifyMatch(getEmailTo, EmailTo, false, FailureHandling.CONTINUE_ON_FAILURE)
'Verify Sent user is the same.'
WebUiBuiltInKeywords.verifyMatch(getEmailSent, EmailSent, false, FailureHandling.CONTINUE_ON_FAILURE)
'Verify body is the same.'
WebUiBuiltInKeywords.verifyMatch(getEmailBody, Body, false, FailureHandling.CONTINUE_ON_FAILURE)
