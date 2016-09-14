import _ from 'lodash'
import faker from 'faker'

export function generateTerms(times) {
  return _.times(times,
    () => generateTerm()
  )
}

export function generateTerm() {
  return faker.name.findName()
}

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
