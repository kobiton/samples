import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import * as data from './data'

const testUrl = 'http://demoqa.com/'
const waitingTime = 30000

export async function run(server, onlineDevices, expectedDurationInHours) {
  expectedDurationInHours = expectedDurationInHours * 3600 // Convert hours to seconds

  const jobs = onlineDevices
    .map((cap) => _launch(server, cap, expectedDurationInHours))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => {
      debug.error('run: promise error', err)
    }))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess(value) {
    return value
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
  let result = 1
  try {
    startedAt = moment.utc()
    driver = await createDriver(server, desiredCapabilities)
    do {
      const searchTerm = data.generateTerm()
      await driver // eslint-disable-line babel/no-await-in-loop
        .get(`${testUrl}contact/`)
        .waitForElementByXPath("//input[@name='your-name']", waitingTime)
        .sendKeys(searchTerm)
        .elementByXPath("//input[@name='your-email']")
        .sendKeys(searchTerm)
        .elementByXPath("//input[@name='your-subject']")
        .sendKeys(searchTerm)
        .elementByXPath("//textarea[@name='your-message']")
        .sendKeys(searchTerm)
        .elementByXPath("//input[@value='Send']")
        .click()

      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'seconds')
    } while (duration < expectedDuration)

    const minutes = endedAt.diff(startedAt, 'minutes')
    debug.log('_launch: duration', `${minutes} minutes/session`)
  } catch (err) {
    result = 0
    debug.error('_launch: error', err)
  } finally {
    await quitDriver(driver)
  }
  return result
}
