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

export async function fullApisIosScript(timestamps, onlineDevice, expectedDuration) {
  const desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, uiKitCatalogApp, onlineDevice)
  console.log(desiredCap)
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    driver = await createDriver(desiredCap[0])
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath('//*[@name="UIKitCatalog"]')
        .click()
        .source()
        .sessions()
        .sessionCapabilities()
        .setCommandTimeout(waitingTime)
        .setImplicitWaitTimeout(waitingTime)
        .takeScreenshot()
        .saveScreenshot('native_ios_screenshot.png')
        .getOrientation()
        .setOrientation('PORTRAIT')
        .sleep(1000)
        .setOrientation('LANDSCAPE')
        .sleep(1000)
        .setOrientation('PORTRAIT')
        .execute('mobile: scroll', [{direction: 'down'}])
        .execute('mobile: scroll', [{direction: 'up'}])
        .getWindowSize()
        .logTypes()
        .currentContext()
        .contexts()
        .context('NATIVE_APP')
        .element('xpath', '//UIAStaticText[@name="Activity Indicators"]').then((ele) => {
          driver
          .isEnabled(ele)
          .isSelected(ele)
          .getAttribute(ele)
        })
        .elements('xpath', '//UIAStaticText[@name="Activity Indicators"]')
        .waitForElementByXPath('//UIAStaticText[@name="Activity Indicators"]')
        .noop()
        .back()
        .elementOrNull('xpath', '//UIAStaticTest')
        .waitForElementByName('Alert Controller')
        .click()
        .waitForElementByName('Text Entry')
        .click()
        .alertText()
        .acceptAlert()
        .waitForElementByName('Text Entry')
        .click()
        .dismissAlert()
        .back()
        .waitForElementByName('Buttons')
        .click()
        .waitForElementByName('X Button')
        .getSize()
        .back()
        .waitForElementByName('Date Picker')
        .click()
        .back()
        .waitForElementByName('Image View')
        .click()
        .back()
        .waitForElementByName('Page Control')
        .click()
        .back()
        .waitForElementByName('Picker View')
        .click()
        .back()
        .waitForElementByName('Progress Views')
        .click()
        .back()
        .waitForElementByName('Segmented Controls')
        .click()
        .back()
        .waitForElementByName('Sliders')
        .click()
        .back()
        .waitForElementByName('Stack Views')
        .click()
        .back()
        .waitForElementByName('Steppers')
        .click()
        .back()
        .execute('mobile: scroll', [{direction: 'down'}])
        .setAsyncScriptTimeout(waitingTime)
        .waitForElementByName('Switches')
        .click()
        .back()
        .waitForElementByName('Text Fields')
        .click()
        .waitForElementByClassName('UIATextField')
        .sendKeys('Kobiton')
        .text()
        .waitForElementByClassName('UIATextField')
        .clear()
        .hideKeyboard()
        .back()
        .waitForElementByName('Text View')
        .click()
        .back()
        .waitForElementByName('Web View')
        .click()
        .back()
        .execute('mobile: scroll', [{direction: 'down'}])
        .waitForElementByAccessibilityId('Search')
        .click()
        .back()
        .execute('mobile: scroll', [{direction: 'down'}])
        .waitForElementByAccessibilityId('Toolbars')
        .click()
        .back()
        .execute('mobile: scroll', [{direction: 'down'}])
        .waitForElementByName('Activity Indicators')
        .moveTo(200, 300)

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)
  }
  catch (err) {
    debug.error('full_apis_ios', err)
    logger.writeLog('Script full apis on ios is failed by:', err)
    logger.writeFailure(desiredCap.deviceName, errorToJSON(err))
    throw err
  }
  finally {
    await quitDriver(driver)
  }
}

