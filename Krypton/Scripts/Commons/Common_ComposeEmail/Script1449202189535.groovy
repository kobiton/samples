import com.kms.katalon.core.export.ExportTestCaseHelper as ExportTestCaseHelper
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

@com.kms.katalon.core.annotation.RequireAstTestStepTransformation
class script1449298190763 extends com.kms.katalon.core.export.ExportTestCaseScript { 

    static void main(java.lang.String[] args) {
        super.main(this, 'Test Cases/Commons/Common_ComposeEmail', '/Users/khanhdo/Desktop/KryptonExport/Krypton_20151205-134950', 'Firefox', null, 30)
    }

    def run() {
        'Click on Compose button'
        WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_Compose'), FailureHandling.STOP_ON_FAILURE)
        'delay'
        WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
        'Enter email to email textbox'
        WebUiBuiltInKeywords.setText(ObjectRepository.findTestObject('Object Repository/ComposePage/txt_ComposeTo'), EmailAddressTo, FailureHandling.STOP_ON_FAILURE)
        'Enter Subject to Subject textbox'
        WebUiBuiltInKeywords.setText(ObjectRepository.findTestObject('Object Repository/ComposePage/txt_Subject'), Subject, FailureHandling.STOP_ON_FAILURE)
        'Click on Body'
        WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/ComposePage/txt_Body'), FailureHandling.STOP_ON_FAILURE)
        'Enter Body to Body textbox'
        WebUiBuiltInKeywords.setText(ObjectRepository.findTestObject('Object Repository/ComposePage/txt_Body'), Body, FailureHandling.STOP_ON_FAILURE)
        'Click on Send button'
        WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/ComposePage/btn_Send'), FailureHandling.STOP_ON_FAILURE)
        'delay'
        WebUiBuiltInKeywords.delay(GlobalVariable.DEFAULT_WAIT, FailureHandling.STOP_ON_FAILURE)
    }

}
