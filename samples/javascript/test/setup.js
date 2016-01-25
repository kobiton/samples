import 'babel-core/polyfill'
import 'colors'

var wd = require("wd")
var desiredCaps = require('./helpers/caps')
var serverConfigs = require('./helpers/appium-servers')
var debug = require("./helpers/logging")

global.createDriver = async() => {
  return _createDriver(desiredCaps.android1, serverConfigs.local)
}

global.createDriver1 = async() => {
  return _createDriver(desiredCaps.android2, serverConfigs.kobiton)
}

async function _createDriver(desiredCaps, serverConfigs) {
  const driver = wd.promiseChainRemote(serverConfigs)
  debug.log(driver)
  await driver.init(desiredCaps)
  return driver
}
