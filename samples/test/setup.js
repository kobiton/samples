import wd from 'wd'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTYsImlhdCI6MTQ0OTU1NTg4MCwiZXhwIjoxNDUyMTQ3ODgwfQ.vzB_fhaD2cF8qCKSaHURY6TJk2VaM4AZ45CNFk3-vFk'

const serverConfig = {
  host: 'localhost',
  port: 3000,
  pathname: 'v1/tests',
  auth: token
}

const desiredCaps = {
  browserName: 'Browser',
  'appium-version': '1.4.16',
  platformName: 'Android',
  platformVersion: '4_4_4',
  deviceName: 'GENYMOTION',
  app: 'browser'
}

global.createDriver = async () => {
  const driver = wd.promiseChainRemote(serverConfig)
  driver.setImplicitWaitTimeout(5000)
  await driver.init(desiredCaps)
  return driver
}
