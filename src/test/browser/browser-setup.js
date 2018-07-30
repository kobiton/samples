import {Launcher} from 'webdriverio'
import Device from '../../framework/api/device'
import config from '../../framework/config/test'
import ManualData from '../browser/manual/data'

export default async function launchBrowser() {

  const capabilities = []
  // Produce the number of browsers to run test manual
  const openBrowsers = config.browser.numberOfBrowser
  for (let i = 0; i < openBrowsers; i++) {
    capabilities.push({
      maxInstances: 1,
      browserName: config.browser.browserName
    })
  }

  if (config.typeOfTest === 'test-manual') {
    const onlineDevices = await Device.getDevices({onlineDeviceOnly: true})
    if (onlineDevices.length > 0) {
    // Save list onlineDevices into a file to get from each of manual test
      ManualData.saveOnlineDevices(onlineDevices)
      for (let i = 0; i < onlineDevices.length; i++) {
        // Init launcher to run test with specific wdio cofig file
        const wdio = new Launcher('build/test/browser/wdio.conf.js')
        wdio.configParser._capabilities = capabilities
        // eslint-disable-next-line babel/no-await-in-loop
        await wdio.run()
      }
    }
    else {
      throw new Error('No online device available')
    }
  }
  else {
    const wdio = new Launcher('build/test/browser/wdio.conf.js')
    wdio.configParser._capabilities = capabilities
    // eslint-disable-next-line babel/no-await-in-loop
    await wdio.run()
  }
}
