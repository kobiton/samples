import BPromise from 'bluebird'
import {createDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import * as data from './data'

const waitingTime = 30000

export async function testiOSNativeApp(server, onlineDevices) {

  const jobs = onlineDevices
    .map((cap) => _launchiOSNativeApp(server, cap))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('testiOSNativeApp: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess(value) {
    return 1
  }

  function onError(err) {
    debug.error('testiOSNativeApp: error', err)
    return 0
  }

  return successCount
}

async function _launchiOSNativeApp(server, desiredCapabilities) {
  desiredCapabilities.browserName = ''
  desiredCapabilities = Object.assign(data.desiredCapabilitiesiOSNativeApp, desiredCapabilities)
  let driver
  try {
    driver = await createDriver(server, desiredCapabilities)
    await driver // eslint-disable-line babel/no-await-in-loop
      .waitForElementByXPath('//*[@name="UIKitCatalog"]')
      .click()
      .status()
      .source()
      .sessions()
      .sessionCapabilities()
      .altSessionCapabilities({'platformName': 'iOS'})
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
      .availableIMEEngines()
      .activeIMEEngine()
      .deactivateIMEEngine()
      .activeIMEEngine()
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

      /** TODO: List of unsupported apis
      .session()
      .forward()
      .getWindowPosition()
      .setLocalStorageKey()
      .getLocalStorageKey()
      .flick()
      .init()
      .isVisible()
      .shake()
      .active()
      .frame()
      .mazimize()
      .title()
      .availableIMEEngines()
      .activeIMEEngine()
      .deactivateIMEEngine()
      .windowHandle()
      .doDoubleClick()
      .execute('mobile: scroll', [{direction: 'right}])
      .execute('mobile: scroll', [{direction: 'left'}])
      **/
  }
  catch (err) {
    debug.error('Test support native  iOS app is failed by:', err)
  }
  finally {
    await driver.quit()
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
