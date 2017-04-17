import {assert} from 'chai'
import moment from 'moment'
import {executeAppTest} from './executor'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeIOSNativeApp} from '../../../../framework/appium/app'

const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')

setTimeout(async () => {
  const devices = await Device.getOnlineDevices({
    platformName: 'iOS'
  })
  assert.isAtLeast(devices.length, 1, 'Expected at least 1 online devices')
  describe('[appium-app] : iOS - native', async () => {
    await executeAppTest(executeIOSNativeApp, {timestamps, devices, runLoop})
  })
  run()
}, 1000)
