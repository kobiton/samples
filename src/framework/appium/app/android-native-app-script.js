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

export async function androidNativeAppScript(timestamps, onlineDevice, expectedDuration) {
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
        .waitForElementByXPath("//android.widget.TextView[@content-desc='App']",
          waitingTime)
        .click()
        .waitForElementByXPath("//android.widget.TextView[@content-desc='Activity']", waitingTime)
        .elementByXPath("//android.widget.TextView[@content-desc='Activity']")
        .click()
        .sleep(10)
        .flick(0, -700, 200)
        .flick(0, -700, 200)
        .back()
        .back()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error('android_native_app', err)
    logger.writeLog('Script android native app is failed by:', err)
    logger.writeFailure(desiredCap.deviceName, errorToJSON(err))
    throw err
  }
  finally {
    await quitDriver(driver)
  }
}
