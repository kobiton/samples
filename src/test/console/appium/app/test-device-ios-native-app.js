import {assert} from 'chai'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeIOSNativeApp} from '../../../../framework/appium/app'

const expectedDurationInMinutes = config.expectedDurationInMinutes
const sessionAmount = 1

setTimeout(async () => {
  const onlineCaps = await Device.getOnlineDevices({
    platformName:'iOS',
    deviceNumbers: config.device.number
  })
  describe('[appium-app] : ios-native', async () => {
    onlineCaps.forEach((device) => {
      describe(`${device.deviceName} : ${device.platformVersion} `, async () => {
        it(`should run test in ${expectedDurationInMinutes} minutes`, async () => {
          const successfulResult = await executeIOSNativeApp(
            [device],
            {
              sessionDuration: expectedDurationInMinutes * 60,
              sessionAmount
            })
          assert.equal(successfulResult, 1, 'Expected one device is run successfully')
      })
    })
  })
})
  run()
}, 1000)
