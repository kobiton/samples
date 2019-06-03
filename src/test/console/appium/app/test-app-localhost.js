import moment from 'moment'
import {debug} from '@kobiton/core-util'
import config from '../../../../framework/config/test'
import {nativeAppCheck,
        hybridAppCheck,
        fullApisCheck} from '../../../../framework/appium/app'

const timestamps = moment().format('YYYYMMDDHHmmss')
const type = config.typeOfTest
const testMethodList = {
  'android_native_app': nativeAppCheck,
  'ios_native_app': nativeAppCheck,
  'android_hybrid_app': hybridAppCheck,
  'ios_hybrid_app': hybridAppCheck,
  'android_full_apis': fullApisCheck,
  'ios_full_apis': fullApisCheck
}
const isExistedTestMethod = Object.keys(testMethodList).includes(type)

setTimeout(async () => {
  describe('[Test full apis app test on local device]', async () => {
    it('should run full apis app test successfully', async() => {
      if (isExistedTestMethod) {
        // eslint-disable-next-line max-len
        const platformNameArg = (/(android)|(ios)/.exec(type)[0] === 'android') ? 'Android' : 'iOS'
        const testMethod = testMethodList[type]
        const targetDevice = [{
          platformName: platformNameArg
        }]
        debug.log('Start full apis app test with:', type)
        const result = await testMethod(timestamps, targetDevice)
        if (result.errors && result.errors.length) {
          throw result.errors[0]
        }
      }
      else {
        throw new Error(`${type} is not existed. Please choose another valid test`)
      }
    })
  })
  run()
}, 2000)
