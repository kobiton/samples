import wd from 'wd'
import {debug} from '@kobiton/core-util'
import * as logger from '../../framework/common/logger'
import {createServerConfig} from './helper'

export async function quitDriver(driver) {
  try {
    logger.writeLog('Setting up', 'quit Driver')
    await driver.quit()
  }
  catch (err) {
    logger.writeLog('quitDriver()', err)
  }
}

export async function createDriver(desiredCapabilities) {
  const server = await createServerConfig()
  const driver = await wd.promiseChainRemote(server)
  try {
    await driver.init(desiredCapabilities)
  }
  catch (error) {
    if (error.data) {
      debug.error('create_driver', error)
      logger.writeLog('createDriver()', error)
    }
    throw error
  }
  return driver
}
