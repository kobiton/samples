import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {executeMailinatorPageTest} from '../../../../framework/appium/web/index'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'

const timeout = 60000 // milliseconds
const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineDevices = []
let onlineCaps = []
let desiredCap = {}

setTimeout(async () => {
  onlineDevices = await Device.getOnlineDevices()
  onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
  describe('[appium-web]: Test desired capability', async () => {

    beforeEach(async () => {
      onlineDevices = await Device.getOnlineDevices()
      onlineCaps = await convertToDesiredCapabilities(timestamps,
        await Device.platformFilter(onlineDevices))
      desiredCap = {...onlineCaps[0], automationName: ''}
      assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
    })

    describe('all devices', async () => {
      it('should run successfully test with none udid', async () => {
        if (desiredCap.udid) {
          delete desiredCap.udid
        }
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})

      })
    })

    if (desiredCap.deviceGroup === 'ORGANIZATION') {
      describe('org devices', async () => {
        it(`${timestamps} - should run successfully test with just udid`,
          async () => {
            delete desiredCap.deviceName
            delete desiredCap.platformName
            delete desiredCap.platformVersion
            await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
          })
      })
    }

    describe('android devices', async () => {
      if (desiredCap.platformName === 'Android') {
        it(`${timestamps} - should run successfully test web with Chrome Beta`, async () => {
          desiredCap.browserName = 'chromebeta'
          await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
        })
      }
    })

    describe('landscape supported devices', async () => {
      it('`${timestamps} - should run successfully test with device orientation is landscape',
      async () => {
        desiredCap.deviceOrientation = 'landscape'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('all devices', async () => {
      it('should run successfully test with CaptureScreenshots is true', async () => {
        desiredCap.CaptureScreenshots = 'true'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('all devices', async () => {
      it('should run successfully test with substring deviceName', async () => {
        desiredCap.deviceName = desiredCap.deviceName.slice(0, -3)
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('all devices', async () => {
      it('should run successfully test with substring PlatformVersion', async () => {
        desiredCap.platformVersion = desiredCap.platformVersion.slice(0, -1)
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if UIAutomator2 is used for version >= 5.0', async () => {
        let androidDevices = await Device.platformFilter(onlineDevices)
        let onlineCaps = await convertToDesiredCapabilities(timestamps,
          await Device.androidVersionFilter(androidDevices))
        onlineCaps[0].automationName = 'UIAutomator2'
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if Appium is used for android device', async() => {
        desiredCap.automationName = 'Appium'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', async () => {
      it('should work if automationName is set to lowercase', async() => {
        desiredCap.automationName = 'appium'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })

      it('should work if automationName is set to uppercase', async() => {
        desiredCap.automationName = 'APPIUM'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })

      it('should work if automationName is mixed of uppercase and lowercase', async() => {
        desiredCap.automationName = 'ApPium'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android device version < 5.0', () => {
      it('should show error if UIAutomator2 is used', async() => {
        const expectedErrorMsg = 'UIAutomator2 is not supported on Android device with version < 5'
        let androidDevices = await Device.platformFilter(onlineDevices)
        let onlineCaps = await convertToDesiredCapabilities(timestamps,
          await Device.androidVersionFilter(androidDevices, '5-'))
        onlineCaps[0].automationName = 'UIAutomator2'
        try {
          await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
        }
        catch (error) {
          assert.isTrue(error.toString()
          .includes(expectedErrorMsg), 'expected error message was not found')
        }
      })
    })

    describe('on android devices', () => {
      it('should work if Espresso is used', async () => {
        desiredCap.automationName = 'Espresso'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if UIAutomator is used', async () => {
        desiredCap.automationName = 'UIAutomator'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if UIAutomation is used', async () => {
        desiredCap.automationName = 'UIAutomation'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if Selendroid is used', async () => {
        desiredCap.automationName = 'Selendroid'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if YouIEngine is used', async () => {
        desiredCap.automationName = 'YouIEngine'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

  })

  run()
}, 1000)
