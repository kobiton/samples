import * as logger from '../../common/logger'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'
import config from '../../config/test'
import moment from 'moment'
import BPromise from 'bluebird'
import AndroidNativeAppTest from './android-native-app-test'
import AndroidHybridAppTest from './android-hybrid-app-test'
import IosNativeAppTest from './ios-native-app-test'
import IosHybridAppTest from './ios-hybrid-app-test'
import {createAppDriver} from '../../appium/driver'

const expectedInMinutes = config.expectedDurationInMinutes
const defaultSessionDurationInSeconds = moment.duration(expectedInMinutes, 'minutes').asSeconds()
const defaultSessionAmount = config.longTestSuiteIterationAmount
const timeout = 60000
const desiredCapabilitiesAndroidNativeApp = {
  app: 'http://appium.github.io/appium/assets/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos',
  fullReset: true
}
const desiredCapabilitiesiOSNativeApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/UIKitCatalog-Test-115.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog',
  fullReset: true
}
const desiredCapabilitiesAndroidHybridApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/selendroid-test-app.apk',
  appPackage: 'io.selendroid.testapp',
  appActivity: 'HomeScreenActivity',
  fullReset: true
}
const desiredCapabilitiesiOSHybridApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/HybridIOSApp.ipa',
  bundleId: 'org.sample.hybridiosapp'
}

export async function executeAndroidNativeApp(
  targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(desiredCapabilitiesAndroidNativeApp, targetDevices)
  const startedAt = moment()

  return await _execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      do {
        const androidNativeAppTest = new AndroidNativeAppTest(driver)
        await androidNativeAppTest.executeAndroidNativeTest()

        endedAt = moment()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < options.sessionDuration)
    },
    (err, cap) => {
      logger.writeFailure(cap.deviceName, JSON.stringify(err))
    }
  )
}

export async function executeIOSNativeApp(
  targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(desiredCapabilitiesiOSNativeApp, targetDevices)
  const startedAt = moment()

  return await _execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      do {
        const iOSNativeAppTest = new IosNativeAppTest(driver)
        await iOSNativeAppTest.executeIosNativeTest()

        endedAt = moment()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < options.sessionDuration)
    },
    (err, cap) => {
      logger.writeFailure(cap.deviceName, JSON.stringify(err))
    }
  )
}
export async function executeAndroidHybridApp(
  targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(desiredCapabilitiesAndroidHybridApp, targetDevices)
  const startedAt = moment()

  return await _execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      do {
        const androidHybridAppTest = new AndroidHybridAppTest(driver)
        await androidHybridAppTest.executeAndroidHybridTest()

        endedAt = moment()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < options.sessionDuration)
    },
    (err, cap) => {
      logger.writeFailure(cap.deviceName, JSON.stringify(err))
    }
  )
}
export async function executeIOSHybridApp(
  targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(desiredCapabilitiesiOSHybridApp, targetDevices)
  const startedAt = moment()

  return await _execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      do {
        const iOSHybridAppTest = new IosHybridAppTest(driver)
        await iOSHybridAppTest.executeIosHybridTest()

        endedAt = moment()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < options.sessionDuration)
    },
    (err, cap) => {
      logger.writeFailure(cap.deviceName, JSON.stringify(err))
    }
  )
}

// errorCallback:
//     + if specified, when error throw, the callback will be call
// The test will be countinue to execute
//     + if not specified, the test would throw error and stop executing test
async function _execute(desiredCapsList, createSession, options, callbackJob, errorCallback) {
  const jobs = desiredCapsList
    .map((desiredCapabilities) => _launchSession(
      desiredCapabilities,
      createSession,
      options,
      callbackJob,
      errorCallback)
    )
    .map((promise) => _reflect(promise).then(onComplete))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => {
    return (sum + ok)
  }, 0)

  function onComplete(result) {
    if (result.status === 'resolved') {
      return 1
    }
    else {
      return 0
    }
  }

  return successCount
}

function _reflect(promise) {
  return promise.then(
    function (value) {
      return {value, status: 'resolved'}
    },
    function (err) {
      return {err, status: 'rejected'}
    }
  )
}

async function _launchSession(
  desiredCap,
  createSession,
  options,
  callbackJob,
  errorCallback
) {
  for (let i = 0; i < options.sessionAmount; i++) {
    try {
      await createSession(desiredCap, callbackJob)
    }
    catch (err) {
      // Callback, countinue executing test
      errorCallback(err, desiredCap.desiredCapabilities)
    }
  }
}
