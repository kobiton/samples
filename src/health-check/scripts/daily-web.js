import * as webdriverio from 'webdriverio'
import server from '../config/server'
import {convertToDesiredCapabilities} from '../../framework/appium/helper'
import MailinatorPage from '../../framework/appium/web/mailinator-page'

const timeout = 120000
export default class DailyWebTest {
  async execute(timeStamp, targetDevice, expectedDuration) {
    const desiredCapabilities = this._getCap(timeStamp, targetDevice)
    desiredCapabilities.newCommandTimeout = 120000
    let browser = await webdriverio.remote({capabilities: desiredCapabilities, ...server})
    const mailinatorPage = new MailinatorPage(browser, timeout)
    await mailinatorPage.executeTest(expectedDuration)
  }

  _getCap(timeStamp, targetDevice) {
    const caps = convertToDesiredCapabilities(timeStamp, [targetDevice])
    return caps[0]
  }
}
