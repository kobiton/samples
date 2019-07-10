import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../common/logger'
import {createDriver, quitDriver} from '../driver'
import {convertToDesiredCapabilitiesApp, convertToLocalDesiredCapabilitiesApp} from '../helper'
import config from '../../config/test'

const waitingTime = 60000
const apiDemoDebugApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos'
}
const isRunningLocalhost = (config.environment === 'LOCAL')

export async function fullApisAndroidScript(timestamps, onlineDevice, expectedDuration) {
  let desiredCap
  if (isRunningLocalhost) {
    desiredCap = convertToLocalDesiredCapabilitiesApp(apiDemoDebugApp, onlineDevice)
  }
  else {
    desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, apiDemoDebugApp, onlineDevice)
  }
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    if (!isRunningLocalhost) {
      driver = await createDriver(desiredCap[0])
    }
    else {
      driver = await createDriver(desiredCap)
    }
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath("//android.widget.TextView[@content-desc='App']", waitingTime)
        .elementByXPath("//android.widget.TextView[@content-desc='App']")
        .noop()
        .click()
        .waitForElementByXPath("//android.widget.TextView[@content-desc='Activity']", waitingTime)
        .elementByXPath("//android.widget.TextView[@content-desc='Activity']")
        .click()
        .elementByXPath("//android.widget.TextView[@content-desc='Intent Activity Flags']")
        .flick(0, -700, 200)
        .flick(0, -700, 200)
        .elementByXPath("//android.widget.TextView[@content-desc='Soft Input Modes']")
        .click()
        .elementById('saved')
        .click()
        .isKeyboardShown()
        .hideDeviceKeyboard()
        .elementById('saved')
        .click()
        .clear()
        .type('Tab')
        .currentContext()
        .contexts()
        .context('NATIVE_APP')
        .availableIMEEngines()
        .activeIMEEngine()
        .deactivateIMEEngine()
        .activeIMEEngine()
        .elementByClassName('android.widget.TextView')
        .elementByClassNameOrNull('android.widget.TextView')
        .hideDeviceKeyboard()
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
      // eslint-disable-next-line babel/no-await-in-loop
      let hasEle = await driver.hasElementByXPath("//*[@content-desc='Accessibility']")
      if (!hasEle) {
        await driver // eslint-disable-line babel/no-await-in-loop
          .back()
          .waitForElementByXPath("//*[@content-desc='Accessibility']", waitingTime)
      }
      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath("//*[@content-desc='Accessibility']", waitingTime)
        .elementByXPath("//*[@content-desc='Accessibility']").text()
        .elementByXPath("//*[@content-desc='Accessibility']")
        .click()
        .back()
        .source()
        .hasElementById('android:id/list')
        .elementById('android:id/list')
        .flick(0, -700, 200)
        .elementById('android:id/list')
        .flick(300, 700, 200)
        .getWindowSize()
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
        .toggleData()
        .logTypes()
        .currentContext()
        .startActivity({
          appPackage: 'io.appium.android.apis',
          appActivity: '.accessibility.AccessibilityNodeProviderActivity'
        })
        .launchApp('com.android.chrome')
        .backgroundApp(10)
        .closeApp()
        .resetApp()
        .getSessionId()
        .getSupportedPerformanceDataTypes()
        .setNetworkConnection(2)
        .getNetworkConnection()
        .getDeviceTime()
        .pressKeycode(25)
        .toggleData()
        .toggleWiFi()
        .getAppStrings()
        .getCurrentPackage()
        .getCurrentActivity()
        .lockDevice()
        .setGeoLocation(10, 10, 10)
        .getGeoLocation()
        .configureHttp(10)
        .isAppInstalledOnDevice('io.appium.android.apis')
        .removeAppFromDevice('io.appium.android.apis')
        .execute('mobile: deviceInfo')
        .execute('mobile: performEditorAction', {action: 'previous'})

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

/**
supported api
  .getSupportedPerformanceDataTypes()
  .getNetworkConnection()
  .getDeviceTime()
  .toggleWiFi()
  .getAppStrings()
  .getCurrentPackage()
  .getCurrentActivity()
  .lockDevice()
  .setGeoLocation(lat, lon, alt)
  .getGeoLocation
  .setHttpTimeout(timeout)
  .configureHttp(opt)
  .openNotifications()
  .closeApp()
  .resetApp()
  .back()
  .availableIMEEngines()
  .sessionCapabilities()
  .toggleData()
  .isAppInstalledOnDevice(bundleId)
  .removeAppFromDevice(appId)
  .isKeyboardShown()
  .hideDeviceKeyboard()
  .pressKeycode()
  .toggleAirplaneMode()
  .backgroundApp()
  .setNetworkConnection()

unsupported api
  .installAppOnDevice(appPath)
  .rotateDevice()
  .shakeDevice()
  .isIMEActive()
  .setWindowSize()
  .windowSize()
  .setWindowPosition()
  .getWindowPosition()
  .forward()
  .refresh()
  .maximize()
  .setAsyncScriptTimeout()
**/
