import BPromise from 'bluebird'
import * as logger from '../../../framework/common/logger'

export default class IosHybridAppTest {
  constructor(driver) {
    this._driver = driver
  }

  async executeIosHybridTest() {
    try {
      await this._driver // eslint-disable-line babel/no-await-in-loop
        // Get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
        .contexts().then((contexts) => {
          return this._driver.context(contexts[1])
        })
        // Do some web testing
        .waitForElementByCss('input#bookmark')
        .clear()
        .sendKeys('test hybrid')
        .waitForElementByCss('button#bookmarkBtn')
        .click()
      }
    catch(err) {
      logger.writeLog('Test support hybrid iOS app is failed by:', err)
    }
  }
}
