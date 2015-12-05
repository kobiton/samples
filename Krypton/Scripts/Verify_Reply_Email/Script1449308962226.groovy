import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
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
'Verify Gmail 2 receives a new email from Gmail1'
'Call test case: Login with Gmail Account 2'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_Login'), ['EmailAddress' : GlobalVariable.GmailAddress2, 'Password' : GlobalVariable.GmailPassword], FailureHandling.STOP_ON_FAILURE)
'Navigate to Primary view'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Navigation/Navigate_PrimaryEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Get all subjects'
getAllRecivedEmail = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/PrimaryPage/list_ReceivedEmail'), FailureHandling.STOP_ON_FAILURE)
'Verify the subject is the same'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getAllRecivedEmail, Subject, FailureHandling.STOP_ON_FAILURE)
'Verify the body is the same'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getAllRecivedEmail, Body, FailureHandling.STOP_ON_FAILURE)
'Click on the first Email'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/PrimaryPage/lbl_ReceivedEmailHeader'), FailureHandling.STOP_ON_FAILURE)
'Call test case VerifyDetailEmail'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_VerifyDetailEmail'), ['Subject' : Subject, 'EmailTo' : GlobalVariable.GmailAddress2, 'EmailSent' : GlobalVariable.GmailAddress1, 'Body' : Body], FailureHandling.STOP_ON_FAILURE)
'Click Reply button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/btn_Reply'), FailureHandling.STOP_ON_FAILURE)
'Click Send button'
WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/ReplyPage/btn_Send'), FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
'Click Primary button to back previous page'
CustomKeywords.'com.kms.krypton.CustomKeywords.clickFirstItem'(ObjectRepository.findTestObject('Object Repository/ReplyPage/btn_BackPrimary'), FailureHandling.STOP_ON_FAILURE)
'Verify Delete All Emails'
'Call test case Delete All Received Email'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_DeleteAllReceiveEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Call test case Delete All Sent Email'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_DeleteAllSentEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Call test case Clean Trash'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_CleanTrash'), [:], FailureHandling.STOP_ON_FAILURE)
'Call test case Logout Gmail Account2'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_Logout'), [:], FailureHandling.STOP_ON_FAILURE)
'Verify Gmail 1 get the new Gmail2 after Gmail 2 replied to Gmail1'
'deleteAllCookies'
WebUiBuiltInKeywords.deleteAllCookies(FailureHandling.STOP_ON_FAILURE)
'refresh'
WebUiBuiltInKeywords.refresh(FailureHandling.STOP_ON_FAILURE)
'delay'
WebUiBuiltInKeywords.delay(GlobalVariable.SHORT_WAIT, FailureHandling.STOP_ON_FAILURE)
'Call test case: Login with Gmail Account 1'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_Login'), ['EmailAddress' : GlobalVariable.GmailAddress1, 'Password' : GlobalVariable.GmailPassword], FailureHandling.STOP_ON_FAILURE)
'Navigate to Primary view'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Navigation/Navigate_PrimaryEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Get all subjects'
getAllRecievedEmail = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/PrimaryPage/list_ReceivedEmail'), FailureHandling.STOP_ON_FAILURE)
'Verify the subject is the same'
CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getAllRecievedEmail, Subject, FailureHandling.STOP_ON_FAILURE)
'Call test case Delete All Received Email'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_DeleteAllReceiveEmail'), [:], FailureHandling.STOP_ON_FAILURE)
'Call test case Clean Trash'
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/Common_CleanTrash'), [:], FailureHandling.STOP_ON_FAILURE)
MobileBuiltInKeywords.callTestCase(TestCaseFactory.findTestCase('Test Cases/Commons/TearDown'), [:], FailureHandling.STOP_ON_FAILURE)
