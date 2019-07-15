import {remote} from 'webdriverio'
import AutomationPracticePage from './automation-practice-page'
import MailinatorPage from './mailinator-page'
import DesiredCapsTestPage from './desired-caps-test-page'
import RandomPage from './random-page'
import BPromise from 'bluebird'
import config from '../../config/test'

const duration = config.expectedDurationInMinutes * 60
const allowW3C = config.allowW3C || true

let server
let browser

if (config.environment === 'LOCAL') {
  server = {
    protocol: 'http',
    host: '127.0.0.1',
    port: 4723
  }
}
else {
  if (allowW3C) {
    server = {
      protocol: 'https',
      hostname: config.autoTestHostname,
      user: config.username1,
      key: config.apiKey
    }
  }
  else {
    server = {
      protocol: 'https',
      host: config.autoTestHostname,
      user: config.username1,
      key: config.apiKey
    }
  }
}

export async function executeDesiredCapabilitiesTest({desiredCapabilities, timeout}) {
  if (allowW3C) {
    browser = await remote({capabilities: desiredCapabilities, ...server})
  }
  else {
    browser = remote({desiredCapabilities, ...server})
  }
  const mailinatorPage = new RandomPage(browser, timeout)
  return await mailinatorPage.executeTest(1)
}

export async function executeJsonwiredTest({desiredCapabilities, timeout}) {
  if (allowW3C) {
    browser = await remote({capabilities: desiredCapabilities, ...server})
  }
  else {
    browser = remote({desiredCapabilities, ...server})
  }
  const automationPracticePage = new AutomationPracticePage(browser, timeout)
  return await automationPracticePage.executeTest(duration)
}

export async function executeMailinatorPageTest({desiredCapabilities, timeout}) {
  if (allowW3C) {
    browser = await remote({capabilities: desiredCapabilities, ...server})
  }
  else {
    browser = remote({desiredCapabilities, ...server})
  }
  const mailinatorPage = new MailinatorPage(browser, timeout)
  return await mailinatorPage.executeTest(duration)
}

export async function executeDesiredCapsTestPage({desiredCapabilities, timeout}) {
  if (allowW3C) {
    browser = await remote({capabilities: desiredCapabilities, ...server})
  }
  else {
    browser = remote({desiredCapabilities, ...server})
  }
  const desiredCapsTestPage = new DesiredCapsTestPage(browser, timeout)
  return await desiredCapsTestPage.executeTest()
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
  const browser = remote({desiredCapabilities, ...server})
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
