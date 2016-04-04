import {assert} from 'chai'
import wd from 'wd'
import setup from '../helpers/setup'
import {debug} from '@kobiton/core-util'
import initEnv from '../helpers/init-environment'
import {invalidCaps, nonExistCapConfig} from './data'
import BPromise from 'bluebird'

describe('Verify capabilities', () => {

  let onlineDevices
  let server

  before(async () => {
    const env = await initEnv(global._mocha.env)
    server = env.kobitonServer
    onlineDevices = env.onlineDevices
  })

  const nonExistingCaps = new Array(nonExistCapConfig.threadCount).fill(nonExistCapConfig.cap)
  let drivers = []

  async function initFailedScenario(cap) {
    try {
      const driver = wd.promiseChainRemote(server)
      const sessionid = await driver.init(cap)
      if (sessionid != null) {
        throw new Error('should init failed: ' + cap.deviceName)
      }
    }
    catch (err) {
      return err
    }
  }

  async function initSuccessfulScenario(cap) {
    try {
      const driver = wd.promiseChainRemote(server)
      drivers.push(driver)
      return await driver.init(cap)
    }
    catch (err) {
      debug.error('capabilities', err)
      throw new Error('should init successfully : ' + cap.deviceName)
    }
  }

  afterEach(async () => {
    const jobs = drivers.map((driver) => setup.quitDriver(driver))
    await Promise.all(jobs)
  })

  beforeEach(() => {
    drivers = []
  })

  it('should init failed with non existing devices', async () => {
    const vals = await BPromise.all(invalidCaps.map((cap) => initFailedScenario(cap)))
    vals.forEach((value) => {
      assert.typeOf(value, 'error')
    })
  })

  it('should init successfully with existing devices parallel', async () => {
    const vals = await BPromise.all(onlineDevices.map((cap) => initSuccessfulScenario(cap)))
    vals.forEach((value) => {
      debug.log('capabilities', value)
      assert.isArray(value)
      assert.isString(value[0])
    })
  })

  it('should init successfully while init hundred of non-existing devices', async () => {
    assert.isAtLeast(onlineDevices.length, 1, 'Expected 1 online device')
    const successfullJobs = onlineDevices.map((cap) => initSuccessfulScenario(cap))
    const failedJobs = nonExistingCaps.map((cap) => initFailedScenario(cap))
    const jobs = successfullJobs.concat(failedJobs)
    const start = Date.now()
    await BPromise.all(jobs)
    const end = Date.now()
    const duration = end - start
    debug.log('capabilities', 'init both online and invalid devices take(ms): ' + duration)
  })

})
