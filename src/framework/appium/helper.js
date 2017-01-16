import config from '../config/test'
import pick from 'lodash/pick'

export function convertToDesiredCapabilities(devices, {
  orientation = config.deviceOrientation,
  captureScreenshots = true
} = {}) {
  return devices
    .map((d) => {
      const desiredCapFields = pick(d, 'platformName', 'platformVersion', 'deviceName', 'udid')
      const browserName = getDefaultBrowserBy(desiredCapFields.platformName)
      return {...desiredCapFields, orientation, captureScreenshots, browserName}
    })
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
