import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {executeMailinatorPageTest} from '../../../../framework/appium/web/index'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'

const timeout = 60000 // milliseconds
const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineDevices
let onlineCaps
let id

setTimeout(async () => {
  onlineDevices = await Device.getOnlineDevices()
  onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
  assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
  id = (onlineCaps[0].udid) ? `${onlineCaps[0].udid}` : ''
  describe('[appium-web]: Test desired capability', async () => {
    beforeEach(async () => {
      onlineDevices = await Device.getOnlineDevices()
      onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
      assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online devices')
      id = (onlineCaps[0].udid) ? `${onlineCaps[0].udid}` : ''

    })

    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      it(`${timestamps} - should run successfully test with full valid desireCap`, async () => {
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })

    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      it('should run successfully test with none udid', async () => {
        if (onlineCaps[0].udid) {
          delete onlineCaps[0].udid
          await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
        }
      })
    })
    if (onlineCaps[0].deviceGroup === 'ORGANIZATION') {
      describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
        it(`${timestamps} - should run successfully test with just udid`,
          async () => {
            delete onlineCaps[0].deviceName
            delete onlineCaps[0].platformName
            delete onlineCaps[0].platformVersion
            await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
          })
      })
    }

    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      if (onlineCaps[0].platformName === 'Android') {
        it(`${timestamps} - should run successfully test web with Chrome Beta`, async () => {
          onlineCaps[0].browserName = 'chromebeta'
          await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
        })
      }
    })

    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      it('`${timestamps} - should run successfully test with device orientation is landscape',
      async () => {
        onlineCaps[0].deviceOrientation = 'landscape'
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })

    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      it('should run successfully test with CaptureScreenshots is true', async () => {
        onlineCaps[0].CaptureScreenshots = 'true'
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })

    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      it('should run successfully test with substring deviceName', async () => {
        onlineCaps[0].deviceName = onlineCaps[0].deviceName.slice(0, -3)
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })
    
    describe(`${onlineCaps[0].deviceName} ${id}: ${onlineCaps[0].platformVersion}`, async () => {
      it('should run successfully test with substring PlatformVersion', async () => {
        onlineCaps[0].platformVersion = onlineCaps[0].platformVersion.slice(0, -1)
        await executeMailinatorPageTest({desiredCapabilities: onlineCaps[0], timeout})
      })
    })

  })
  run()
}, 1000)
