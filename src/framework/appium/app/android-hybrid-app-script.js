import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'

const waitingTime = 60000
const androidHybridApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/selendroid-test-app.apk',
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
    desiredCap[0].autoGrantPermissions = true
    driver = await createDriver(desiredCap[0])
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
        .sleep(5000)
        .source()
        .waitForElementByXPath('//android.widget.EditText', waitingTime)
        .clear()
        .waitForElementByXPath('//android.widget.EditText', waitingTime)
        .getAttribute('enabled')
        .waitForElementByXPath('//android.widget.EditText', waitingTime)
        .sendKeys('test hybrid 1')

      if (await driver.isKeyboardShown()) { // eslint-disable-line babel/no-await-in-loop
        await driver.hideKeyboard()  // eslint-disable-line babel/no-await-in-loop
      }

      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementById('buttonStartWebview', waitingTime)
        .click()
        .sleep(5000)
        .contexts()
        .context('NATIVE_APP')
        .waitForElementByXPath('//*[@resource-id="io.selendroid.testapp:id/tableRowWebview"]', waitingTime) // eslint-disable-line max-len
        .contexts()
        .source()
        .waitForElementByXPath('//*[@text="Enter your name here!" or @content-desc="Enter your name here!"]') // eslint-disable-line max-len
        .click()
        .clear()
        .sendKeys('test hybrid 2')

      if (await driver.isKeyboardShown()) { // eslint-disable-line babel/no-await-in-loop
        await driver.hideKeyboard()  // eslint-disable-line babel/no-await-in-loop
      }

      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath('//android.widget.EditText')
        .getAttribute('enabled')
        .source()
        .hasElementByXPath('//*[resource-id="io.selendroid.testapp:id/tableRowWebview"]/android.webkit.WebView') // eslint-disable-line max-len
        .waitForElementByXPath("//android.widget.Button[@text='Send me your name!' or @content-desc='Send me your name!']") // eslint-disable-line max-len
        .click()
        .sleep(5000)
        .waitForElementByXPath("//android.widget.Button[@text='Go to home screen']")
        .click()
        .sleep(5000)

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

