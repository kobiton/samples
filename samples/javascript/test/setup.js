import 'colors'
import wd from 'wd'

const username = 'admin'
const apiKey = '79522257-99e2-434c-a6eb-4f443938fde6'

const serverConfig = {
  host: 'localhost',
  port: 3001,
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  browserName: 'browser',
  platformName: 'Android',
  deviceName: 'Nexus 7'
}

global.createDriver = async() => {
  const driver = wd.promiseChainRemote(serverConfig)
  driver.on('status', (info) => console.log(info.cyan))
  driver.on('command', (meth, path, data) => console.log(' > ' + meth.yellow, path.grey, data || ''))
  driver.on('http', (meth, path, data) => console.log(' > ' + meth.magenta, path, (data || '').grey))
  await driver.init(desiredCaps)
  .setPageLoadTimeout(30000)
  .setImplicitWaitTimeout(30000)
  .setAsyncScriptTimeout(30000)
  return driver
}
