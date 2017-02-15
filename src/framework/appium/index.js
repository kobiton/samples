import * as webdriverio from 'webdriverio'
import * as logger from '../common/logger'
import {convertToDesiredCapabilities} from './helper'
import config from '../config/test'
import moment from 'moment'
import BPromise from 'bluebird'
import WebSessionTest from './web/wdio-automation-practice-page-test'
import {createWebDriver} from './driver'

const expectedInMinutes = config.expectedDurationInMinutes
const defaultSessionDurationInSeconds = moment.duration(expectedInMinutes, 'minutes').asSeconds()
const defaultSessionAmount = config.longTestSuiteIterationAmount
const timeout = 60000

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
    createWebDriver,
    options,
    async (driver) => {
      let endedAt
      let duration
      do {
        const webSessionTest = new WebSessionTest(driver, timeout)
        await webSessionTest.execute()

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
