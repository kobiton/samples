import config from '../config/test'
import pick from 'lodash/pick'
import api from '../api'

export function convertToDesiredCapabilities(devices, {
  deviceOrientation = config.device.orientation,
  captureScreenshots = true
} = {}) {
  return devices
    .map((d) => {
      const desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName', 'udid')
      const browserName = getDefaultBrowserBy(desiredCapFields.platformName)
      return {...desiredCapFields, deviceOrientation, captureScreenshots, browserName}
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
