import {getOnlineCaps} from '../../../../framework/appium/helper'
import config from '../../../../framework/config/test'
import {executeMultipleDevicesParallelTest} from '../../../../framework/appium/web'

setTimeout(async () => {
// Get online capabilities
  const onlineCaps = await getOnlineCaps({
    deviceNumbers: config.device.number
  })
  const timeout = 60000 // milliseconds

  for (let i = 0; i < config.longTestSuiteIterationAmount; i++) {
    describe(`[appium-web]: run ${onlineCaps.length} devices parallel iteration: ${i}`,
      async () => {

        let listTestResults

        before(async () => {
          // Run test here to get the result of all devices
          listTestResults = await executeMultipleDevicesParallelTest({
            desiredCapsList: onlineCaps,
            durationInMinutes: config.expectedDurationInMinutes,
            timeout})
        })
        for (let i = 0; i < onlineCaps.length; i++) {
          describe(`${onlineCaps[i].deviceName} : ${onlineCaps[i].platformVersion} `, async () => {
            it(`should run auto web in ${config.expectedDurationInMinutes} minutes.`, async () => {
              if (listTestResults[i].status === 'rejected') {
                throw new Error(JSON.stringify(listTestResults[i].err))
              }
            })
          })
        }
      })
  }
  run()
}, 1000)
