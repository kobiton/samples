import {assert} from 'chai'
import wd from 'wd'
import '../helpers/setup'
import {debug} from '@kobiton/core-util'
import servers from '../helpers/servers'
import data from './data'

describe('Verify capabilities', () => {
  let driver1, driver2
  const remote = servers.getRemote()
  const cap1 = servers.getOnlineCaps()[0]
  const cap2 = servers.getOnlineCaps()[1]
  const validCaps = servers.getValidCaps()
  const invalidCaps = data.invalidCaps

  afterEach(async () => {
    if (driver1 != null) {
      try {
        await driver1.quit()
      }
      catch (err) {
        debug.error('capabilities', err)
      }
    }
    if (driver2 != null) {
      try {
        await driver2.quit()
      }
      catch (err) {
        debug.error('capabilities', err)
      }
    }
  })

  it('should init failed with non existing devices', async () => {
    for (let cap of invalidCaps) {
      try {
        driver1 = wd.promiseChainRemote(remote)
        const sessionId = await driver1.init(cap)  // eslint-disable-line babel/no-await-in-loop
        assert.isNull(sessionId)
      }
     catch (err) {
       assert.include(err.toString(),
       'The environment you requested was unavailable', 'verify error message')
     }
     finally {
       if (driver1 != null) {
         await driver1.quit() // eslint-disable-line babel/no-await-in-loop
       }
     }
    }
  })

  it('should init successfully with an existing devices', async () => {
    for (let cap of validCaps) {
      try {
        driver1 = wd.promiseChainRemote(remote)
        const sessionId = await driver1.init(cap)// eslint-disable-line babel/no-await-in-loop
        debug.log(sessionId)
        assert.isNotNull(sessionId)
      }
      catch (err) {
        debug.error('capabilities', err)
      }
      finally {
        if (driver1 != null) {
          await driver1.quit()  // eslint-disable-line babel/no-await-in-loop
        }
      }
    }
  })

  it('should not be able to use a utilizing device', async () => {
    driver1 = wd.promiseChainRemote(remote)
    let sessionID = await driver1.init(cap1)
    assert.isNotNull(sessionID)
    driver2 = wd.promiseChainRemote(remote)
    await driver2.init(cap1).then((sessionId) => {
      assert.isNull(sessionId)
    })
    .catch((err) => {
      assert.include(err.toString(), 'The environment you requested was unavailable')
    })
  })

  it('should be able to init two existing different devices sequentially', async () => {
    driver1 = wd.promiseChainRemote(remote)
    let sessionId = await driver1.init(cap1)
    assert.isNotNull(sessionId)
    debug.log('capabilities', cap1.deviceName + sessionId)
    driver2 = wd.promiseChainRemote(remote)
    let sessionId2 = await driver2.init(cap2)
    assert.isNotNull(sessionId2)
    debug.log('capabilities', cap2.deviceName + sessionId2)
  })

  it('should be able to run two existing different devices parallel', async () => {
    driver1 = wd.promiseChainRemote(remote)
    driver2 = wd.promiseChainRemote(remote)
    const [sessionId1, sessionId2] = await Promise.all([
      driver1.init(cap1),
      driver2.init(cap2)
    ])
    assert.isNotNull(sessionId1)
    assert.isNotNull(sessionId2)
  })

})
