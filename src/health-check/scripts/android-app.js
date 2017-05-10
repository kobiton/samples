import BaseTest from './base'
import {convertToDesiredCapabilitiesApp} from '../../framework/appium/helper'
import {createAppDriver, quitDriver} from '../../framework/appium/driver'
import AndroidNativeAppTest from '../../framework/appium/app/android-native-app-test'

const desiredCapabilitiesAndroidNativeApp = {
  app: 'http://appium.github.io/appium/assets/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos',
  fullReset: true
}

export default class AndroidAppTest extends BaseTest {
  async execute(device, timeout) {
    const desiredCapabilities = this._getCap(device)

    try {
      await createAppDriver(desiredCapabilities, async (driver) => {
        const androidNativeAppTest = new AndroidNativeAppTest(driver)
        await androidNativeAppTest.executeAndroidNativeTest()
      })
    }
    finally {
      quitDriver()
    }
  }

  _getCap(device) {
    const caps = convertToDesiredCapabilitiesApp(
      this._getTimeStamp(),
      desiredCapabilitiesAndroidNativeApp,
      [device])
    return caps[0]
  }
}
