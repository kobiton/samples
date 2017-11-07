import 'babel-polyfill'
import 'colors'
import {assert} from 'chai'
import * as WebDriver from 'selenium-webdriver'
import {debug} from '@kobiton/core-util'
import * as automationUtils from '../utils/automation'
import {quitDriver} from '../common/driver'
import DeviceService from '../service/DeviceService'
import KobitonDemoPage from '../common/kobiton-demo-page'

let driver
let kobitonDemoPage
const timeout = 60000 // millisecond
const successMsg = 'You logged into a secure area!'

describe('Kobiton demo Android web using Selenium', () => {

  before(async () => {
    try {
      const device = await DeviceService.getOnlineDevice('Android')
      const desiredCapabilities = automationUtils.desiredCapabilitiesAndroidWeb(
        device,
        '[JS-Selenium] Android Web')

      debug.log(`Execute on ${device.deviceName} - ${device.udid}`)

      const serverUrl = automationUtils.getKobitonAutomationServerUrl()
      driver = new WebDriver.Builder()
        .usingServer(serverUrl)
        .withCapabilities(desiredCapabilities)
        .build()
      kobitonDemoPage = new KobitonDemoPage(driver, timeout)
    }
    catch (err) {
      debug.log('FAILED when before:', err)
      assert.fail(err)
    }
  })

  it('should run test successfully with correct username and password', async () => {
    await kobitonDemoPage.loginUsingSelenium('tomsmith', 'SuperSecretPassword!', WebDriver)

    let msg = await kobitonDemoPage.getMessageUsingSelenium(WebDriver)
    assert.include(msg, successMsg)
  })

  after(async () => {
    await quitDriver(driver)
  })

})
