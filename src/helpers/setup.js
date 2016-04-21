import 'babel-polyfill'
import 'colors'
import {debug} from '@kobiton/core-util'
import wd from 'wd'

exports.quitDriver = async (driver) => {
  if (driver != null) {
    try {
      await driver.quit()
    }
    catch (err) {
      debug.error('quitDriver()', err)
    }
  }
}
exports.createDriver = async (server, desiredCaps) => {
  const driver = wd.promiseChainRemote(server)
  driver.on('status', (info) => debug.log('status:', info.cyan))
  driver.on('command', (meth, path, data) => debug.log('command:',
  ' >', meth.yellow, path.grey, data || ''))
  driver.on('http', (meth, path, data) => debug.log('http:',
  ' >', meth.magenta, path, (data || '').grey))

  // Mocha doesn't show error data in its report
  try {
    await driver.init(desiredCaps)
  }
  catch (error) {
    if (error.data) {
      debug.error('createDriver()', error)
    }
    throw error
  }
  return driver
}
