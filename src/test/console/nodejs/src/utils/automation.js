import Url from 'url'
import configs from '../configs'
import KeyService from '../service/KeyService'

export async function kobitonServerUrl() {
  const apiUrl = Url.parse(configs.apiUrl)

  const apiKey = await KeyService.getApiKey()

  const config = {
    host: apiUrl.hostname,
    auth: `${apiKey.username}:${apiKey.key}`,
    port: (apiUrl.port === 443) ? 80 : apiUrl.port || 80
  }

  return config
}

export function desiredCapabilitiesAndroidWeb(device) {
  return {
    sessionName: 'Android web',
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

export function desiredCapabilitiesAndroidApp(device) {
  return {
    sessionName: 'Android app',
    sessionDescription: 'This is an example for Android app testing',
    deviceOrientation: 'portrait',
    captureScreenshots: true,
    app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/ApiDemos-debug.apk',
    deviceGroup: 'KOBITON',
    deviceName: device.deviceName,
    platformName: device.platformName,
    platformVersion: device.platformVersion
  }
}

export function desiredCapabilitiesiOSWeb(device) {
  return {
    sessionName: 'iOS web',
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

export function desiredCapabilitiesiOSApp(device) {
  return {
    sessionName: 'iOS app',
    sessionDescription: 'This is an example for iOS app testing',
    deviceOrientation: 'portrait',
    captureScreenshots: true,
    app: 'https://s3.amazonaws.com/kobiton-dev/apps-test/UIKitCatalog-Test-Adhoc.ipa',
    deviceGroup: 'KOBITON',
    browserName: '',
    deviceName: device.deviceName,
    platformName: device.platformName,
    platformVersion: device.platformVersion
  }
}
