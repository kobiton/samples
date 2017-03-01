import * as logger from '../../../framework/common/logger'

const waitingTime = 30000

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
        .elementByXPath("//android.widget.TextView[@content-desc='App']")
        .waitForElementByXPath("//android.widget.TextView[@content-desc='App']", waitingTime)
        .sleep(10)
        .noop()
        .click()
        .elementByXPath("//android.widget.TextView[@content-desc='Activity']")
        .click()
        .flick(0, -700, 200)
        .flick(0, -700, 200)
        .elementByXPath("//android.widget.TextView[@content-desc='Soft Input Modes']")
        .click()
        .elementById('saved')
        .click()
        .clear()
        .hideKeyboard()
        .currentContext()
        .contexts()
        .context('NATIVE_APP')
        .availableIMEEngines()
        .activeIMEEngine()
        .deactivateIMEEngine()
        .activeIMEEngine()
        .elementByClassName('android.widget.TextView')
        .elementByClassNameOrNull('android.widget.TextView')
        .element('xpath', "//android.widget.TextView[@content-desc='Resize mode:']").then((ele) => {
          this._driver
          .isEnabled(ele)
          .isSelected(ele)
          .getAttribute(ele)
        })
        .elements('xpath', '//android.widget.TextView')
        .sessions()
        .sessionCapabilities()
        .setCommandTimeout(waitingTime)
        .setImplicitWaitTimeout(waitingTime)
        .takeScreenshot()
        .saveScreenshot('screenshot.png')
        .back()
        .back()
        .back()
        .elementByXPath("//*[@content-desc='Accessibility']").text()
        .waitForElementByXPath("//*[@content-desc='Accessibility']")
        .click()
        .back()
        .source()
        .hasElementById('list')
        .elementById('list')
        .flick(0, -700, 200)
        .elementById('list')
        .flick(300, 700, 200)
        .getWindowSize()
        .elementByXPath("//*[@content-desc='Accessibility']")
        .type('Tab')
        .back()
        .back()
        .elementByXPath("//android.widget.TextView[@content-desc='Animation']")
        .click()
        .elementByXPath("//android.widget.TextView[@content-desc='Bouncing Balls']")
        .click()
        .elementById('container')
        .flick(this.getRandomInt(1, 1000),
          this.getRandomInt(-200, 200), this.getRandomInt(100, 1000))
        .sleep(5)
        .flick(this.getRandomInt(-200, 200),
          this.getRandomInt(-1000, 0), this.getRandomInt(100, 1000))
        .back()
        .back()
        .getOrientation()
        .setOrientation('PORTRAIT')
        .setOrientation('LANDSCAPE')
        .setOrientation('PORTRAIT')
        .openNotifications()
        .logTypes()
        .currentContext()
        .getNetworkConnection()
        .setNetworkConnection(1)
        .startActivity({
          appPackage: 'io.appium.android.apis',
          appActivity: '.accessibility.AccessibilityNodeProviderActivity'
        })
        .launchApp('com.android.chrome')
        .closeApp()
        .resetApp()
        .backgroundApp(5)
        .getSessionId()

        /** List supported apis but we can not run in spite of our setting
          .lockDevice()
          .unlockDevice()
          .lock()
          .unlock()
          .toggleWiFiOnDevice()
          .toggleWiFi()
          .toggleLocationServicesOnDevice()
          .toggleLocationServices()
          .back()
          .toggleDataOnDevice()
          .back()
          .toggleData()
        **/

        /** TODO: List of unsupported apis
         .status()
         .altSessionCapabilities({'platformName': 'android'})
         .eval('window.location.href')
         .alertText()
         .dismissAlert()
         .session()
         .getAppStrings()
         .timeouts()
         .alertText()
         .session()
         .forward()
         .getWindowPosition()
         .setLocalStorageKey()
         .getLocalStorageKey()
         .activatedIMEEngine()
         .toggleWiFiOnDevice()
         .toggleWiFi()
         **/

    }
    catch (err) {
      logger.writeLog('Test support native android app is failed by:', err)
      throw err
    }
  }
}
