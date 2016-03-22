import 'babel-polyfill'
import 'colors'
import {debug} from '@kobiton/core-util'
import wd from 'wd'
import servers from '../helpers/servers'

exports.wait = (t) => {
  return new Promise((resolve) => setTimeout(resolve, t));

}
exports.quitDriver = async (driver) => {
  if (driver != null) {
    try {
      await driver.quit()
      //await exports.wait(30000)
    }
    catch (err) {
      debug.error('capabilities', err)
    }
  }
}
exports.createDriver = async (desiredCaps) => {
  const driver = wd.promiseChainRemote(servers.getRemote())
  /* eslint-disable no-console */
  driver.on('status', (info) => debug.log('helpers', info.cyan))
  driver.on('command', (meth, path, data) => debug.log('helpers',
  ' >', meth.yellow, path.grey, data || ''))
  driver.on('http', (meth, path, data) => debug.log('helpers',
  ' >', meth.magenta, path, (data || '').grey))
  /* eslint-enable */

  //Mocha doesn't show error data in its report
  try {
    await driver.init(desiredCaps)
  }
  catch (error) {
    if (error.data) {
      debug.error('helpers', error)
    }
    throw error
  }
  return driver
}
