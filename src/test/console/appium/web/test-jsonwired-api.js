import {getOnlineCaps} from '../../../../framework/appium/helper'
import config from '../../../../framework/config/test'
import {executeJsonwiredTest} from '../../../../framework/appium/web'

setTimeout(async () => {
// Get online capabilities
  const onlineCaps = await getOnlineCaps({
    deviceNumbers: config.device.number
  })
  const timeout = 30000 // milliseconds

  describe('[appium-web]: jsonewired protocol', async () => {

    onlineCaps.forEach((cap) => {
      // Generate test suite for each of device
      describe(`${cap.deviceName} : ${cap.platformVersion} `, async () => {
        it('should cover jsonwired apis', async () => {
          await executeJsonwiredTest({desiredCapabilities: cap, timeout})
        })
      })

    })
  })

  run()

}, 1000)
