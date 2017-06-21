import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'

const waitingTime = 60000
const androidHybridApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/selendroid-test-app.apk',
  appPackage: 'io.selendroid.testapp',
  appActivity: 'HomeScreenActivity'
}

export async function androidHybridAppScript(timestamps, onlineDevice, expectedDuration) {
  const desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, androidHybridApp, onlineDevice)
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    driver = await createDriver(desiredCap[0])
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
      .elementById('my_text_field')
      .getAttribute('enabled')
      .waitForElementById('my_text_field', waitingTime)
      .sendKeys('test hybrid 1')
      .hideKeyboard()
      .waitForElementById('buttonStartWebview', waitingTime)
      .click()
      .source()
      .contexts()
      .context('NATIVE_APP') // here is in native app
      .waitForElementByXPath('//android.widget.TableRow', waitingTime)
      .click()
      .source()
      .waitForElementByXPath(
        "//android.widget.EditText[@content-desc='Enter your name here!']")
      .text()
      .waitForElementByXPath(
        "//android.widget.EditText[@content-desc='Enter your name here!']")
      .clear()
      .waitForElementByXPath("//android.widget.EditText[@content-desc='']")
      .sendKeys('test hybrid 2')
      .waitForElementByXPath("//android.widget.EditText[@content-desc='test hybrid 2']")
      .getAttribute('enabled')
      .waitForElementByXPath("//android.widget.Button[@content-desc='Send me your name!']")
      .click()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error('android_hybrid_app', err)
    logger.writeLog('Script android hybrid app is failed by:', err)
    logger.writeFailure(desiredCap.deviceName, errorToJSON(err))
    throw err
  }
  finally {
    await quitDriver(driver)
  }
}

