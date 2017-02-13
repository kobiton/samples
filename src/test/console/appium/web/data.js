import faker from 'faker'

export const desiredCapabilities = {
  getPortrait: (cap) => ({...cap, deviceOrientation: 'portrait'}),
  getLandscape: (cap) => ({...cap, deviceOrientation: 'landscape'}),
  getNotCaptureScreenshots: (cap) => ({...cap, captureScreenshots: false}),
  getMixedOrSubstringDeviceName: (cap) => ({...cap, deviceName: cap.deviceName.slice(0, -3)}),
  getMixedOrSubstringPlatformVersion: (cap) => {
    return {...cap, platformVersion: cap.platformVersion.slice(0, -1)}
  },
  getSessionNameAndDescription: (cap) => {
    return {
      ...cap,
      sessionName: faker.random.words(20).slice(0, 80),
      sessionDescription: faker.random.words(100).slice(0, 500)
    }
  },
  getNewCommandTimeout: (cap) => ({...cap, newCommandTimeout: 60})
}
