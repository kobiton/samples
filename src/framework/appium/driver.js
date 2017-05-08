import * as logger from '../../framework/common/logger'
import {createServerConfig} from './helper'
import {debug} from '@kobiton/core-util'
import wd from 'wd'

export async function quitDriver(driver) {
  try {
    logger.writeLog('Setting up', 'quit Driver')
    await driver.quit()
  }
  catch (err) {
    logger.writeLog('quitDriver()', err)
  }
}

export async function createDriver(server, desiredCaps) {
  const driver = await wd.promiseChainRemote(server)
  try {
    await driver.init(desiredCaps)
  }
  catch (error) {
    if (error.data) {
      debug.error('create_driver', error)
      logger.writeLog('createDriver()', error)
    }
  }
  return driver
}

export async function createAppDriver(caps, callbackJob) {
  const serverConfig = await createServerConfig()
  const driver = await createDriver(serverConfig, caps)
  driver.on('error', (e) => {
    logger.writeLog(
      `info cap:${caps}, Error while creating apps driver`, e
    )
  })
  if (driver !== null) {
    try {
      await callbackJob(driver)
    }
    finally {
      try {
        await quitDriver(driver)
      }
      catch (ignored) {}
    }
  }
}
