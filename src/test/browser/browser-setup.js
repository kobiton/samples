import {Launcher} from 'webdriverio'
import config from '../../framework/config/test'

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

  // Init launcher to run test with specific wdio cofig file
  const wdio = new Launcher('build/test/browser/wdio.conf.js')
  wdio.configParser._capabilities = capabilities
  await wdio.run()
}
