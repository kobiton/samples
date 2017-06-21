import moment from 'moment'
import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import Device from '../../../../framework/api/device'
import config from '../../../../framework/config/test'
import {nativeAppCheck,
        hybridAppCheck} from '../../../../framework/appium/app'

const runLoop = config.longTestSuiteIterationAmount
const timestamps = moment().format('YYYYMMDDHHmmss')
const type = config.typeOfTest
const testMethodList = {
  'android_native_app': nativeAppCheck,
  'ios_native_app': nativeAppCheck,
  'android_hybrid_app': hybridAppCheck,
  'ios_hybrid_app': hybridAppCheck
}
const isExistedTestMethod = Object.keys(testMethodList).includes(type)

setTimeout(async () => {
  if (isExistedTestMethod) {
    try {
      const platformName = /(android)|(ios)/.exec(type)[0]
      const testMethod = testMethodList[type]
      debug.log('Start smoke test with:', type)
      const devices = await Device.getOnlineDevices({
        platformName: `${platformName}`
      })
      assert.isAtLeast(devices.length, 1, 'Expected at least 1 online devices')
      for (const device of devices) {
        const id = (device.udid) ? `with udid ${device.udid}` : ''
        describe(`Test ${device.deviceName}: ${device.platformVersion} ${id}`,
          async () => {
            const metadata = {...device} // Clones the object
            for (let i = 0; i < runLoop; i++) {
              it(`${timestamps} - Loop ${i + 1}/${runLoop} ${JSON.stringify(metadata)}`,
              async function () { // Use function to call skip()
                const isOnline = await Device.isOnlineDevice(device)
                if (isOnline) {
                  const result = await testMethod(timestamps, [device])
                  if (result.errors && result.errors.length) {
                    throw result.errors[0]
                  }
                }
                else {
                  debug.log(`Device ${device.deviceName} is not online to run`)
                  this.skip()
                }
              })
            }
          }
        )
      }
    }
    catch (err) {
      debug.error('smoke-test', err)
    }
  }
  else {
    throw new Error(`${type} is not existed. Please choose another valid test`)
  }
  run()
}, 2000)
