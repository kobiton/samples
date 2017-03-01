import * as webdriverio from 'webdriverio'
import AutomationPracticePage from './automation-practice-page'
import KobitonPage from './kobiton-page'
import RandomPage from './random-page'
import BPromise from 'bluebird'
import config from '../../config/test'
import {getApiKey} from '../helper'

const duration = config.expectedDurationInMinutes
const server = {
  host: config.autoTestHostname,
  port: config.autoTestPort,
  user: config.username1,
  key: null // api key, will be fetched when execute test
}

export async function executeDesiredCapabilitiesTest({desiredCapabilities, timeout}) {
  server.key = await getApiKey()
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const kobitonPage = new KobitonPage(browser, timeout)
  return await kobitonPage.executeTest(1)
}

export async function executeJsonwiredTest({desiredCapabilities, timeout}) {
  server.key = await getApiKey()
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const automationPracticePage = new AutomationPracticePage(browser, timeout)
  return await automationPracticePage.executeTest(duration)
}

export async function executeKobitonPageTest({desiredCapabilities, timeout}) {
  server.key = await getApiKey()
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const kobitonPage = new KobitonPage(browser, timeout)
  return await kobitonPage.executeTest(duration)
}

export async function
executeMultipleDevicesParallelTest({desiredCapsList, durationInMinutes, timeout}) {
  const jobs = desiredCapsList
  .map((desiredCapabilities) => _launchSession({
    desiredCapabilities,
    durationInMinutes,
    timeout
  }))
  .map((promise) => _reflect(promise))

  const finishedJobs = await BPromise.all(jobs)

  return finishedJobs
}

async function _launchSession({desiredCapabilities, durationInMinutes, timeout}) {
  server.key = await getApiKey()
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const randomPage = new RandomPage(browser, timeout)
  await randomPage.executeTest(durationInMinutes)
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
