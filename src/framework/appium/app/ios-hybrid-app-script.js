import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'

const waitingTime = 60000
const iOSHybridApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/HybridIOSApp.ipa',
  bundleId: 'org.sample.hybridiosapp'
}

export async function iOSHybridAppScript(timestamps, onlineDevice, expectedDuration) {
  const desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, iOSHybridApp, onlineDevice)
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    driver = await createDriver(desiredCap[0])
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
         // Get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
        .contexts().then((contexts) => {
          return driver.context(contexts[1])
        })
        // Do some web testing
        .waitForElementByCss('input#bookmark', waitingTime)
        .clear()
        .sendKeys('test hybrid')
        .waitForElementByCss('button#bookmarkBtn', waitingTime)
        .click()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error('ios_hybrid_app', err)
    logger.writeLog('Script iOS hybrid app is failed by:', err)
    logger.writeFailure(desiredCap.deviceName, errorToJSON(err))
    throw err
  }
  finally {
    await quitDriver(driver)
  }
}

