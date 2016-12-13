import _ from 'lodash'
import faker from 'faker'
import {getUserInfo, getOnlineDevices} from '../../core/portal-api'
import jsonfile from 'jsonfile'

const file = 'reports/onlineDevices.json'

export async function getAllOnlineDevice() {
  const userInfo = await getUserInfo()
  const onlineDevices = await getOnlineDevices(userInfo.token)
  return onlineDevices
}

/**
 * Get a device in the last from saved online devices, then save the remaining devices
 */
export function getADevice() {
  const onlineDevices = jsonfile.readFileSync(file)
  const deviceName = onlineDevices.pop()
  saveOnlineDevices(onlineDevices)
  return deviceName
}

/**
 * Save online devices into a default file
 */
export function saveOnlineDevices(onlineDevices) {
  jsonfile.writeFileSync(file, onlineDevices, {spaces: 2})
}

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
