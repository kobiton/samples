import * as webdriverio from 'webdriverio'
import AutomationPracticePage from './automation-practice-page'
import MailinatorPage from './mailinator-page'
import DesiredCapsTestPage from './desired-caps-test-page'
import RandomPage from './random-page'
import BPromise from 'bluebird'
import config from '../../config/test'

const duration = config.expectedDurationInMinutes * 60
const server = {
  host: config.autoTestHostname,
  port: config.autoTestPort,
  user: config.username1,
  key: config.apiKey
}

export async function executeDesiredCapabilitiesTest({desiredCapabilities, timeout}) {
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const mailinatorPage = new RandomPage(browser, timeout, desiredCapabilities)
  return await mailinatorPage.executeTest(1)
}

export async function executeJsonwiredTest({desiredCapabilities, timeout}) {
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const automationPracticePage = new AutomationPracticePage(browser, timeout, desiredCapabilities)
  return await automationPracticePage.executeTest(duration)
}

export async function executeMailinatorPageTest({desiredCapabilities, timeout}) {
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const mailinatorPage = new MailinatorPage(browser, timeout, desiredCapabilities)
  return await mailinatorPage.executeTest(duration)
}

export async function executeDesiredCapsTestPage({desiredCapabilities, timeout}) {
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const desiredCapsTestPage = new DesiredCapsTestPage(browser, timeout, desiredCapabilities)
  return await desiredCapsTestPage.executeTest(duration)
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
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const randomPage = new RandomPage(browser, timeout, desiredCapabilities)
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
