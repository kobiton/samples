import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeMailinatorPageTest} from '../../../../framework/appium/web/index'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'

const timeout = 60000 // milliseconds
const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')

setTimeout(async () => {
  const neededDevices = await Device.getOnlineDevices()
  assert.isAtLeast(neededDevices.length, 1, 'Expected at least 1 online devices')
  describe('[appium-web] : Mailinator page', async () => {
    for (const device of neededDevices) {
      let id = (device.udid) ? `with udid ${device.udid}` : ''
      describe(`Test ${device.deviceName}: ${device.platformVersion} ${id}`,
      async () => {
        const metadata = {...device} // Clones the object
        for (let i = 0; i < runLoop; i++) {
          it(`${timestamps} - Loop ${i + 1}/${runLoop} ${JSON.stringify(metadata)}`,
          async function () { // Use function instead of arrow function to call skip()
            const deviceIsOnline = await Device.isOnlineDevice(device)
            if (deviceIsOnline) {
              let onlineCaps = await convertToDesiredCapabilities(timestamps, [device])
              onlineCaps[0].browserName = 'chromebeta'
              await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
            }
            else {
              debug.log(`Device ${device.deviceName} is not online to run`)
              this.skip()
            }
          })
        }
      })
    }
  })
  run()
}, 1000)
