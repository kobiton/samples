import config from '../core/config'

export function convertToDesiredCapabilities({
  devices,
  orientation = config.deviceOrientation,
  captureScreenshots = true
}) {
  return devices
    .map((d) => {
      const {platformName, platformVersion, deviceName, udid} = d
      const pickDevice = {
        platformName,
        platformVersion,
        deviceName,
        udid,
        orientation,
        captureScreenshots
      }

      const browserName = getDefaultBrowserBy(platformName)
      return {...pickDevice, browserName}
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
