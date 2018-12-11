import fs from 'fs'
import {createDriver, quitDriver} from '../../../framework/appium/driver'
import {writeFailure} from '../../../framework/common/logger/index'
import {convertToDesiredCapabilitiesApp} from '../../../framework/appium/helper'
import moment from 'moment'

const waitingTime = 60000
const timestamps = moment().format('YYYYMMDDHHmmss')

export async function _webBenchmark(onlineCloudDesiredCaps, url) {
  const inProgressTests = await onlineCloudDesiredCaps.map(async(cap) => {
    try {
      const driver = await createDriver(cap)
      await driver.get(url)
      const start = new Date().getTime()
      await driver.source()
      const end = new Date().getTime()
      await quitDriver(driver)
      return {desireCaps: cap, benchmark: end - start}
    }
    catch (err) {
      writeFailure('Benchmark Error', err)
      return {desireCaps: cap, benchmark: 'Error'}
    }
  })
  return await Promise.all(inProgressTests)
}

export async function _appBenchmark(onlineDevices, appInfo) {
  let inProgressTests = await onlineDevices.map(async(d) => {
    let driver
    let device = []
    let cap = []
    try {
      if (d.platformName === 'Android') {
        device.push(d)
        cap = await convertToDesiredCapabilitiesApp(
          timestamps,
          appInfo.apiDemoDebugApp,
          device
        )
        driver = await createDriver(cap[0])
        await driver
          .waitForElementByXPath('//android.widget.TextView[@content-desc="App"]', waitingTime)
          .click()
      }
      else {
        device.push(d)
        cap = await convertToDesiredCapabilitiesApp(
          timestamps,
          appInfo.uiKitCatalogApp,
          device
        )
        driver = await createDriver(cap[0])
        await driver
          .waitForElementByXPath('//*[@name="UIKitCatalog"]', waitingTime)
          .click()
      }
      const start = new Date().getTime()
      await driver.source()
      const end = new Date().getTime()
      await quitDriver(driver)
      return {desireCaps: cap[0], benchmark: end - start}
    }
    catch (err) {
      writeFailure('Benchmark Error', err)
      return {desireCaps: cap[0], benchmark: 'Error'}
    }
  })
  return await Promise.all(inProgressTests)
}

export function _logResult(result, filename = 'result') {
  const lines = result.map((r) => {
    const line = `${r.desireCaps.deviceName},` +
      `${r.desireCaps.sessionName.substring(r.desireCaps.sessionName.indexOf('on') + 2)}, ` +
      `${r.desireCaps.platformVersion}, ${r.benchmark}\n`
    return line
  })
  const headers = 'Device Name, UDID, PlatformVersion, Benchmark\n'
  const filePath = `src/test/console/benchmark/${filename}`
  if (!fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, headers)
  }
  else {
    fs.appendFileSync(filePath, lines.join(''))
  }
}
