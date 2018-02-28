import * as webdriverio from 'webdriverio'
import server from '../config/server'
import {convertToDesiredCapabilities} from '../../framework/appium/helper'
import MailinatorPage from '../../framework/appium/web/mailinator-page'

const timeout = 30000
export default class DailyWebTest {
  async execute(timeStamp, targetDevice, expectedDuration) {
    const desiredCapabilities = this._getCap(timeStamp, targetDevice)
    const browser = webdriverio.remote({desiredCapabilities, ...server})
    browser.timeouts('pageLoad', 3 * 60 * 1000)
    browser.timeouts('script', 3 * 60 * 1000)
    browser.timeouts('implicit', 3 * 60 * 1000)
    const mailinatorPage = new MailinatorPage(browser, timeout)
    await mailinatorPage.executeTest(expectedDuration)
  }

  _getCap(timeStamp, targetDevice) {
    const caps = convertToDesiredCapabilities(timeStamp, [targetDevice])
    return caps[0]
  }
}
