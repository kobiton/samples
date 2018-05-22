import 'babel-polyfill'
import 'colors'
import Device from '../../../framework/api/device'
import {createDriver, quitDriver} from '../../../framework/appium/driver'
import moment from 'moment'
import {convertToDesiredCapabilities} from '../../../framework/appium/helper'
import fs from 'fs'

let driver
let url = 'http://automationpractice.com/index.php?controller=authentication&back=my-account'
let onlineCloudDesiresCaps = []
let result

const timestamps = moment().format('YYYYMMDDHHmmss')
describe('Benchmark testing for iOS device', () => {
  it('should show benchmark result', async () => {
    try {
      const onlineDevices = await Device.getOnlineDevices()
      if (onlineDevices.length > 0) {
        onlineCloudDesiresCaps = await convertToDesiredCapabilities(timestamps, onlineDevices)
      }
      const inProgressTests = await onlineCloudDesiresCaps.map(async(cap) => {
        driver = await createDriver(cap)
        await driver.get(url)
        let start = new Date().getTime()
        await driver.source()
        let end = new Date().getTime()
        return {desireCaps: cap, benchmark: end - start}
      })
      result = await Promise.all(inProgressTests)
    }
    catch (error) {
      return null
    }
    finally {
      await quitDriver(driver)
      const lines = result.map((r) => {
        const line = r === null ? ' , , , ' : `${r.desireCaps.deviceName},` +
          `${r.desireCaps.sessionName.substring(r.desireCaps.sessionName.indexOf('on') + 2)}, ` +
          `${r.desireCaps.platformVersion}, ${r.benchmark}\n`
        return line
      })
      const headers = 'Device Name, UDID, PlatformVersion, Benchmark\n'
      fs.writeFileSync('src/test/console/benchmark/benchmark_result.csv',
        headers + lines.join(''))
    }
  })
})
