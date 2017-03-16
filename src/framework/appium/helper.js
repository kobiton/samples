import config from '../config/test'
import pick from 'lodash/pick'
import Key from '../api/key'
import api from '../api'
import moment from 'moment'

let apiKey
let point = moment().format('YYYY-MM-DD-HH-mm')

export function convertToDesiredCapabilities(devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = config.device.captureScreenshots
} = {}) {
  return devices
    .map((d) => {
      const desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName', 'udid')
      let deviceGroup = (d.udid) ? '' : getDeviceGroup(d)
      const sessionName =
      (d.udid) ? `Auto web on ${d.udid}` : 'Auto web session'
      const sessionDescription = `Auto web session on device ${d.deviceName} at ${point}`
      const browserName = getDefaultBrowserBy(desiredCapFields.platformName)
      return {...desiredCapFields, deviceOrientation, captureScreenshots,
        browserName, deviceGroup, sessionName, sessionDescription}
    })
}

export function convertToDesiredCapabilitiesApp(appInfor, devices, {
  deviceOrientation = config.deviceOrientation,
  captureScreenshots = config.device.captureScreenshots
} = {}) {
  return devices
    .map((d) => {
      let desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName')
      let deviceGroup = (d.udid) ? '' : getDeviceGroup(d)
      const sessionName =
      (d.udid) ? `Auto app session on ${d.udid}` : 'Auto app session'
      const sessionDescription = `Auto app session on device ${d.deviceName} at ${point}`
      const desiredCapApp = Object.assign(appInfor, desiredCapFields)
      return {...desiredCapApp, deviceOrientation,
        captureScreenshots, deviceGroup, sessionName, sessionDescription}
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
  if (device.isCloud || (device.isCloud && device.udid === null)) {
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
