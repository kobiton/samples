import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'

const waitingTime = 60000
const uiKitCatalogApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/UIKitCatalog-Test-115.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog'
}

export async function iOSNativeAppScript(timestamps, onlineDevice, expectedDuration) {
  const desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, uiKitCatalogApp, onlineDevice)
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    driver = await createDriver(desiredCap[0])
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
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

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error('ios_native_app', err)
    logger.writeLog('Script iOS native app is failed by:', err)
    logger.writeFailure(desiredCap.deviceName, errorToJSON(err))
    throw err
  }
  finally {
    await quitDriver(driver)
  }
}
