import * as logger from '../../../framework/common/logger'

const waitingTime = 60000

export default class AndroidNativeAppTest {
  constructor(driver) {
    this._driver = driver
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async executeAndroidNativeTest() {
    try {
      await this._driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath("//android.widget.TextView[@content-desc='App']", waitingTime)
        .click()
        .waitForElementByXPath("//android.widget.TextView[@content-desc='Activity']", waitingTime)
        .elementByXPath("//android.widget.TextView[@content-desc='Activity']")
        .click()
        .sleep(10)
        .flick(0, -700, 200)
        .flick(0, -700, 200)
        .back()
        .back()
    }
    catch (err) {
      logger.writeLog('Test support native android app is failed by:', err)
      throw err
    }
  }
}
