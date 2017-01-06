import BPromise from 'bluebird'
import {createDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import * as data from './data'

const waitingTime = 30000

export async function testAndroidNativeApp(server, onlineDevices) {

  const jobs = onlineDevices
    .map((cap) => _launchAndroidNativeApp(server, cap))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('runAndroidNativeApp: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess(value) {
    return 1
  }

  function onError(err) {
    debug.error('runAndroidNativeApp: error', err)
    return 0
  }

  return successCount
}

async function _launchAndroidNativeApp(server, desiredCapabilities) {
  desiredCapabilities.browserName = ''
  desiredCapabilities = Object.assign(data.desiredCapabilitiesAndroidNativeApp, desiredCapabilities)
  let driver
  try {
    driver = await createDriver(server, desiredCapabilities)
    await driver // eslint-disable-line babel/no-await-in-loop
      .elementByXPath("//android.widget.TextView[@content-desc='App']")
      .sleep(10)
      .noop()
      .click()
      .elementByXPath("//android.widget.TextView[@content-desc='Activity']")
      .click()
      .flick(0, -700, 200)
      .flick(0, -700, 200)
      .elementByXPath("//android.widget.TextView[@content-desc='Soft Input Modes']")
      .click()
      .elementById('saved')
      .click()
      .clear()
      .hideKeyboard()
      .currentContext()
      .contexts()
      .context('NATIVE_APP')
      .availableIMEEngines()
      .activeIMEEngine()
      .deactivateIMEEngine()
      .activeIMEEngine()
      .elementByClassName('android.widget.TextView')
      .elementByClassNameOrNull('android.widget.TextView')
      .element('xpath', "//android.widget.TextView[@content-desc='Resize mode:']").then((ele) => {
        driver
        .isEnabled(ele)
        .isSelected(ele)
        .getAttribute(ele)
      })
      .elements('xpath', '//android.widget.TextView')
      .status()
      .sessions()
      .sessionCapabilities()
      .altSessionCapabilities({'platformName': 'android'})
      .setCommandTimeout(waitingTime)
      .setImplicitWaitTimeout(waitingTime)
      .takeScreenshot()
      .saveScreenshot('screenshot.png')
      .back()
      .back()
      .back()
      .elementByXPath("//*[@content-desc='Accessibility']").text()
      .waitForElementByXPath("//*[@content-desc='Accessibility']")
      .click()
      .back()
      .source()
      .hasElementById('list')
      .elementById('list')
      .flick(0, -700, 200)
      .elementById('list')
      .flick(300, 700, 200)
      .getWindowSize()
      .elementByXPath("//*[@content-desc='Accessibility']")
      .type('Tab')
      .back()
      .back()
      .elementByXPath("//android.widget.TextView[@content-desc='Animation']")
      .click()
      .elementByXPath("//android.widget.TextView[@content-desc='Bouncing Balls']")
      .click()
      .elementById('container')
      .flick(getRandomInt(1, 1000), getRandomInt(-200, 200), getRandomInt(100, 1000))
      .sleep(5)
      .flick(getRandomInt(-200, 200), getRandomInt(-1000, 0), getRandomInt(100, 1000))
      .back()
      .back()
      .getOrientation()
      .setOrientation('PORTRAIT')
      .setOrientation('LANDSCAPE')
      .setOrientation('PORTRAIT')
      .openNotifications()
      .logTypes()
      .currentContext()
      .lockDevice()
      .unlockDevice()
      .lock() // we must unlock Settings from device
      .unlock()
      .eval('window.location.href')
      .toggleWiFiOnDevice()
      .toggleWiFi()
      .getNetworkConnection()
      .setNetworkConnection(1)
      .toggleLocationServicesOnDevice()
      .toggleLocationServices()
      .back()
      .toggleDataOnDevice()
      .back()
      .toggleData()
      .toggleWiFiOnDevice()
      .toggleWiFi()
      .startActivity({
        appPackage: 'io.appium.android.apis',
        appActivity: '.accessibility.AccessibilityNodeProviderActivity'
      })
      .launchApp('com.android.chrome')
      .closeApp()
      .resetApp()
      .backgroundApp(5)
      .getSessionId()

      /** TODO: List of unsupported apis
       .alertText()
       .dismissAlert()
       .session()
       .getAppStrings()
       .timeouts()
       .alertText()
       .session()
       .forward()
       .getWindowPosition()
       .setLocalStorageKey()
       .getLocalStorageKey()
       .activatedIMEEngine()
       **/

  }
  catch (err) {
    debug.error('Test support native app is failed by:', err)
  }
  finally {
    await driver.quit()
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
