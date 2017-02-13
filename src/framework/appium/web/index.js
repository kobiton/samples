import * as webdriverio from 'webdriverio'
import WdioKobitonPageTest from './wdio-kobiton-page-test'
import config from '../../config/test'
import {getApiKey} from '../'

const server = {
  host: config.autoTestHostname,
  port: config.autoTestPort,
  user: config.username1,
  key: null // api key, will fetched when execute test
}

export async function executeDesiredCapabilitiesTest({desiredCapabilities, timeout}) {
  const apiKey = await getApiKey()
  server.key = apiKey
  const browser = webdriverio.remote({desiredCapabilities, ...server})
  const wdioKobitonPageTest = new WdioKobitonPageTest(browser, timeout)
  return await wdioKobitonPageTest.execute()
}
