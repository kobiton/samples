import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeAndroidHybridApp} from '../../../../framework/appium/app'

const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')

setTimeout(async () => {
  const onlineCaps = await Device.getOnlineDevices({
    platformName: 'Android'
  })
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
  describe('[appium-app] : android-hybrid', async () => {
    for (let n = 0; n < onlineCaps.length; n++) {
      let udid = (onlineCaps[n].udid) ? `with ${onlineCaps[n].udid}` : ''
      describe(`[${n + 1}]${onlineCaps[n].deviceName} ${udid}:${onlineCaps[n].platformVersion}`,
      async () => {
        for (let i = 0; i < runLoop; i++) {
          it(`${timestamps} - should run successfully test in loop ${i + 1}/${runLoop}`,
            async () => {
              const successfulResult = await executeAndroidHybridApp(timestamps, [onlineCaps[n]])
              assert.equal(successfulResult, 1, 'Expected one device is run successfully')
            })
        }
      })
    }
  })
  run()
}, 1000)
