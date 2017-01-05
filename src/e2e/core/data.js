import _ from 'lodash'
import faker from 'faker'
import {getUserInfo, getOnlineDevices} from '../../core/portal-api'
import jsonfile from 'jsonfile'

const file = 'reports/onlineDevices.json'

export async function getAllOnlineDevice() {
  const userInfo = await getUserInfo()
  const onlineDevices = await getOnlineDevices(userInfo.token)
  return onlineDevices
}

/**
 * Get a device in the last from saved online devices, then save the remaining devices
 */
export function getADevice() {
  const onlineDevices = jsonfile.readFileSync(file)
  const deviceName = onlineDevices.pop()
  saveOnlineDevices(onlineDevices)
  return deviceName
}

/**
 * Save online devices into a default file
 */
export function saveOnlineDevices(onlineDevices) {
  jsonfile.writeFileSync(file, onlineDevices, {spaces: 2})
}

export function generateTerms(times) {
  return _.times(times,
    () => generateTerm()
  )
}

export function generateTerm() {
  return faker.name.findName()
}

export const desiredCapabilities = {
  getPortrait: (cap) => ({...cap, deviceOrientation: 'portrait'}),
  getLandscape: (cap) => ({...cap, deviceOrientation: 'landscape'}),
  getNotCaptureScreenshots: (cap) => ({...cap, captureScreenshots: false}),
  getMixedOrSubstringDeviceName: (cap) => ({...cap, deviceName: cap.deviceName.slice(0, -3)}),
  getMixedOrSubstringPlatformVersion: (cap) => {
    return {...cap, platformVersion: cap.platformVersion.slice(0, -1)}
  },
  getNewCommandTimeout: (cap) => ({...cap, newCommandTimeout: 60})
}

export const desiredCapabilitiesAndroidNativeApp = {
  app: 'http://appium.github.io/appium/assets/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos',
  fullReset: true
}

export const desiredCapabilitiesAndroidHybridApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/selendroid-test-app.apk',
  appPackage: 'io.selendroid.testapp',
  appActivity: 'HomeScreenActivity',
  fullReset: true
  // source code: https://github.com/selendroid/selendroid
}

export const desiredCapabilitiesiOSNativeApp = {
  app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/UIKitCatalog-Test-Adhoc.ipa',
  bundleId: 'com.example.apple-samplecode.UIKitCatalog',
  fullReset: true
}
