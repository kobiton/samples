import {assert} from 'chai'
import wd from 'wd'
import {quitDriver} from '../../core/setup'
import {debug} from '@kobiton/core-util'
import initEnv from '../../core/init-environment'
import BPromise from 'bluebird'

describe('Verify capabilities', () => {
  let onlineDevices
  let server
  let cap
  const invalidCaps = [{
    browserName: 'chrome',
    platformName: '',
    platformVersion: '4.4.4',
    deviceName: 'Invalid deviceName'
  }, {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.4.4',
    deviceName: 'Invalid deviceName'
  }, {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.4.4',
    deviceName: ''}
  ]

  const nonExistCapConfig = {
    threadCount: 500,
    cap: {
      browserName: 'chrome',
      platformName: 'Android',
      platformVersion: '4.4.4',
      deviceName: 'Invalid deviceName'
    }
  }
  const nonExistingCaps = new Array(nonExistCapConfig.threadCount).fill(nonExistCapConfig.cap)

  before(async () => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices
    cap = onlineDevices[0]
    assert.isAtLeast(onlineDevices.length, 2, 'Expected 2 online device')
  })

  describe('Verify init devices sequentially', () => {
    it('should successfully init 2 online devices sequentially', async () => {
      await initSuccessfulScenario(onlineDevices[0])
      await initSuccessfulScenario(onlineDevices[1])
    })

    it('should successfully init an online device then successfully re-init it again', async () => {
      await initSuccessfulScenario(onlineDevices[0])
      await initSuccessfulScenario(onlineDevices[0])
    })

    it('should successfully init device match mixed/substring device name', async () => {
      const tmp = {...cap}
      tmp.deviceName = cap.deviceName.slice(0, -3)
      debug.log('capabilities', tmp)
      await initSuccessfulScenario(tmp)
    })

    it('should successfully init device match mixed/substring platform version', async () => {
      const tmp = {...cap}
      tmp.platformVersion = cap.platformVersion.slice(0, -1)
      debug.log('capabilities', tmp)
      await initSuccessfulScenario(tmp)
    })
  })

  describe('Verify init devices parallel', () => {
    it('should init failed with non existing devices', async () => {
      const vals = await BPromise.all(invalidCaps.map((cap) => initFailedScenario(cap)))
      for (const value of vals) {
        assert.typeOf(value, 'error')
      }
    })

    it('should init successfully with existing devices parallel', async () => {
      const vals = await BPromise.all(onlineDevices.map((cap) => initSuccessfulScenario(cap)))
      for (const value of vals) {
        debug.log('capabilities', value)
        assert.isArray(value)
        assert.isString(value[0])
      }
    })

    it('should init successfully while init hundred of non-existing devices', async () => {
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
    const driver = wd.promiseChainRemote(server)
    try {
      return await driver.init(cap)
    }
    catch (err) {
      debug.error('capabilities', err)
      throw new Error('should init successfully : ' + cap.deviceName)
    }
    finally {
      await quitDriver(driver)
    }
  }
})
