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
        .elementByXPath("//android.widget.TextView[@content-desc='App']")
        .sleep(10)
        .noop()
        .click()
        .elementByXPath("//android.widget.TextView[@content-desc='Activity']")
        .click()
        .flick(0, -700, 200)
        .flick(0, -700, 200)
        .elementByXPath("//android.widget.TextView[@content-desc='Soft Input Modes']")
        .click()
        .currentContext()
        .contexts()
        .context('NATIVE_APP')
        .availableIMEEngines()
        .activeIMEEngine()
        .deactivateIMEEngine()
        .activeIMEEngine()
        .sessions()
        .sessionCapabilities()
        .setCommandTimeout(waitingTime)
        .setImplicitWaitTimeout(waitingTime)
        .takeScreenshot()
        .saveScreenshot('screenshot.png')
        .back()
        .back()
        .back()
    }
    catch (err) {
      logger.writeLog('Test support native android app is failed by:', err)
      throw err
    }
  }
}
