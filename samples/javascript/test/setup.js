import 'colors'
import wd from 'wd'

const username = 'tester01'
const apiKey = '13e36639-92e3-411b-a067-3457b5dea573'

const serverConfig = {
  host: 'ec2-54-226-177-179.compute-1.amazonaws.com',
  port: 3001,
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '5.1.1',
  deviceName: 'Nexus 5'
}

global.createDriver = async() => {
  const driver = wd.promiseChainRemote(serverConfig)
  driver.setPageLoadTimeout(30000)
  driver.setImplicitWaitTimeout(30000)
  driver.setAsyncScriptTimeout(30000)
  driver.on('status', (info) => console.log(info.cyan))
  driver.on('command', (meth, path, data) => console.log(' > ' + meth.yellow, path.grey, data || ''))
  driver.on('http', (meth, path, data) => console.log(' > ' + meth.magenta, path, (data || '').grey))
  await driver.init(desiredCaps)
  return driver
}
