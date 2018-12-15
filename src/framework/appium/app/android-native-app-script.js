import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'

const apiDemoDebugApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
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
    desiredCap[0].automationName = 'Appium' // https://github.com/appium/appium-uiautomator2-server/pull/235
    driver = await createDriver(desiredCap[0])

    const getWindowSize = await driver.getWindowSize()
    const getHeight = getWindowSize.height
    const getWidth = getWindowSize.width

    await driver // eslint-disable-line babel/no-await-in-loop
        .source()
        .waitForElementByXPath("//android.widget.TextView[@content-desc='Animation']")
        .click()
        .sleep(1000)
        .elementByXPath("//android.widget.TextView[@content-desc='Bouncing Balls']")
        .click()
        .sleep(5000)

    do {

      const xSpeed = getRandomInt(0, getHeight)
      const ySpeed = getRandomInt(0, getWidth)

      await driver.flick(xSpeed, ySpeed, 200) // eslint-disable-line babel/no-await-in-loop
        .sleep(1000)

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
