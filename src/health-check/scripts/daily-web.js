import * as webdriverio from 'webdriverio'
import BaseTest from './base'
import testConfig from '../../framework/config/test'
import {convertToDesiredCapabilities} from '../../framework/appium/helper'
import MailinatorPage from '../../framework/appium/web/mailinator-page'

export default class DailyWebTest extends BaseTest {
  async execute(device, timeout) {
    const desiredCapabilities = this._getCap(device)
    const server = await this._getServerConfig()
    const browser = webdriverio.remote({desiredCapabilities, ...server})
    const mailinatorPage = new MailinatorPage(browser, timeout)

    const duration = testConfig.expectedDurationInMinutes
    await mailinatorPage.executeTest(duration)
  }

  _getCap(device) {
    const caps = convertToDesiredCapabilities(this._getTimeStamp(), [device])
    return caps[0]
  }
}
