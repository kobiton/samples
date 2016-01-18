import 'babel-core/polyfill'
import 'colors'
import wd from 'wd'

const username = 'admin'
const apiKey = '79522257-99e2-434c-a6eb-4f443938fde6'
const username2 = 'tester01'
const apiKey = 'd297ce75-d8e0-4ea8-930a-10d1dda782ca'

const serverConfig = {
  host: 'localhost',
  port: 3001,
  auth: `${username}:${apiKey}`
}

const serverConfig2 = {
  host: 'tesr.kobition.com',
  port: 3001,
  auth: `${username2}:${apiKey2}`
}

const desiredCaps = {
  browserName: 'browser',
  platformName: 'Android',
  deviceName: 'Nexus 7'
}

const desiredCaps2 = {
  browserName: 'browser',
  platformName: 'Android',
  deviceName: 'Samsung Grand Prime'
}

global.createDriver = async() => {
  const driver = wd.promiseChainRemote(serverConfig)
  driver.on('status', (info) => {
    console.log(info.cyan)
  })
  driver.on('command', (meth, path, data) => {
    console.log(' > ' + meth.yellow, path.grey, data || '')
  })
  driver.on('http', (meth, path, data) => {
    console.log(' > ' + meth.magenta, path, (data || '').grey)
  })
  await driver.init(desiredCaps)
  .setPageLoadTimeout(30000)
  .setImplicitWaitTimeout(30000)
  .setAsyncScriptTimeout(30000)
  return driver
}

global.createDriver2 = async() => {
  const driver2 = wd.promiseChainRemote(serverConfig)
  driver2.on('status', (info) => {
    console.log(info.cyan)
  })
  driver2.on('command', (meth, path, data) => {
    console.log(' > ' + meth.yellow, path.grey, data || '')
  })
  driver2.on('http', (meth, path, data) => {
    console.log(' > ' + meth.magenta, path, (data || '').grey)
  })
  await driver2.init(desiredCaps2)
  .setPageLoadTimeout(30000)
  .setImplicitWaitTimeout(30000)
  .setAsyncScriptTimeout(30000)
  return driver2
}

global.createDriver3 = async() => {
  const driver3 = wd.promiseChainRemote(serverConfig2)
  driver3.on('status', (info) => {
    console.log(info.cyan)
  })
  driver3.on('command', (meth, path, data) => {
    console.log(' > ' + meth.yellow, path.grey, data || '')
  })
  driver3.on('http', (meth, path, data) => {
    console.log(' > ' + meth.magenta, path, (data || '').grey)
  })
  await driver3.init(desiredCaps2)
  .setPageLoadTimeout(30000)
  .setImplicitWaitTimeout(30000)
  .setAsyncScriptTimeout(30000)
  return driver3
}
