import {assert} from 'chai'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeKobitonPageTest} from '../../../../framework/appium/web/index'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'

const timeout = 60000 // milliseconds
const runLoop = config.longTestSuiteIterationAmount

setTimeout(async () => {
  const onlineDevices = await Device.getOnlineDevices()
  const onlineCaps = await convertToDesiredCapabilities(onlineDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
  describe('[appium-web] : kobiton page', async () => {
    for (let n = 0; n < onlineCaps.length; n++) {
      let id = (onlineCaps[n].udid) ? `${onlineCaps[n].udid}` : ''
      describe(`[${n + 1}]${onlineCaps[n].deviceName} ${id}: ${onlineCaps[n].platformVersion}`,
      async () => {
        for (let i = 0; i < runLoop; i++) {
          it(`should run successfully test in loop ${i + 1}/${runLoop}`, async () => {
            await executeKobitonPageTest({desiredCapabilities: onlineCaps[n], timeout})
          })
        }
      })
      run()
    }
  })
}, 1000)
