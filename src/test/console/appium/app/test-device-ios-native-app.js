import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeIOSNativeApp} from '../../../../framework/appium/app'

const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')

setTimeout(async () => {
  const onlineCaps = await Device.getOnlineDevices({
    platformName: 'iOS'
  })
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
  describe('[appium-app] : iOS-native', async () => {
    for (let n = 0; n < onlineCaps.length; n++) {
      let udid = (onlineCaps[n].udid) ? `with ${onlineCaps[n].udid}` : ''
      describe(`[${n + 1}]${onlineCaps[n].deviceName} ${udid}:${onlineCaps[n].platformVersion}`,
      async () => {
        for (let i = 0; i < runLoop; i++) {
          it(`${timestamps} - should run successfully test in loop ${i + 1}/${runLoop}`,
            async () => {
              const successfulResult = await executeIOSNativeApp(timestamps, [onlineCaps[n]])
              assert.equal(successfulResult, 1, 'Expected one device is run successfully')
            })
        }
      })
    }
  })
  run()
}, 1000)
