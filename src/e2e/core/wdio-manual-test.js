import {getConfig} from '../../core/config'
import initEnv from '../../core/init-environment'
import {Launcher} from 'webdriverio'
import {saveOnlineDevices} from './data'

export async function runManual() {
  const {numOfManualDevices} = getConfig()
  const env = await initEnv()
  const maxBrowsers =
    numOfManualDevices < env.onlineDevices.length ? numOfManualDevices : env.onlineDevices.length
  const capabilities = []
  // Produce the number of browsers to run test manual
  for (let i = 0; i < maxBrowsers; i++) {
    capabilities.push({
      maxInstances: 1,
      browserName: 'chrome'
    })
  }
  // Save list onlineDevices into a file to get from each of manual test
  saveOnlineDevices(env.onlineDevices)
  // Init launcher to run test with specific wdio cofig file
  const wdio = new Launcher('build/e2e/core/wdio-manual.conf.js')
  wdio.configParser._capabilities = capabilities
  await wdio.run()
}
