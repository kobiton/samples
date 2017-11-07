import 'babel-polyfill'
import 'colors'
import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import * as automationUtils from '../../utils/automation'
import {createDriver, quitDriver} from '../../common/driver'
import DeviceService from '../../service/DeviceService'
import KobitonAndroidDemoApp from '../../common/kobiton-android-demo-app'

let driver
let kobitonAndroidDemoApp
const timeout = 30000 // millisecond

describe('Kobiton demo Android app', () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerConfig()
    const device = await DeviceService.getOnlineDevice('Android')
    const desiredCapabilities = automationUtils.desiredCapabilitiesAndroidApp(
      device,
      '[JS] Android App')

    debug.log(`Execute on ${device.deviceName}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonAndroidDemoApp = new KobitonAndroidDemoApp(driver, timeout)
  })

  it('should navigate to Accessibility screen', async () => {
    await kobitonAndroidDemoApp.gotoAccessibilityMenu()
    // Verify accessibility screen
    assert.isTrue(
      await driver.hasElementByXPath(
        kobitonAndroidDemoApp.elements.accessibility.nodeProviderXPath),
      true)

  })

  after(async () => {
    await quitDriver(driver)
  })
})
