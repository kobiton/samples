import 'babel-polyfill'
import 'colors'
import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import * as automationUtils from '../utils/automation'
import {createDriver, quitDriver} from '../common/driver'
import DeviceService from '../service/DeviceService'
import KobitonDemoPage from '../common/kobiton-demo-page'

let driver
let kobitonDemoPage
const timeout = 60000 // millisecond
const successMsg = 'You logged into a secure area!'

describe('Kobiton demo Android page', () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerUrl()
    const device = await DeviceService.getOnlineDevice('Android')
    const desiredCapabilities = automationUtils.desiredCapabilitiesAndroidWeb(device)

    debug.log(`Execute on ${device.deviceName} - ${device.udid}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonDemoPage = new KobitonDemoPage(driver, timeout)
  })

  it('should run test successfully with correct username and password', async () => {
    await kobitonDemoPage.login('tomsmith', 'SuperSecretPassword!')
    let msg = await kobitonDemoPage.getMessage()

    assert.include(msg, successMsg)
  })

  after(async () => {
    await quitDriver(driver)
  })

})
