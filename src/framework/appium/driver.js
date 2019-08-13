import wd from 'wd'
import {debug} from '@kobiton/core-util'
import * as logger from '../../framework/common/logger'
import {createServerConfig} from './helper'
import config from '../config/test'

export async function quitDriver(driver) {
  try {
    await driver.quit()
  }
  catch (err) {
    logger.writeLog('quitDriver()', err)
  }
}

export async function createDriver(desiredCapabilities) {
  const allowW3C = config.allowW3C
  if (config.allowW3C) {
    desiredCapabilities.allowW3C = allowW3C
    desiredCapabilities.w3cPrefix = 'appium'
  }

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
