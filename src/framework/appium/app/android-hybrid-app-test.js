import * as logger from '../../../framework/common/logger'

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
      .elementById('name_input')
      .text()
      .elementById('name_input')
      .clear()
      .elementById('name_input')
      .sendKeys('test hybrid 2')
      .elementById('name_input')
      .getAttribute('enabled')
      .elementById('name_input')
      .text()
      .elementByXPath("//android.widget.Button[@content-desc='Send me your name!']")
      .click()
      .elementByXPath("//android.view.View[@content-desc='Your name is:']")
      .getAttribute('checked')
      .context('HYBRID_APP')
      .elementById('goBack')
      .click()
    }
    catch(err) {
      logger.writeLog('Test support hybrid android app is failed by:', err)
    }
  }
}
