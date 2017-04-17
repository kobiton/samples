import {assert} from 'chai'
import moment from 'moment'
import {executeAppTest} from './executor'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {executeAndroidNativeApp} from '../../../../framework/appium/app'

const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')

setTimeout(async () => {
  const neededDevices = await Device.getOnlineDevices({
    platformName: 'Android'
  })
  assert.isAtLeast(neededDevices.length, 1, 'Expected at least 1 online devices')
  describe('[appium-app] : android-native', async () => {
    await executeAppTest(executeAndroidNativeApp, {timestamps, devices: neededDevices, runLoop})
  })
  run()
}, 1000)
