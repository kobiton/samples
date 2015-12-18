import wd from 'wd'

const username = 'tester'
const apiKey = '4d97044c-6db3-4ec6-be17-28b51279f8bd'

const serverConfig = {
  host: 'localhost',
  port: 3001,
  pathname: 'v1/tests',
  auth: `${username}:${apiKey}`
}
//
// const desiredCaps = {
//   browserName: 'Chrome',
//   platformName: 'Android',
//   platformVersion: '5.0.2',
//   deviceName: 'Moto G'
// }

const desiredCaps = {
  browserName: 'browser',
  platformName: 'Android',
  platformVersion: '4.4.4',
  deviceName: 'Nexus 7'
}

global.createDriver = async () => {
  const driver = wd.promiseChainRemote(serverConfig)
  driver.setImplicitWaitTimeout(5000)
  await driver.init(desiredCaps)
  return driver
}
