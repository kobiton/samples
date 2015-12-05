import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/StartUp'), [:], FailureHandling.STOP_ON_FAILURE)
'deleteAllCookies'
WebUiBuiltInKeywords.deleteAllCookies(FailureHandling.STOP_ON_FAILURE)
'refresh'
WebUiBuiltInKeywords.refresh(FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.SHORT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Call test case: Login with Gmail Account 1'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_Login'), ['EmailAddress' : GlobalVariable.GmailAddress1, 'Password' : GlobalVariable.GmailPassword], FailureHandling.STOP_ON_FAILURE)
'Call test case: Compose Email, send email from Gmail 1 to Gmail2'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_ComposeEmail'), ['Subject' : Subject, 'EmailAddressTo' : GlobalVariable.GmailAddress2, 'Body' : Body], FailureHandling.STOP_ON_FAILURE)
'Go to Sent Mail view'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Navigation/Navigate_SentEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Verify Sent Email is saved on \"Sent Mail\" folder'
'Get all subjects'
getAllSentEmail = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/SentEmailPage/list_SentEmail'), FailureHandling.STOP_ON_FAILURE)
'Verify the subject is the same'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getAllSentEmail, Subject, FailureHandling.STOP_ON_FAILURE)
'Verify the body is the same'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getAllSentEmail, Body, FailureHandling.STOP_ON_FAILURE)
'Click on the first Email'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/SentEmailPage/lbl_SentEmailHeader'), FailureHandling.STOP_ON_FAILURE)
'Call test case VerifyDetailEmail'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_VerifyDetailEmail'), ['Subject' : Subject, 'EmailTo' : GlobalVariable.GmailAddress2, 'EmailSent' : GlobalVariable.GmailAddress1, 'Body' : Body], FailureHandling.STOP_ON_FAILURE)
'Click Back link to come back previous view'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/btn_BackToSentMail'), FailureHandling.STOP_ON_FAILURE)
'Call test case Delete All Sent Email'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_DeleteAllSentEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Call test case Clean Trash'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_CleanTrash'), [:], FailureHandling.STOP_ON_FAILURE)
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/TearDown'), [:], FailureHandling.STOP_ON_FAILURE)
