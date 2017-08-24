import {assert} from 'chai'
import {getPrivateOnlineDevices} from '../../../../framework/appium/helper'
import config from '../../../../framework/config/test'
import {executeMultipleDevicesParallelTest} from '../../../../framework/appium/web'

setTimeout(async () => {
// Get online capabilities
  let onlineCaps = await getPrivateOnlineDevices()
  onlineCaps = onlineCaps.slice(0, 2)

  const timeout = 30000 // milliseconds

  describe(`[appium-web]: run ${onlineCaps.length} devices`,
    async () => {

      let listTestResults

      before(async () => {
        assert.isAtLeast(onlineCaps.length, 2, 'should have atleast 2 online devices')
        // Run test here to get the result of all devices
        listTestResults = await executeMultipleDevicesParallelTest({
          desiredCapsList: onlineCaps,
          durationInMinutes: config.expectedDurationInMinutes,
          timeout})
      })
      for (let i = 0; i < onlineCaps.length; i++) {
        describe(`${onlineCaps[i].deviceName} : ${onlineCaps[i].udid} `, async () => {
          it(`should run auto web in ${config.expectedDurationInMinutes} minutes.`, async () => {
            if (listTestResults[i].status === 'rejected') {
              throw new Error(JSON.stringify(listTestResults[i].err))
            }
          })
        })
      }
    })
  run()
}, 1000)
