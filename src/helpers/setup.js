import 'babel-polyfill'
import 'colors'
import {debug} from '@kobiton/core-util'
import wd from 'wd'
const servers = require('../helpers/servers')

global.createDriver = async (desiredCaps) => {
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
