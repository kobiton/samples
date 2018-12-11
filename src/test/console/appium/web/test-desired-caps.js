import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {executeMailinatorPageTest} from '../../../../framework/appium/web/index'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'

const timeout = 60000 // milliseconds
const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineAndroidDevices = []
let onlineDevices = []
let onlineCaps = []
let desiredCap

setTimeout(async () => {
  describe('[appium-web]: Test desired capability', async () => {

    beforeEach(async () => {
      onlineDevices = await Device.getDevices()
      onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
      assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online device')
    })

    describe('cloud devices', async () => {
      it('should run test successfully with none udid', async () => {
        desiredCap = onlineCaps[0]
        if (desiredCap.udid) {
          delete desiredCap.udid
        }
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})

      })
    })

    describe('org devices', async () => {
      it('should run test successfully with just udid',
        async () => {
          desiredCap = onlineCaps.filter(
            (device) => device.deviceGroup.toLowerCase() === 'organization')[0]
          assert.isAtLeast(onlineCaps.length, 1, 'No matching device to run test')
          delete desiredCap.deviceName
          delete desiredCap.platformName
          delete desiredCap.platformVersion
          await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
        })
    })

    describe('android devices', async () => {
      it('should run test successfully web with Chrome Beta', async () => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        assert.isAtLeast(onlineCaps.length, 1, 'No matching device to run test')
        desiredCap.browserName = 'chromebeta'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('all devices', async () => {
      it('should run test successfully with device orientation is landscape',
      async () => {
        desiredCap = onlineCaps[0]
        desiredCap.deviceOrientation = 'landscape'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('all devices', async () => {
      it('should run test successfully with CaptureScreenshots is true', async () => {
        desiredCap = onlineCaps[0]
        desiredCap.captureScreenshots = true
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if UIAutomator2 is used for version >= 5.0', async () => {
        onlineAndroidDevices = onlineCaps.filter((device) => device.platformName === 'Android')
        desiredCap = onlineAndroidDevices.filter(
          (device) => parseInt(device.platformVersion.split('.')[0]) >= 5)[0]
        assert.isAtLeast(onlineCaps.length, 1, 'No matching device to run test')
        onlineCaps[0].automationName = 'UIAutomator2'
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if Appium is used for android device', async() => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'Appium'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', async () => {
      it('should work if automationName is set to lowercase', async() => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'appium'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })

      it('should work if automationName is set to uppercase', async() => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'APPIUM'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })

      it('should work if automationName is mixed of uppercase and lowercase', async() => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'ApPium'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android device version < 5.0', () => {
      it('should show error if UIAutomator2 is used', async() => {
        const expectedErrorMsg = 'UIAutomator2 is not supported on Android device with version < 5'
        onlineAndroidDevices = onlineCaps.filter((device) => device.platformName === 'Android')
        desiredCap = onlineAndroidDevices.filter(
          (device) => parseInt(device.platformVersion.split('.')[0]) < 5)[0]
        assert.isAtLeast(onlineCaps.length, 1, 'No matching device to run test')
        desiredCap.automationName = 'UIAutomator2'
        try {
          await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
        }
        catch (error) {
          assert.isTrue(error.toString()
          .includes(expectedErrorMsg), 'expected error message was not found')
        }
      })
    })

    describe('on android devices', () => {
      it('should work if Espresso is used', async () => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'Espresso'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if UIAutomator is used', async () => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'UIAutomator'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if UIAutomation is used', async () => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'UIAutomation'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if Selendroid is used', async () => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'Selendroid'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

    describe('on android devices', () => {
      it('should work if YouIEngine is used', async () => {
        desiredCap = onlineCaps.filter((device) => device.platformName === 'Android')[0]
        desiredCap.automationName = 'YouIEngine'
        await executeMailinatorPageTest({desiredCapabilities: desiredCap, timeout})
      })
    })

  })

  run()
}, 1000)
