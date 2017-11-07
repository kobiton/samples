import Url from 'url'
import configs from '../configs'
import KeyService from '../service/KeyService'

export async function getKobitonAutomationServerUrl() {
  const apiUrl = Url.parse(configs.apiUrl)
  const apiKey = await KeyService.getApiKey()
  return `https://${apiKey.username}:${apiKey.key}@${apiUrl.hostname}/wd/hub`
}

export async function kobitonServerConfig() {
  const apiUrl = Url.parse(configs.apiUrl)
  const apiKey = await KeyService.getApiKey()

  const config = {
    host: apiUrl.hostname,
    auth: `${apiKey.username}:${apiKey.key}`,
    port: (apiUrl.port === 443) ? 80 : apiUrl.port || 80
  }

  return config
}

export function desiredCapabilitiesAndroidWeb(device, sessionName = 'Android web') {
  return {
    sessionName,
    sessionDescription: 'This is an example for Android web testing',
    deviceOrientation: 'portrait',
    captureScreenshots: true,
    browserName: 'chrome',
    deviceGroup: 'KOBITON',
    deviceName: device.deviceName,
    platformName: device.platformName,
    platformVersion: device.platformVersion
  }
}

export function desiredCapabilitiesAndroidApp(device, sessionName = 'Android app') {
  return {
    sessionName,
    sessionDescription: 'This is an example for Android app testing',
    deviceOrientation: 'portrait',
    captureScreenshots: true,
    app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ApiDemos-debug.apk',
    deviceGroup: 'KOBITON',
    deviceName: device.deviceName,
    platformName: device.platformName,
    platformVersion: device.platformVersion
  }
}

export function desiredCapabilitiesiOSWeb(device, sessionName = 'iOS web') {
  return {
    sessionName,
    sessionDescription: 'This is an example for iOS web testing',
    deviceOrientation: 'portrait',
    captureScreenshots: true,
    browserName: 'safari',
    deviceGroup: 'KOBITON',
    deviceName: device.deviceName,
    platformName: device.platformName,
    platformVersion: device.platformVersion
  }
}

export function desiredCapabilitiesiOSApp(device, sessionName = 'ios App') {
  return {
    sessionName,
    sessionDescription: 'This is an example for iOS app testing',
    deviceOrientation: 'portrait',
    captureScreenshots: true,
    app: 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
    deviceGroup: 'KOBITON',
    browserName: '',
    deviceName: device.deviceName,
    platformName: device.platformName,
    platformVersion: device.platformVersion
  }
}
