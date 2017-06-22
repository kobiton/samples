import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'

const waitingTime = 60000
const apiDemoDebugApp = {
  app: 'http://appium.github.io/appium/assets/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos'
}

export async function fullApisAndroidScript(timestamps, onlineDevice, expectedDuration) {
  const desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, apiDemoDebugApp, onlineDevice)
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    driver = await createDriver(desiredCap[0])
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
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
          driver
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
        .sleep(2)
      let hasEle = await driver.hasElementByXPath("//*[@content-desc='Accessibility']")
      if (!hasEle) {
        await driver
          .back()
          .waitForElementByXPath("//*[@content-desc='Accessibility']", waitingTime)
      }
      await driver
        .waitForElementByXPath("//*[@content-desc='Accessibility']", waitingTime)
        .waitForElementByXPath("//*[@content-desc='Accessibility']", waitingTime)
        .elementByXPath("//*[@content-desc='Accessibility']").text()
        .elementByXPath("//*[@content-desc='Accessibility']")
        .click()
        .back()
        .source()
        .hasElementById('list')
        .elementById('list')
        .flick(0, -700, 200)
        .elementById('list')
        .flick(300, 700, 200)
        .getWindowSize()
        .waitForElementByXPath("//*[@content-desc='Accessibility']", waitingTime)
        .type('Tab')
        .back()
        .back()
        .waitForElementByXPath("//android.widget.TextView[@content-desc='Animation']", waitingTime)
        .click()
        .waitForElementByXPath("//android.widget.TextView[@content-desc='Bouncing Balls']",
          waitingTime)
        .click()
        .elementById('container')
        .flick(getRandomInt(1, 1000),
          getRandomInt(-200, 200), getRandomInt(100, 1000))
        .sleep(5)
        .flick(getRandomInt(-200, 200),
          getRandomInt(-1000, 0), getRandomInt(100, 1000))
        .back()
        .back()
        .getOrientation()
        .setOrientation('PORTRAIT')
        .setOrientation('LANDSCAPE')
        .setOrientation('PORTRAIT')
        .openNotifications()
        .logTypes()
        .currentContext()
        .startActivity({
          appPackage: 'io.appium.android.apis',
          appActivity: '.accessibility.AccessibilityNodeProviderActivity'
        })
        .launchApp('com.android.chrome')
        .closeApp()
        .resetApp()
        .getSessionId()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error('full_apis_android', err)
    logger.writeLog('Script full apis android is failed by:', err)
    logger.writeFailure(desiredCap.deviceName, errorToJSON(err))
    throw err
  }
  finally {
    await quitDriver(driver)
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
