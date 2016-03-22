import {assert} from 'chai'
import wd from 'wd'
import setup from '../helpers/setup'
import {debug} from '@kobiton/core-util'
import servers from '../helpers/servers'
import {invalidCaps, nonExistCapConfig} from './data'

describe('Verify capabilities', () => {
  const remote = servers.getRemote()
  const onlineCaps = servers.getOnlineCaps()
  const nonExistingCaps = new Array(nonExistCapConfig.threadCount).fill(nonExistCapConfig.cap)
  let drivers = []

  const initFailedScenario = async (cap) => {
    try {
      const driver = wd.promiseChainRemote(remote)
      const sessionid = await driver.init(cap)
      if (sessionid != null) {
        throw new Error('should init failed: ' + cap.deviceName)
      }
    }
    catch (err) {
      return err
    }
  }

  const initSuccessfulScenario = async (cap) => {
    try {
      const driver = wd.promiseChainRemote(remote)
      drivers.push(driver)
      return await driver.init(cap)
    }
    catch (err) {
      debug.error('capabilities', err)
      throw new Error('should init successfully : ' + cap.deviceName)
    }
  }

  afterEach(async () => {
    const jobs = []
    drivers.forEach((value) => {
      jobs.push(setup.quitDriver(value))
    })
    await Promise.all(jobs)
  })

  beforeEach(() => {
    drivers = []
  })

  it('should init failed with non existing devices', async () => {
    const jobs = []
    for (let cap of invalidCaps) {
      jobs.push(initFailedScenario(cap))
    }
    const vals = await Promise.all(jobs)
    vals.forEach(async (value) => {
      assert.typeOf(value, 'error')
    })
  })

  it('should init successfully with existing devices parallel', async () => {
    const jobs = []
    for (let cap of onlineCaps) {
      jobs.push(initSuccessfulScenario(cap))
    }
    const vals = await Promise.all(jobs)
    vals.forEach(async (value) => {
      debug.log('capabilities', value)
      assert.isArray(value)
      assert.isString(value[0])
    })
  })

  it('should init successfully while init hundred of non-existing devices', async () => {
    const jobs = []
    for (let cap of onlineCaps) {
      jobs.push(initSuccessfulScenario(cap))
    }

    for (let cap of nonExistingCaps) {
      jobs.push(initFailedScenario(cap))
    }
    const start = Date.now()
    await Promise.all(jobs)
    const end = Date.now()
    const duration = end - start
    debug.log('capabilities', 'init both online and invalid devices take(ms): ' + duration)
  })

})
