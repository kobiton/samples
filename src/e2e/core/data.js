import _ from 'lodash'
import faker from 'faker'

// Each loop time takes approximately two minutes
export const smallListSearchTerms = generateTerms(5)
export const shortListSearchTerms = generateTerms(30)
export const longListSearchTerms = generateTerms(60)
export const hugeListSearchTerms = generateTerms(120)

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
