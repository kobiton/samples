import 'babel-polyfill'
import 'colors'
import {debug} from '@kobiton/core-util'
import * as automationUtils from '../../utils/automation'
import {createDriver, quitDriver} from '../../common/driver'
import DeviceService from '../../service/DeviceService'
import KobitonIOSDemoApp from '../../common/kobiton-ios-demo-app'

let driver
let kobitonIOSDemoApp
const timeout = 30000 // millisecond

describe('iOS app', () => {

  before(async () => {
    const serverConfig = await automationUtils.kobitonServerConfig()
    const device = await DeviceService.getOnlineDevice('iOS')
    const desiredCapabilities = automationUtils.desiredCapabilitiesiOSApp(device, '[JS] IOS App')

    debug.log(`Execute on ${device.deviceName}`)

    driver = await createDriver({serverConfig, desiredCapabilities})
    kobitonIOSDemoApp = new KobitonIOSDemoApp(driver, timeout)
  })

  after(async () => {
    await quitDriver(driver)
  })

  it('should navigate to UIKit Catalog menu', async () => {
    await kobitonIOSDemoApp.gotoUIKitCatalogMenu()
  })

})
