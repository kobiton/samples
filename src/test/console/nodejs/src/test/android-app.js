import 'babel-polyfill'
import 'colors'
import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import * as automationUtils from '../utils/automation'
import {createDriver, quitDriver} from '../common/driver'
import DeviceService from '../service/DeviceService'
import KobitonAndroidDemoApp from '../common/kobiton-android-demo-app'

let driver
let kobitonAndroidDemoApp
const timeout = 30000 // millisecond

describe('Kobiton demo app', () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerUrl()
    const device = await DeviceService.getOnlineDevice('Android')
    const desiredCapabilities = automationUtils.desiredCapabilitiesAndroidApp(device)

    debug.log(`Execute on ${device.deviceName} - ${device.udid}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonAndroidDemoApp = new KobitonAndroidDemoApp(driver, timeout)
  })

  it('should navigate to Accessibility screen', async () => {
    await kobitonAndroidDemoApp.gotoAccessibilityMenu()
    // Verify accessibility screen
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.accessibility.nodeProviderXPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.accessibility.nodeQueryingXPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.accessibility.serviceXPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.accessibility.customViewXPath), true)
    // Verify main menu
    await kobitonAndroidDemoApp.backtoMainMenuFromAccessibility()
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.accessibility.menuXPath), true)
  })

  it('should navigate to App/Custome Title screen', async () => {
    await kobitonAndroidDemoApp.gotoCustomTitleApp()
    // Verify custom title screen
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.app.customTitle.changeLeftTextXPath), true)
    assert.isTrue(
      await driver.hasElementByXPath(kobitonAndroidDemoApp.elements.app.customTitle.changeRightTextXPath), true)
  })

  it('should change left header text', async () => {
    // Change left text
    const text = 'Left Header Text'
    await kobitonAndroidDemoApp.changeLeftText(text)
    const leftText = await kobitonAndroidDemoApp.getLeftHeaderText()
    // Verify left header text
    assert.include(text, leftText)
  })

  it('should change right header text', async () => {
    // Change left text
    const text = 'Right Header Text'
    await kobitonAndroidDemoApp.changeRightText(text)
    const rightText = await kobitonAndroidDemoApp.getRightHeaderText()
    // Verify left header text
    assert.include(text, rightText)
  })

  after(async () => {
    await quitDriver(driver)
  })
})
