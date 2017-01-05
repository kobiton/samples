import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import wd from 'wd'
import * as data from './data'

const testUrl = 'https://portal-test.kobiton.com/register'
const waitingTime = 30000

export async function runMobileWeb(server, onlineDevices, expectedDurationInMinutes) {
  const expectedDurationInSeconds = expectedDurationInMinutes * 60 // Convert minutes to seconds

  const jobs = onlineDevices
    .map((cap) => _launchMobileWeb(server, cap, expectedDurationInSeconds))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('run: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess(value) {
    return 1
  }

  function onError(err) {
    debug.error('run: error', err)
    return 0
  }

  return successCount
}

async function _launchMobileWeb(server, desiredCapabilities, expectedDuration) {
  let driver
  let duration = 0
  let startedAt, endedAt
  let result = 0
  try {
    startedAt = moment.utc()
    driver = await createDriver(server, desiredCapabilities)
    do {
      const searchTerm = data.generateTerm()
      await driver // eslint-disable-line babel/no-await-in-loop
        .get(`${testUrl}/`)
        .waitForElementByCss('#app [data-state= "hidden"]', waitingTime)
        .waitForElementByCss('input[name="name"]', waitingTime)
        .sendKeys(searchTerm)
        .elementByCss('input[name="username"]')
        .sendKeys(searchTerm)
        .elementByCss('input[name="email"]')
        .sendKeys(searchTerm)
        .elementByCss('input[name="password"]')
        .sendKeys(searchTerm)

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)

    const minutes = endedAt.diff(startedAt, 'minutes')
    debug.log('_launchMobileWeb: duration', `${minutes} minutes/session`)
  }
  finally {
    await quitDriver(driver)
    result = 1
  }
  return result
}

export async function runAndroidNativeApp(server, onlineDevices, expectedDurationInMinutes) {
  const expectedDurationInSeconds = expectedDurationInMinutes * 60 // Convert minutes to seconds

  const jobs = onlineDevices
    .map((cap) => _launchAndroidNativeApp(server, cap, expectedDurationInSeconds))
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

async function _launchAndroidNativeApp(server, desiredCapabilities, expectedDuration) {
  desiredCapabilities.browserName = ''
  desiredCapabilities = Object.assign(data.desiredCapabilitiesAndroidNativeApp, desiredCapabilities)
  let driver
  let duration = 0
  let startedAt, endedAt
  let result = 0
  try {
    startedAt = moment.utc()
    driver = await createDriver(server, desiredCapabilities)
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
        .status()
        .sessions()
        .sessionCapabilities()
        .altSessionCapabilities({'platformName': 'android'})
        .setCommandTimeout(waitingTime)
        .setImplicitWaitTimeout(waitingTime)
        .takeScreenshot()
        .saveScreenshot('native_android_screenshot.png')
        .elementByXPath("//*[@content-desc='Accessibility']")
        .click()
        .elementByXPath("//*[@content-desc='Accessibility Node Provider']")
        .click()
        .back()
        .elementByXPath("//android.widget.TextView[@content-desc='Accessibility Node Querying']")
        .click()
        .back()
        .elementByXPath("//android.widget.TextView[@content-desc='Accessibility Service']")
        .click()
        .back()
        .elementByXPath("//android.widget.TextView[@content-desc='Custom View']")
        .click()
        .back()
        .back()
        .getOrientation()
        .setOrientation('PORTRAIT')
        .setOrientation('LANDSCAPE')
        .setOrientation('PORTRAIT')
        .hasElementById('list')
        .elementById('list')
        .flick(0, -700, 200)
        .elementById('list')
        .flick(300, 700, 200)
        .getWindowSize()
        .logTypes()
        .currentContext()
        .sleep(1)
        .noop()
        .elementByXPath("//android.widget.TextView[@content-desc='Animation']")
        .click()
        .elementByXPath("//android.widget.TextView[@content-desc='Bouncing Balls']")
        .click()
        .elementById('container')
        .flick(getRandomInt(1, 1000), getRandomInt(-200, 200), getRandomInt(100, 1000))
        .sleep(5)
        .flick(getRandomInt(-200, 200), getRandomInt(-1000, 0), getRandomInt(100, 1000))
        .sleep(5)
        .back()
        .back()
      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)

    const minutes = endedAt.diff(startedAt, 'minutes')
    debug.log('_launchAndroidNativeApp: duration', `${minutes} minutes/session`)
  }
  finally {
    await quitDriver(driver)
    result = 1
  }
  return result
}

