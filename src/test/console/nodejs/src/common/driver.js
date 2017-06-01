import wd from 'wd'
import {debug} from '@kobiton/core-util'

export async function createDriver({serverConfig, desiredCapabilities}) {
  wd.configureHttp({
    timeout: 20 * 60000,
    retries: 3,
    retryDelay: 1000
  })

  const driver = wd.promiseChainRemote(serverConfig)

  try {
    await driver.init(desiredCapabilities)
  }
  catch (err) {
    if (err.data) {
      debug.error('init driver failed:', err.data)
    }
    throw err
  }

  return driver
}

export async function quitDriver(driver) {
  if (driver) {
    try {
      await driver.quit()
    }
    catch (err) {
      debug.error(`quit driver: ${err}`)
    }
  }
}
