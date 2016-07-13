import 'babel-polyfill'
import 'colors'
import {debug} from '@kobiton/core-util'
import wd from 'wd'
import {Application} from 'spectron'
import BPromise from 'bluebird'

export async function quitDriver(driver) {
  if (driver != null) {
    try {
      debug.log('setup:quitDriver ', '')
      await driver.quit()
      // Ensure the device becomes available on system
      await BPromise.delay(10000)
    }
    catch (err) {
      debug.error('quitDriver()', err)
    }
  }
}

export async function createDriver(server, desiredCaps) {
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

export const desktopApp = initDesktop()

function getDesktopPath() {
  return (process.platform === 'win32')
  ? 'C:/Program Files/Kobiton/Kobiton.exe' : '/Applications/Kobiton.app/Contents/MacOS/Kobiton'
}

function initDesktop(options = {}) {
  options.path = getDesktopPath()
  // Default timeout to wait for ChromeDriver to start
  options.startTimeout = 3000
  // Default time out for each of action on element
  options.waitTimeout = 60000
  debug.log('setup:execPath ', process.execPath)
  debug.log('setup:cwd ', process.cwd())
  return new Application(options)
}
