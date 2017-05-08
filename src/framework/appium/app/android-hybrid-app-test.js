import * as logger from '../../../framework/common/logger'
import {debug} from '@kobiton/core-util'

export default class AndroidHybridAppTest {
  constructor(driver) {
    this._driver = driver
  }

  async executeAndroidHybridTest() {
    try {
      await this._driver // eslint-disable-line babel/no-await-in-loop
      .elementById('my_text_field')
      .getAttribute('enabled')
      .elementById('my_text_field')
      .sendKeys('test hybrid 1')
      .hideKeyboard()
      .elementById('buttonStartWebview')
      .click()
      .source()
      .contexts()
      .context('NATIVE_APP') // here is in native app
      .elementByXPath('//android.widget.TableRow')
      .click()
      .source()
      .elementByXPath("//android.widget.EditText[@content-desc='Enter your name here!']")
      .text()
      .elementByXPath("//android.widget.EditText[@content-desc='Enter your name here!']")
      .clear()
      .elementByXPath("//android.widget.EditText[@content-desc='']")
      .sendKeys('test hybrid 2')
      .elementByXPath("//android.widget.EditText[@content-desc='test hybrid 2']")
      .getAttribute('enabled')
      .elementByXPath("//android.widget.Button[@content-desc='Send me your name!']")
      .click()
    }
    catch (err) {
      debug.error('android_hybrid_app', err)
      logger.writeLog('Test support hybrid android app is failed by:', err)
      throw err
    }
  }
}
