import Device from '../../../framework/api/device'
import moment from 'moment'
import {convertToDesiredCapabilities} from '../../../framework/appium/helper'
import {_webBenchmark, _logResult} from './helper'

const url = 'http://automationpractice.com/index.php?controller=authentication&back=my-account'
const timestamps = moment().format('YYYYMMDDHHmmss')

describe('web benchmark testing', () => {
  it('should show benchmark result', async () => {
    const onlineDevices = await Device.getDevices()
    if (onlineDevices.length > 0) {
      const onlineCloudDesiresCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
      const result = await _webBenchmark(onlineCloudDesiresCaps, url)
      _logResult(result, 'web_benchmark_result.csv')
    }
    else {
      throw new Error('Cannot find any online device')
    }
  })
})
