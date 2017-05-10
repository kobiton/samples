import BaseTest from './base'
import {convertToDesiredCapabilitiesApp} from '../../framework/appium/helper'
import {createAppDriver, quitDriver} from '../../framework/appium/driver'
import IosNativeAppTest from '../../framework/appium/app/ios-native-app-test'

const desiredCapabilitiesiOSNativeApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/UIKitCatalog-Test-115.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog',
  fullReset: true
}

export default class AndroidAppTest extends BaseTest {
  async execute(device, timeout) {
    const desiredCapabilities = this._getCap(device)

    try {
      await createAppDriver(desiredCapabilities, async (driver) => {
        const iOSNativeAppTest = new IosNativeAppTest(driver)
        await iOSNativeAppTest.executeIosNativeTest()
      })
    }
    finally {
      quitDriver()
    }
  }

  _getCap(device) {
    const caps = convertToDesiredCapabilitiesApp(
      this._getTimeStamp(),
      desiredCapabilitiesiOSNativeApp,
      [device])
    return caps[0]
  }
}
