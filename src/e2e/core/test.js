import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import * as data from './data'

const testUrl = 'https://portal-test.kobiton.com/register'
const waitingTime = 30000

export async function run(server, onlineDevices, expectedDurationInMinutes) {
  const expectedDurationInSeconds = expectedDurationInMinutes * 60 // Convert minutes to seconds

  const jobs = onlineDevices
    .map((cap) => _launch(server, cap, expectedDurationInSeconds))
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

async function _launch(server, desiredCapabilities, expectedDuration) {
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
    debug.log('_launch: duration', `${minutes} minutes/session`)
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
        .saveScreenshot('screenshot.png')
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
