import pick from 'lodash/pick'
import moment from 'moment'
import api from '../api'
import Key from '../api/key'
import config from '../config/test'

export function convertToDesiredCapabilities(timestamp, devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = config.device.captureScreenshots,
  automationName = config.device.automationName
} = {}) {
  return devices
    .map((d) => {
      const desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName',
        'udid', 'automationName')
      let deviceGroup = getDeviceGroup(d)
      if (deviceGroup === 'KOBITON') {
        delete desiredCapFields.udid
      }
      const sessionName = `${timestamp} - Auto web on ${d.udid}`
      const sessionDescription = `Auto web session on device ${d.deviceName}`
      const browserName = getDefaultBrowserBy(desiredCapFields.platformName)
      if (d.platformName === 'Android' && automationName.toUpperCase() === 'UIAUTOMATOR2' &&
       d.platformVersion.split('.')[0] >= 5) {
        desiredCapFields.automationName = automationName
      }
      return {...desiredCapFields, deviceOrientation, captureScreenshots,
        browserName, deviceGroup, sessionName, sessionDescription}
    })
}

export function convertToLocalDesiredCapabilitiesApp(appInfo, device) {
  const deviceName = '*'
  const platformName = device[0].platformName
  return {...appInfo, deviceName, platformName}
}

export function convertToDesiredCapabilitiesApp(timestamp, appInfo, devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = config.device.captureScreenshots,
  automationName = config.device.automationName
} = {}) {
  return devices
    .map((d) => {
      let desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName',
        'udid', 'automationName')
      let deviceGroup = getDeviceGroup(d)
      if (deviceGroup === 'KOBITON') {
        delete desiredCapFields.udid
      }
      const sessionName = `${timestamp} - Auto app on ${d.udid}`
      const sessionDescription = `Auto app session on device ${d.deviceName}`
      const desiredCapApp = Object.assign(appInfo, desiredCapFields)

      if (d.platformName === 'Android' && automationName.toUpperCase() === 'UIAUTOMATOR2' &&
       d.platformVersion.split('.')[0] >= 5) {
        desiredCapFields.automationName = automationName
      }

      return {...desiredCapApp, deviceOrientation,
        captureScreenshots, deviceGroup, sessionName, sessionDescription}
    })
}

export async function getOnlineCaps() {
  const devices = await api.Device.getDevices({
    onlineDeviceOnly: true
  })
  const timestamps = moment().format('YYYYMMDDHHmmss')
  return convertToDesiredCapabilities(timestamps, devices)
}

export function getDefaultBrowserBy(platformName) {
  let browserName
  if (platformName) {
    switch (platformName.toLowerCase()) {
      case 'android':
        browserName = 'chrome'
        break
      case 'ios':
        browserName = 'safari'
        break
    }
  }

  return browserName
}

function getDeviceGroup(device) {
  if (device.isCloud) {
    return 'KOBITON'
  }
  else if (device.isMyOrg || device.isMyOwn) {
    return 'ORGANIZATION'
  }
  else {
    throw new Error('This device doesn\'t belong to any group')
  }
}

export async function getApiKey() {
  const allKeys = (await Key.getAll()).map((t) => {
    return t.key
  })
  if (allKeys.length > 0) {
    return allKeys[0]
  }
  else {
    throw Error('Can not get a valid apiKey')
  }
}

export async function createServerConfig() {
  if (config.environment === 'LOCAL') {
    return {
      protocol: 'http',
      host: '127.0.0.1',
      port: 4723
    }
  }
  return {
    host: config.autoTestHostname,
    auth: `${config.username1}:${config.apiKey}`,
    port: config.autoTestPort
  }
}
