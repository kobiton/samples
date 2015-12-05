import com.kms.katalon.core.export.ExportTestCaseHelper as ExportTestCaseHelper
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

@com.kms.katalon.core.annotation.RequireAstTestStepTransformation
class script1449298190838 extends com.kms.katalon.core.export.ExportTestCaseScript { 

    static void main(java.lang.String[] args) {
        super.main(this, 'Test Cases/Commons/Navigation/Navigate_PrimaryEmail', '/Users/khanhdo/Desktop/KryptonExport/Krypton_20151205-134950', 'Firefox', null, 30)
    }

    def run() {
        'Click on Left Bar Menu'
        WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_LeftBarMenu'), FailureHandling.STOP_ON_FAILURE)
        'delay'
        WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
        'Click on Primary link'
        WebUiBuiltInKeywords.click(ObjectRepository.findTestObject('Object Repository/MainPage/btn_Primary'), FailureHandling.STOP_ON_FAILURE)
        'delay'
        WebUiBuiltInKeywords.delay(GlobalVariable.WAIT, FailureHandling.STOP_ON_FAILURE)
    }

}
