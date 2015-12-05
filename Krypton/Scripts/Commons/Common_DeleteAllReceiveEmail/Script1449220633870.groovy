import com.kms.katalon.core.export.ExportTestCaseHelper as ExportTestCaseHelper
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

@com.kms.katalon.core.annotation.RequireAstTestStepTransformation
class script1449298190785 extends com.kms.katalon.core.export.ExportTestCaseScript { 

    static void main(java.lang.String[] args) {
        super.main(this, 'Test Cases/Commons/Common_DeleteAllReceiveEmail', '/Users/khanhdo/Desktop/KryptonExport/Krypton_20151205-134950', 'Firefox', null, 30)
    }

    def run() {
        getLeftBarMenuStatus = WebUiBuiltInKeywords.waitForElementPresent(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), GlobalVariable.DEFAULT_WAIT, FailureHandling.OPTIONAL)
        if (getLeftBarMenuStatus == true) {
            'Click on Left Bar Menu'
            WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), FailureHandling.STOP_ON_FAILURE)
            'delay'
            WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
        }
        'Click on Left Bar Menu'
        WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_Primary'), FailureHandling.STOP_ON_FAILURE)
        'delay'
        WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
        getItemsStatus = WebUiBuiltInKeywords.waitForElementPresent(ObjectRepository.findTestObject('Object Repository/SentEmailPage/chkbox_listitem'), GlobalVariable.WAIT, FailureHandling.OPTIONAL)
        if (getItemsStatus == true) {
            CustomKeywords.'com.kms.krypton.CustomKeywords.clickAllItems'(ObjectRepository.findTestObject('Object Repository/SentEmailPage/chkbox_listitem'), FailureHandling.STOP_ON_FAILURE)
            'delay'
            WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
            'Click on Delete Forever'
            WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/SentEmailDetailsPage/btn_DeleteEmail'), FailureHandling.STOP_ON_FAILURE)
            'delay'
            WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
        }
        'Get all subjects'
        getNoMailMsg = WebUiBuiltInKeywords.getText(ObjectRepository.findTestObject('Object Repository/PrimaryPage/lbl_NoEmail'), FailureHandling.STOP_ON_FAILURE)
        'Verify text \"You have no mail.\" displays.'
        CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getNoMailMsg, NoEmailMsg1, FailureHandling.STOP_ON_FAILURE)
        'Verify text \"Please enjoy your day!\" displays.'
        CustomKeywords.'com.kms.krypton.CustomKeywords.verifyTextContains'(getNoMailMsg, NoEmailMsg2, FailureHandling.STOP_ON_FAILURE)
    }

}
