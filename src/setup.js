import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {local, remote} from './config'

global.createDriver = process.env.NODE_ENV === 'development'
  ? () => createDriver(local.caps, local.server)
  : process.env.DESIRED_CAPS === 'cap1'
    ? () => createDriver(remote.caps1, remote.server)
    : () => createDriver(remote.caps2, remote.server)

async function createDriver(desiredCaps, serverConfigs) {
  const driver = wd.promiseChainRemote(serverConfigs)
  /* eslint-disable no-console */
  driver.on('status', (info) => console.log(info.cyan))
  driver.on('command', (meth, path, data) => console.log(' >', meth.yellow, path.grey, data || ''))
  driver.on('http', (meth, path, data) => console.log(' >', meth.magenta, path, (data || '').grey))
  /* eslint-enable */
  await driver.init(desiredCaps)
  return driver
}
