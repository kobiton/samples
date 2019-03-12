import {assert} from 'chai'
import moment from 'moment'
import Device from '../../../../framework/api/device'
import {convertToDesiredCapabilities} from '../../../../framework/appium/helper'

const timeout = 60000 // milliseconds
const timestamps = moment().format('YYYYMMDDHHmmss')
let onlineDevices = []
let onlineCaps = []

setTimeout(async () => {
  describe('[appium-web]: Test desired capability', async () => {

    beforeEach(async () => {
      onlineDevices = await Device.getDevices()
      onlineCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
      assert.isAtLeast(onlineCaps.length, 1, 'Expected at least 1 online device')
    })

    describe('device group', async () => {

      it('should run test successfully with none udid', async () => {

      })
    })
  })

  run()
}, 1000)
