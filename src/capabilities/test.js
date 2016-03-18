import {assert} from 'chai'
import wd from 'wd'
import '../helpers/setup'
import {debug} from '@kobiton/core-util'
import servers from '../helpers/servers'
import {invalidCaps, nonExistCapConfig} from './data'

describe('Verify capabilities', () => {
  const remote = servers.getRemote()
  const onlineCaps = servers.getOnlineCaps()
  const nonExistingCaps = new Array(nonExistCapConfig.threadCount).fill(nonExistCapConfig.cap)
  const wait = (t) => {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
  let drivers = []

  const initFailedScenario = async (cap) => {
    try {
      const driver = wd.promiseChainRemote(remote)
      drivers.push(driver)
      const sessionid = await driver.init(cap)
      if (sessionid != null) {
        throw new Error('sessionid')
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
      throw new Error('should init successfully : ' + cap.deviceName)
    }
  }

  const quitDriver = async (driver) => {
    if (driver != null) {
      try {
        await driver.quit()
        await wait(5000)
      }
      catch (err) {
        //debug.error('capabilities', err)
      }
    }
  }

  afterEach(async () => {
    const jobs = []
    drivers.forEach((value) => {
      jobs.push(quitDriver(value))
    })
    await Promise.all(jobs)
  })

  beforeEach(() => {
    drivers = []
  })

  it('should init failed with non existing devices', async () => {
    let jobs = []
    for (let cap of invalidCaps) {
      jobs.push(initFailedScenario(cap))
    }
    const vals = await Promise.all(jobs)
    vals.forEach(async (value) => {
      assert.typeOf(value, 'error')
    })
  })

  it('should init successfully with existing devices parallel', async () => {
    let jobs = []
    for (let cap of onlineCaps) {
      jobs.push(initSuccessfulScenario(cap))
    }
    const vals = await Promise.all(jobs)
    vals.forEach(async (value) => {
      debug.log('capabilities', value)
      assert.isArray(value)
      assert.isString(value)
    })
  })

  it('should init successfully while init hundred of non-existing devices', async () => {
    const jobOnlines = []
    const jobInvalids = []
    for (let cap of onlineCaps) {
      jobOnlines.push(initSuccessfulScenario(cap))
    }
    let start = Date.now()
    drivers = await Promise.all(jobOnlines)
    let end = Date.now()
    let duration = end - start
    debug.log('capabilities', 'start online devices take(ms): ' + duration)

    for (let cap of nonExistingCaps) {
      jobInvalids.push(initFailedScenario(cap))
    }

    start = Date.now()
    await Promise.all(jobInvalids)
    end = Date.now()
    duration = end - start
    debug.log('capabilities', 'start invalid devices take(ms): ' + duration)
  })

})
