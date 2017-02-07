import config from '../../../framework/config/test'
import Device from '../../../framework/api/device'
import {Launcher} from 'webdriverio'
import ManualData from './data'

export default async function runManual() {
  const onlineDevices = await Device.getOnlineDevices({
    platformName: config.device.platform,
    deviceName: config.device.name,
    groupType: config.device.group,
    platformVersion: config.device.version,
    deviceNumbers: config.device.number
  })

  const maxBrowsers = onlineDevices.length
  const capabilities = []
  // Produce the number of browsers to run test manual
  for (let i = 0; i < maxBrowsers; i++) {
    capabilities.push({
      maxInstances: 1,
      browserName: 'chrome'
    })
  }

  if (onlineDevices.length === 0) {
    throw Error('No available onlineDevices')
  }
  // Save list onlineDevices into a file to get from each of manual test
  ManualData.saveOnlineDevices(onlineDevices)
  // Init launcher to run test with specific wdio cofig file
  const wdio = new Launcher('build/test/browser/manual/wdio-manual.conf.js')
  wdio.configParser._capabilities = capabilities
  await wdio.run()
}
