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
const wrongUsernameMsg = 'Your username is invalid!'
const wrongPasswordMsg = 'Your password is invalid!'
const successMsg = 'You logged into a secure area!'

describe(`Kobiton demo page`, () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerUrl()
    const device = await DeviceService.getOnlineDevice('iOS')
    const desiredCapabilities = automationUtils.desiredCapabilitiesiOSWeb(device)

    debug.log(`Execute on ${device.deviceName} - ${device.udid}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonDemoPage = new KobitonDemoPage(driver, timeout)
  })

  it('should return error when we input wrong username', async () => {
    await kobitonDemoPage.login('foo', 'SuperSecretPassword!')
    let msg = await kobitonDemoPage.getMessage()

    assert.include(msg, wrongUsernameMsg)
  })

  it('should return error when we input wrong password', async () => {
    await kobitonDemoPage.login('tomsmith', 'SuperSecretPassword')
    let msg = await kobitonDemoPage.getMessage()

    assert.include(msg, wrongPasswordMsg)
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
