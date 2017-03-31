import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeIOSNativeApp} from '../../../../framework/appium/app'

const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')

setTimeout(async () => {
  const neededDevices = await Device.getOnlineDevices({
    platformName: 'iOS'
  })
  assert.isAtLeast(neededDevices.length, 1, 'Expected at least 1 online devices')
  describe('[appium-app] : iOS - native', async () => {
    for (const device of neededDevices) {
      let id = (device.udid) ? `with udid ${device.udid}` : ''
      describe(`Test ${device.deviceName}: ${device.platformVersion} ${id}`,
      async () => {
        const metadata = {...device} // Clones the object
        for (let i = 0; i < runLoop; i++) {
          it(`${timestamps} - Loop ${i + 1}/${runLoop} ${JSON.stringify(metadata)}`, async () => {
            const deviceIsOnline = await Device.isOnlineDevice(device)
            if (deviceIsOnline) {
              const successfulResult = await executeIOSNativeApp(timestamps, [device])
              assert.equal(successfulResult, 1, 'Expected one device is run successfully')
            }
            else {
              debug.log(`Device ${device.deviceName} is not online to run`)
            }
          })
        }
      })
    }
  })
  run()
}, 1000)
