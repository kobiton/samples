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

describe(`Kobiton demo app`, () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerUrl()
    const device = await DeviceService.getOnlineDevice('iOS')
    const desiredCapabilities = automationUtils.desiredCapabilitiesiOSApp(device)

    debug.log(`Execute on ${device.deviceName} - ${device.udid}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonIOSDemoApp = new KobitonIOSDemoApp(driver, timeout)
  })

  afterEach(async () => {
    await kobitonIOSDemoApp.backtoUIKitCatalogMenu()
  })

  it('should navigate to UIKit Catalog menu', async () => {
    await kobitonIOSDemoApp.gotoUIKitCatalogMenu()
    // Verify UIKit Catalog Menu
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.activity.xPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.alert.xPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.datePicker.xPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.buttons.xPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.imageView.xPath), true)
  })

  it('should navigate to Activity controller screen', async () => {
    await kobitonIOSDemoApp.gotoActivityController()
  })

  it('should navitgate to Alert controller screen', async () => {
    await kobitonIOSDemoApp.gotoAlertController()
    // Verify Alert screen
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.alert.simpleXPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.alert.otherXPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonIOSDemoApp.elements.alert.textEntryXPath), true)
  })

  after(async () => {
    await quitDriver(driver)
  })
})
