import 'babel-polyfill'
import 'colors'
import wd from 'wd'

const servers = require('../helpers/servers')

global.createDriver = async (desiredCaps) => {
  const driver = wd.promiseChainRemote(servers.remote)
  /* eslint-disable no-console */
  driver.on('status', (info) => console.log(info.cyan))
  driver.on('command', (meth, path, data) => console.log(' >', meth.yellow, path.grey, data || ''))
  driver.on('http', (meth, path, data) => console.log(' >', meth.magenta, path, (data || '').grey))
  /* eslint-enable */

  //Mocha doesn't show error data in its report
  try {
    await driver.init(desiredCaps)
  }
  catch (error) {
    if (error.data) {
      console.log('ERROR'.red, error.data) //eslint-disable-line no-console
    }
    throw error
  }
  return driver
}
