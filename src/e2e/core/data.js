import _ from 'lodash'
import faker from 'faker'

// Each loop takes approximately 45 seconds
export const smallListSearchTerms = generateTerms(150) // ~ 1.5 hours
export const shortListSearchTerms = generateTerms(250) // ~ 3 hours
export const longListSearchTerms = generateTerms(350) // ~ 4 hours
export const hugeListSearchTerms = generateTerms(450) // ~ 5 hours

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

function generateTerms(times) {
  return _.times(times,
    () => faker.name.findName()
  )
}