export async function runAndroidHybridApp(server, onlineDevices, expectedDurationInMinutes) {
  const expectedDurationInSeconds = expectedDurationInMinutes * 60 // Convert minutes to seconds

  const jobs = onlineDevices
    .map((cap) => _launchAndroidHybridApp(server, cap, expectedDurationInSeconds))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('runAndroidHybridApp: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess(value) {
    return 1
  }

  function onError(err) {
    debug.error('runAndroidHybridApp: error', err)
    return 0
  }

  return successCount
}

async function _launchAndroidHybridApp(server, desiredCapabilities, expectedDuration) {
  desiredCapabilities.browserName = ''
  desiredCapabilities = Object.assign(data.desiredCapabilitiesAndroidHybridApp, desiredCapabilities)
  let driver
  let duration = 0
  let startedAt, endedAt
  let result = 0
  const searchTerm = data.generateTerm()
  try {
    startedAt = moment.utc()
    driver = await createDriver(server, desiredCapabilities)
    do {
      await driver // eslint-disable-line babel/no-await-in-loop
        .elementById('my_text_field')
        .getAttribute('enabled')
        .elementById('my_text_field')
        .sendKeys(searchTerm)
        .hideKeyboard()
        .elementById('buttonStartWebview')
        .click()
        .source()
        .contexts()
        .elementById('name_input')
        .text()
        .elementById('name_input')
        .clear()
        .elementById('name_input')
        .sendKeys(searchTerm)
        .elementById('name_input')
        .getAttribute('enabled')
        .elementById('name_input')
        .text()
        .elementByXPath("//android.widget.Button[@content-desc='Send me your name!']")
        .click()
        .elementByXPath("//android.view.View[@content-desc='Your name is:']")
        .getAttribute('checked')
        .context('NATIVE_APP')
        .elementById('goBack')
        .click()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)

    const minutes = endedAt.diff(startedAt, 'minutes')
    debug.log('_launchAndroidHybridApp: duration', `${minutes} minutes/session`)
  }
  finally {
    await quitDriver(driver)
    result = 1
  }
  return result
}

export async function runiOSNativeApp(server, onlineDevices, expectedDurationInMinutes) {
  const expectedDurationInSeconds = expectedDurationInMinutes * 60 // Convert minutes to seconds

  const jobs = onlineDevices
    .map((cap) => _launchiOSNativeApp(server, cap, expectedDurationInSeconds))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('runiOSNativeApp: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess(value) {
    return 1
  }

  function onError(err) {
    debug.error('runiOSNativeApp: error', err)
    return 0
  }

  return successCount
}

async function _launchiOSNativeApp(server, desiredCapabilities, expectedDuration) {
  desiredCapabilities.browserName = ''
  desiredCapabilities = Object.assign(data.desiredCapabilitiesiOSNativeApp, desiredCapabilities)
  let driver
  let duration = 0
  let startedAt, endedAt
  let result = 0
  try {
    startedAt = moment.utc()
    driver = await createDriver(server, desiredCapabilities)
    do {
      //It takes a lot of time to query elements if we use xpath
      await driver // eslint-disable-line babel/no-await-in-loop
        .waitForElementByXPath('//*[@name="UIKitCatalog"]')
        .click()
        .status()
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
        .execute('mobile: scroll', [{direction: 'right'}])
        .back()
        .execute('mobile: scroll', [{direction: 'left'}])
        .back()
        .waitForElementByXPath('//UIATableView')
        .noop()
        // .flick(100, 300, 200) // Error code 13; Method has not yet been implemented
        .getWindowSize()
        .logTypes()
        .currentContext()
        .contexts()
        .context('NATIVE_APP')
        .waitForElementByXPath('//UIAStaticText[@name="Activity Indicators"]')
        .click()
        .back()
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
        // .setText('Kobiton') // Error code 13; Method has not yet been implemented
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

    const minutes = endedAt.diff(startedAt, 'minutes')
    debug.log('_launchiOSNativeApp: duration', `${minutes} minutes/session`)
  }
  finally {
    await quitDriver(driver)
    result = 1
  }
  return result
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
