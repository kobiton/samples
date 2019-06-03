import {executeJsonwiredTest} from '../../../../framework/appium/web/index'
import config from '../../../../framework/config/test'
import {getDefaultBrowserBy} from '../../../../framework/appium/helper'

const timeout = 90000 // milliseconds
const platformNameArg = config.device.platformName
const desiredCapabilities = {
  browserName: getDefaultBrowserBy(platformNameArg),
  deviceName: '*',
  platformName: platformNameArg
}
setTimeout(async () => {
  describe('[Test Jsonwired on local device]', async () => {
    it('should run Jsonwired test successfully', async() => {
      await executeJsonwiredTest({desiredCapabilities, timeout})
    })
  })
  run()
}, 1000)
