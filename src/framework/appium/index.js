import * as webdriverio from 'webdriverio'
import * as logger from '../common/logger'
import {convertToDesiredCapabilities} from './helper'
import api from '../api'
import config from '../core/config'
import moment from 'moment'
import BPromise from 'bluebird'
import WebSessionTest from './web/web-session-test'

const expectedInHours = config.expectedDurationInHours
const defaultSessionDurationInSeconds = moment.duration(expectedInHours, 'hours').asSeconds()
const defaultSessionAmout = config.longTestSuiteIterationAmount
const timeOut = 60000

const server = {
  host: config.autoTestHostname,
  port: config.autoTestPort,
  user: config.username1,
  key: null // api key, will fetched when execute test
}

export async function executeWebSession(
  targetDevices,
  options = {
    sessionDuration: defaultSessionDurationInSeconds,
    sessionAmount: defaultSessionAmout
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilities({
    devices: targetDevices
  })

  const startedAt = moment.utc()
  let endedAt
  let duration

  return await _execute(
    desiredCapabilitiesList,
    options,
    async (driver) => {
      do {
        const webSessionTest = new WebSessionTest(driver, timeOut)
        await webSessionTest.execute()

        endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < options.sessionDuration)
    }
  )
}

export async function executeNativeAppSession() {

}

export async function executeHybridAppSession() {

}

// errorCallback:
//     + if specified, when error throw, the callback will be call
// The test will be countinue to execute
//     + if not specified, the test would throw error and stop executing test
async function _execute(desiredCapsList, options, callbackJob, errorCallback) {
  const apiKey = await _getApiKey()
  if (!apiKey) {
    throw Error("Can't not get a valid apiKey")
  }

  const jobs = desiredCapsList
    .map((desiredCapabilities) => _launchSession(
      {desiredCapabilities, ...server, key: apiKey},
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

async function _getApiKey() {
  const allKeys = (await api.Key.getAll()).map((t) => {
    return t.key
  })
  return allKeys[0]
}

async function _launchSession(
  desiredCap,
  options,
  callbackJob,
  errorCallback
) {
  for (let i = 0; i < options.sessionAmount; i++) {
    try {
      await _createSession(desiredCap, callbackJob)
    }
    catch (err) {
      if (errorCallback) {
        // Callback, countinue executing test
        errorCallback(err, desiredCap.desiredCapabilities)
      }
      else {
        // Write failed test, throw err, stop test immediately
        logger.writeFailedLog(desiredCap.desiredCapabilities.deviceName, 'Error:', err)
        throw err
      }
    }
  }
}

async function _createSession(options, callbackJob) {
  const driver = webdriverio.remote(options)
  await driver.on('error', (e) => {
    logger.writeFailedLog(
      `wdio-test:${options.deviceName}`,
      'Error while creating web driver',
      e
    )
  })

  try {
    await callbackJob(driver)
  }
  finally {
    if (driver) {
      try {
        await driver.end()
      }
      catch (ignored) {}
    }
  }
}
