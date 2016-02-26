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
  await driver.init(desiredCaps)
  return driver
}
