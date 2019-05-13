import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {errorToJSON} from '../../util'
import * as logger from '../../../framework/common/logger'
import {createDriver, quitDriver} from '../../appium/driver'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'
import wd from 'wd'

const waitingTime = 60000
const uiKitCatalogApp = {
  app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog'
}

export async function fullApisIosScript(timestamps, onlineDevice, expectedDuration) {
  const desiredCap = convertToDesiredCapabilitiesApp(
    timestamps, uiKitCatalogApp, onlineDevice)
  let driver
  let duration = 0
  let startedAt, endedAt
  try {
    startedAt = moment.utc()
    driver = await createDriver(desiredCap[0])
    do {
      // eslint-disable-next-line babel/no-await-in-loop
      const action = new wd.TouchAction(await driver)
      action.press({x: 0, y: 10})
      action.moveTo({x: 10, y: 10})
      await driver // eslint-disable-line babel/no-await-in-loop
      // eslint-disable-next-line max-len
        .performTouchAction(action) //To show the menu by swiping from left border of device to right side
        .status()
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
        .performTouchAction(action)
        .getWindowSize()
        .logTypes() //outputs: [ 'syslog', 'crashlog', 'performance', 'server' ]
        .currentContext()
        .contexts()
        .context('NATIVE_APP')
        .source()
        .waitForElementByName('Activity Indicators')
        .element('xpath', '//XCUIElementTypeStaticText[@name="Activity Indicators"]')
          .then(async (ele) => {
            await driver
            .isEnabled(ele)
            .isDisplayed(ele)
            .getAttribute(ele, 'name')
            .getLocationInView(ele)
            .getLocation(ele)
            .getTagName(ele)
            .getSize(ele)
          })
        .elements('xpath', '//XCUIElementTypeStaticText[@name="Activity Indicators"]')
        .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Activity Indicators"]')
        .noop()
        .elementOrNull('xpath', '//XCUIElementTypeStaticText')
        .waitForElementByName('Alert Controller')
        .click()
        .waitForElementByName('Text Entry')
        .click()
        .isKeyboardShown() 
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
        .execute('mobile: scroll', [{direction: 'down'}])
        .setAsyncScriptTimeout(waitingTime)
        .waitForElementByName('Text Fields')
        .click()
        .waitForElementByClassName('UIATextField')
        .sendKeys('Kobiton')
        .text()
        .waitForElementByClassName('UIATextField')
        .clear()
        .getClipboard()
        .hideKeyboard()
        .back()
        .backgroundApp(10)
        .waitForElementByName('Text View')
        .click()
        .back()
        .waitForElementByAccessibilityId('Toolbars')
        .click()
        .back()
        .execute('mobile: scroll', [{direction: 'down'}])
        .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Activity Indicators"]')
        .moveTo(200, 300)
        .lockDevice(1)
        .unlockDevice()
        .keys('Home')
        .log('syslog')
        .configureHttp({
          timeout: 120000, retries: 3, retryDelay: 10
        })
        .isLocked()
        .settings()
        .getAppStrings()
        .setGeoLocation(10, 10, 10)
        .launchApp()
        .resetApp()
        .closeApp()

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

/**
supported api
  .isKeyboardShown()                                                 
  .isDisplayed()                                                                                                           
  .setGeoLocation()                                          
  .backgroundApp()    
  .configureHttp()
  .closeApp()
  .back()
  .resetApp()
  .getAppStrings()
  .clear()
  .takeScreenshot()
  .saveScreenshot()
  .getOrientation()
  .getWindowSize()
  .currentContext()
  .hideKeyboard()
  
unsupported api
  .windowHandle()
  .toggleData()
  .toggleAirplaneMode()
  .toggleWiFi()
  .toggleLocationServices()
  .buttonDown() //Unhandled endpoint error
  .buttonUp() //Unhandled endpoint error
  .rotateDevice()
  .openNotifications()
  .type() //Unhandled endpoint error
  .active()
  .longPressKeycode()
  .availableIMEEngines()
  .activeIMEEngine()
  .deactivateIMEEngine()
  .getGeoLocation()                                                 
  .getNetworkConnection() 
  .window()
  .close()
  .getComputedCss()
  .pressKeycode(25) 
  .setClipboard()
  .getWindowPosition()
  .maximize()
  .setWindowSize()
  .windowName()
  .shake()
  .removeLocalStorageKey()
  .doubleClick()
  .flick()
  **/
 