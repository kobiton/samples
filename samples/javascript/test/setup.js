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

global.createDriver = async () => {
  const driver = wd.promiseChainRemote(serverConfig)
  driver.setImplicitWaitTimeout(5000)
  await driver.init(desiredCaps)
  return driver
}
