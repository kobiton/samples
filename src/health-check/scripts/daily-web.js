import * as webdriverio from 'webdriverio'
import server from '../config/server'
import {convertToDesiredCapabilities} from '../../framework/appium/helper'
import MailinatorPage from '../../framework/appium/web/mailinator-page'

const timeout = 30000
export default class DailyWebTest {
  async execute(timeStamp, targetDevice, expectedDuration) {
    const desiredCapabilities = this._getCap(timeStamp, targetDevice)
    desiredCapabilities.newCommandTimeout = 60000
    let browser = webdriverio.remote({desiredCapabilities, ...server})
    const mailinatorPage = new MailinatorPage(browser, timeout)
    mailinatorPage.targetDevice = targetDevice
    await mailinatorPage.executeTest(expectedDuration)
  }

  _getCap(timeStamp, targetDevice) {
    const caps = convertToDesiredCapabilities(timeStamp, [targetDevice])
    return caps[0]
  }
}
