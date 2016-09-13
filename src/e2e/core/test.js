import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import * as data from './data'

const testUrl = 'http://demoqa.com/'
const sleepingTime = 1000

export async function run(server, onlineDevices, expectedDurationInHours) {
  expectedDurationInHours = expectedDurationInHours * 3600 // Convert hours to seconds

  const jobs = onlineDevices
    .map((cap) => _launch(server, cap, expectedDurationInHours))
    .map((promise) => promise.then(onSuccess, onError).catch((err) => err))

  const finishedJobs = await BPromise.all(jobs)
  const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)

  function onSuccess() {
    return 1
  }

  function onError(err) {
    debug.error('run', err)
    return 0
  }

  return successCount
}

async function _launch(server, desiredCapabilities, expectedDuration) {
  let driver
  let duration = 0,
    startedAt, endedAt

  try {
    startedAt = moment.utc()
    driver = await createDriver(server, desiredCapabilities)
    do {
      const searchTerm = data.generateTerm()
      await driver
        .get(`${testUrl}contact/`)
        .sleep(sleepingTime)
        .elementByXPath("//input[@name='your-name']")
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
    debug.log('_launch', `${minutes} minutes/session`)
  } catch (err) {
    debug.error('_launch', err)
  } finally {
    await quitDriver(driver)
  }
}
