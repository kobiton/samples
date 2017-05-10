import config from '../config/test'
import pick from 'lodash/pick'
import Key from '../api/key'
import api from '../api'

let apiKey

export function convertToDesiredCapabilities(timestamp, devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = config.device.captureScreenshots
} = {}) {
  return devices
    .map((d) => {
      const desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName', 'udid')
      let deviceGroup = getDeviceGroup(d)
      const sessionName =
      (d.udid) ? `${timestamp} - Auto web on ${d.udid}` : `${timestamp} - Auto web session`
      const sessionDescription = `Auto web session on device ${d.deviceName}`
      const browserName = getDefaultBrowserBy(desiredCapFields.platformName)
      return {...desiredCapFields, deviceOrientation, captureScreenshots,
        browserName, deviceGroup, sessionName, sessionDescription}
    })
}

export function convertToDesiredCapabilitiesApp(timestamp, appInfor, devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = config.device.captureScreenshots
} = {}) {
  return devices
    .map((d) => {
      let desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName', 'udid')
      let deviceGroup = getDeviceGroup(d)
      const sessionName =
      (d.udid) ? `${timestamp} - Auto app session on ${d.udid}` : `${timestamp} - Auto app session`
      const sessionDescription = `Auto app session on device ${d.deviceName}`
      const desiredCapApp = Object.assign(appInfor, desiredCapFields)
      return {...desiredCapApp, deviceOrientation,
        captureScreenshots, deviceGroup, sessionName, sessionDescription}
    })
}

export async function getOnlineCaps({deviceNumbers}) {
  const devices = await api.Device.getOnlineDevices({deviceNumbers})
  return convertToDesiredCapabilities(new Date(), devices)
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
  if (device.isCloud && (device.udid === null || !device.udid)) {
    return 'KOBITON'
  }
  else if (device.isMyOrg || device.isMyOwn) {
    return 'ORGANIZATION'
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
    throw Error('Can not get a valid apiKey')
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
