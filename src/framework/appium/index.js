import * as webdriverio from 'webdriverio'
import * as logger from '../common/logger'
import {convertToDesiredCapabilities} from './helper'
import api from '../api'
import config from '../config/test'
import moment from 'moment'
import BPromise from 'bluebird'
import WebSessionTest from './web/web-session-test'

const expectedInMinutes = config.expectedDurationInMinutes
const defaultSessionDurationInSeconds = moment.duration(expectedInMinutes, 'minutes').asSeconds()
const defaultSessionAmount = config.longTestSuiteIterationAmount
const timeout = 60000

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
    sessionAmount: defaultSessionAmount
  }) {

  const desiredCapabilitiesList = convertToDesiredCapabilities(targetDevices)

  const startedAt = moment()

  return await _execute(
    desiredCapabilitiesList,
    _createWebSession,
    options,
    async (driver) => {
      let endedAt
      let duration
      do {
        const webSessionTest = new WebSessionTest(driver, timeout)
        await webSessionTest.execute() // eslint-disable-line babel/no-await-in-loop

        endedAt = moment()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < options.sessionDuration)
    },
    (err, cap) => {
      logger.writeFailure(cap.deviceName, JSON.stringify(err))
    }
  )
}

export async function executeNativeAppSession() {

}

export async function executeHybridAppSession() {

}

// errorCallback:
//     when error throw, the callback will be call
// The test will be countinue to execute
async function _execute(desiredCapsList, createSession, options, callbackJob, errorCallback) {
  const apiKey = await getApiKey()
  if (!apiKey) {
    throw Error("Can't not get a valid apiKey")
  }

  const jobs = desiredCapsList
    .map((desiredCapabilities) => _launchSession(
      {desiredCapabilities, ...server, key: apiKey},
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

export async function getApiKey() {
  const allKeys = (await api.Key.getAll()).map((t) => {
    return t.key
  })
  return allKeys[0]
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
      await createSession(desiredCap, callbackJob) // eslint-disable-line babel/no-await-in-loop
    }
    catch (err) {
      // Callback, countinue executing test
      errorCallback(err, desiredCap.desiredCapabilities)
    }
  }
}

async function _createWebSession(options, callbackJob) {
  const driver = webdriverio.remote(options)
  driver.on('error', (e) => {
    logger.writeFailure(
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
