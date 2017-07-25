import 'babel-polyfill'
import 'colors'
import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import * as automationUtils from '../utils/automation'
import {createDriver, quitDriver} from '../common/driver'
import DeviceService from '../service/DeviceService'
import KobitonIOSDemoApp from '../common/kobiton-ios-demo-app'

let driver
let kobitonIOSDemoApp
const timeout = 30000 // millisecond

describe('Kobiton demo iOS app', () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerUrl()
    const device = await DeviceService.getOnlineDevice('iOS')
    const desiredCapabilities = automationUtils.desiredCapabilitiesiOSApp(device)

    debug.log(`Execute on ${device.deviceName}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonIOSDemoApp = new KobitonIOSDemoApp(driver, timeout)
  })

  after(async () => {
    await quitDriver(driver)
  })

  it('should navigate to UIKit Catalog menu', async () => {
    await kobitonIOSDemoApp.gotoUIKitCatalogMenu()
    // Verify UIKit Catalog Menu
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.activity.xPath), true)
  })

})
