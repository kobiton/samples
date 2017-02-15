import config from '../config/test'
import pick from 'lodash/pick'
import Key from '../api/key'
import api from '../api'

let apiKey

export function convertToDesiredCapabilities(devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = config.device.captureScreenshots
} = {}) {
  return devices
    .map((d) => {
      const desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName', 'udid')
      const browserName = getDefaultBrowserBy(desiredCapFields.platformName)
      return {...desiredCapFields, deviceOrientation, captureScreenshots, browserName}
    })
}

export function convertToDesiredCapabilitiesApp(appInfor, devices, {
  deviceOrientation = config.deviceOrientation,
  captureScreenshots = config.device.captureScreenshots
} = {}) {
  return devices
    .map((d) => {
      let deviceGroup = getDeviceGroup(d)
      let desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName')
      const desiredCapApp = Object.assign(appInfor, desiredCapFields)
      return {...desiredCapApp, deviceOrientation, captureScreenshots, deviceGroup}
    })
}

export async function getOnlineCaps({deviceNumbers}) {
  const devices = await api.Device.getOnlineDevices({deviceNumbers})
  return convertToDesiredCapabilities(devices)
}

function getDefaultBrowserBy(platformName) {
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
  else if (device.isMyOrg) {
    return 'ORGANIZATION'
  }
  else if (device.isMyOwn) {
    return 'PERSONAL'
  }
  else {
    throw new Error('This device doesn\'t belong any group')
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
    throw Error('Can\'t not get a valid apiKey')
  }
}

export async function createServerConfig() {
  apiKey = await getApiKey()
  return {
    host: config.autoTestHostname,
    auth: `${config.username1}:${apiKey}`,
    port: config.autoTestPort
  }
}
