import {getOnlineCaps} from '../../../../framework/appium/helper'
import config from '../../../../framework/config/test'
import {desiredCapabilities} from './data'
import {executeDesiredCapabilitiesTest} from '../../../../framework/appium/web'

const completeScenarios = {
  'portrait': desiredCapabilities.getPortrait,
  'landscape': desiredCapabilities.getLandscape,
  'no capture screen shot': desiredCapabilities.getNotCaptureScreenshots,
  'mixed or substring devicename': desiredCapabilities.getMixedOrSubstringDeviceName,
  'mixed or substring platform version': desiredCapabilities.getMixedOrSubstringPlatformVersion,
  'new command timeout': desiredCapabilities.getNewCommandTimeout,
  'session name and description': desiredCapabilities.getSessionNameAndDescription
}

setTimeout(async () => {
// Get online capabilities
  const onlineCaps = await getOnlineCaps({
    deviceNumbers: config.device.number
  })

  describe('[appium-web]: multiple desired capabilities', async () => {

    onlineCaps.forEach((cap) => {
      // Generate test suite for each device
      describe(`${cap.deviceName} : ${cap.platformVersion} `, async () => {

        Object.keys(completeScenarios).forEach((key) => {
          it(`${key}`, async () => {
            const getCap = completeScenarios[key]
            await executeDesiredCapabilitiesTest({desiredCapabilities: getCap(cap), timeout: 10000})
          })
        })
      })

    })
  })

  run()

}, 1000)
