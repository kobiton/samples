import * as webdriverio from 'webdriverio'
import WdioAutomationPracticePageTest from './wdio-automation-practice-page-test'
import WdioKobitonPageTest from './wdio-kobiton-page-test'
import config from '../../config/test'
import {getApiKey} from '../'

const server = {
  host: config.autoTestHostname,
  port: config.autoTestPort,
  user: config.username1,
  key: null // api key, will be fetched when execute test
}

export async function executeDesiredCapabilitiesTest({desiredCapabilities, timeout}) {
  server.key = await getApiKey()
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const wdioKobitonPageTest = new WdioKobitonPageTest(browser, timeout)
  return await wdioKobitonPageTest.executeTest(1)
}

export async function executeJsonwiredTest({desiredCapabilities, timeout}) {
  server.key = await getApiKey()
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const wdioAutomationPracticeTest = new WdioAutomationPracticePageTest(browser, timeout)
  return await wdioAutomationPracticeTest.executeTest(1)
}
