import * as webdriverio from 'webdriverio'
import BaseTest from './base'
import {convertToDesiredCapabilities} from '../../framework/appium/helper'
import MailinatorPage from '../../framework/appium/web/mailinator-page'

const timeout = 30000
const initial = new BaseTest()
export default class DailyWebTest {
  async execute(timeStamp, targetDevice, expectedDuration) {
    const desiredCapabilities = this._getCap(timeStamp, targetDevice)
    const server = await initial._getServerConfig()
    const browser = webdriverio.remote({desiredCapabilities, ...server})
    const mailinatorPage = new MailinatorPage(browser, timeout)
    await mailinatorPage.executeTest(expectedDuration)
  }

  _getCap(timeStamp, targetDevice) {
    const caps = convertToDesiredCapabilities(timeStamp, [targetDevice])
    return caps[0]
  }
}
