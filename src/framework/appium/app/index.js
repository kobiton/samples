import * as logger from '../../common/logger'
import {convertToDesiredCapabilitiesApp} from '../../appium/helper'
import config from '../../config/test'
import moment from 'moment'
import BPromise from 'bluebird'
import AndroidNativeAppTest from './android-native-app-test'
import AndroidHybridAppTest from './android-hybrid-app-test'
import IosNativeAppTest from './ios-native-app-test'
import IosHybridAppTest from './ios-hybrid-app-test'
import {createAppDriver, quitDriver} from '../../appium/driver'
import {errorToJSON} from '../../util'

const defaultSessionDurationInSeconds = config.expectedDurationInMinutes * 60
const defaultSessionAmount = config.longTestSuiteIterationAmount
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
  timestamps, targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(
    timestamps, desiredCapabilitiesAndroidNativeApp,
    targetDevices)
  const startedAt = moment()

  return await execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      try {
        const androidNativeAppTest = new AndroidNativeAppTest(driver)
        do {
          // eslint-disable-next-line babel/no-await-in-loop
          await androidNativeAppTest.executeAndroidNativeTest()
          endedAt = moment()
          duration = endedAt.diff(startedAt, 'seconds')
        } while (duration < options.sessionDuration)
      }
      finally {
        await quitDriver(driver)
      }
    },
    logError
  )
}

export async function executeIOSNativeApp(
  timestamps, targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(
    timestamps, desiredCapabilitiesiOSNativeApp,
    targetDevices)
  const startedAt = moment()

  return await execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      try {
        const iOSNativeAppTest = new IosNativeAppTest(driver)
        do {
        // eslint-disable-next-line babel/no-await-in-loop
          await iOSNativeAppTest.executeIosNativeTest()
          endedAt = moment()
          duration = endedAt.diff(startedAt, 'seconds')
        } while (duration < options.sessionDuration)
      }
      finally {
        await quitDriver(driver)
      }
    },
    logError
  )
}
export async function executeAndroidHybridApp(
  timestamps, targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(
    timestamps, desiredCapabilitiesAndroidHybridApp,
    targetDevices)
  const startedAt = moment()

  return await execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      try {
        const androidHybridAppTest = new AndroidHybridAppTest(driver)
        do {
          // eslint-disable-next-line babel/no-await-in-loop
          await androidHybridAppTest.executeAndroidHybridTest()
          endedAt = moment()
          duration = endedAt.diff(startedAt, 'seconds')
        } while (duration < options.sessionDuration)
      }
      finally {
        await quitDriver(driver)
      }
    },
    logError
  )
}
export async function executeIOSHybridApp(
  timestamps, targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilitiesApp(
    timestamps, desiredCapabilitiesiOSHybridApp,
    targetDevices)
  const startedAt = moment()

  return await execute(
    desiredCapabilitiesList,
    createAppDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      try {
        const iOSHybridAppTest = new IosHybridAppTest(driver)
        do {
          // eslint-disable-next-line babel/no-await-in-loop
          await iOSHybridAppTest.executeIosHybridTest()

          endedAt = moment()
          duration = endedAt.diff(startedAt, 'seconds')
        } while (duration < options.sessionDuration)
      }
      finally {
        await quitDriver(driver)
      }
    },
    logError
  )
}

function logError(err, cap) {
  if (cap && cap.deviceName) {
    logger.writeFailure(cap.deviceName, errorToJSON(err))
  }
  throw err
}

// errorCallback:
//     + if specified, when error throw, the callback will be call
// The test will be countinue to execute
//     + if not specified, the test would throw error and stop executing test
async function execute(desiredCapsList, createSession, options, callbackJob, errorCallback) {
  const jobs = desiredCapsList
    .map((desiredCapabilities) => launchSession(
      desiredCapabilities,
      createSession,
      options,
      callbackJob,
      errorCallback)
    )
    .map((promise) => reflect(promise).then(onComplete))

  const finishedJobs = await BPromise.all(jobs)
  const errors = []
  let resolvedJobsCount = 0
  finishedJobs.forEach((job) => {
    if (job.resolved) {
      resolvedJobsCount++
    }
    if (job.err) {
      errors.push(job.err)
    }
  })

  function onComplete({status, err}) {
    return {
      resolved: status === 'resolved',
      err
    }
  }

  return {
    resolvedJobs: resolvedJobsCount,
    errors
  }
}

function reflect(promise) {
  return promise.then(
    function (value) {
      return {value, status: 'resolved'}
    },
    function (err) {
      return {err, status: 'rejected'}
    }
  )
}

async function launchSession(
  desiredCap,
  createSession,
  options,
  callbackJob,
  errorCallback
) {
  try {
    await createSession(desiredCap, callbackJob)
  }
  catch (err) {
    // Callback, countinue executing test
    errorCallback(err, desiredCap)
  }
}
