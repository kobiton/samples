import * as logger from '../../../framework/common/logger'

const waitingTime = 60000

export default class IosNativeAppTest {
  constructor(driver) {
    this._driver = driver
  }

  async executeIosNativeTest() {
    try {
      await this._driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath('//*[@name="UIKitCatalog"]', waitingTime)
        .click()
        .source()
        .sessionCapabilities()
        .setCommandTimeout(waitingTime)
        .getOrientation()
        .setOrientation('PORTRAIT')
        .sleep(1000)
        .setOrientation('LANDSCAPE')
        .sleep(1000)
        .setOrientation('PORTRAIT')
        .back()
    }
    catch (err) {
      logger.writeLog('Test support native iOS app is failed by:', err)
      throw err
    }
  }
}
