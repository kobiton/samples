import 'babel-polyfill'
import {assert} from 'chai'
import wd from 'wd'
import '../helpers/setup'
const desiredCaps = require('../helpers/caps')
const servers = require('../helpers/servers')

describe('Capabilities', () => {
  let driver1, driver2
  let cap1 = desiredCaps.nexus5_v6
  let cap2 = desiredCaps.galaxy_note4_v5

  afterEach(async () => {
    if (driver1 != null) {
      try {
        await driver1.quit()
      }
      catch (error) {

      }
    }
    if (driver2 != null) {
      try {
        await driver2.quit()
      }
    catch (error) {

    }
    }
  })

  it('should init failed with non existing devices', async () => {
    for (let cap of desiredCaps.invalidCaps) {
      try {
        driver1 = wd.promiseChainRemote(servers.remote())
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
    for (let cap of desiredCaps.validCaps) {
      try {
        driver1 = wd.promiseChainRemote(servers.remote())
        const sessionId = await driver1.init(cap)// eslint-disable-line babel/no-await-in-loop
        assert.isNotNull(sessionId)
      }
      finally {
        if (driver1 != null) {
          await driver1.quit()  // eslint-disable-line babel/no-await-in-loop
        }
      }
    }
  })

  it('should not be able to use a utilizing device', async () => {
    driver1 = wd.promiseChainRemote(servers.remote())
    let sessionID = await driver1.init(cap1)
    assert.isNotNull(sessionID)
    driver2 = wd.promiseChainRemote(servers.remote())
    await driver2.init(cap1).then((sessionId) => {
      assert.isNull(sessionId)
    })
    .catch((error) => {
      assert.include(error.toString(), 'The environment you requested was unavailable')
    })
  })

  it('should be able to init two existing different devices sequentially', async () => {
    driver1 = wd.promiseChainRemote(servers.remote())
    let sessionId = await driver1.init(cap1)
    assert.isNotNull(sessionId)
    driver2 = wd.promiseChainRemote(servers.remote())
    let sessionId2 = await driver2.init(cap2)
    assert.isNotNull(sessionId2)
  })

  it('should be able to run two existing different devices parallel', async () => {
    driver1 = wd.promiseChainRemote(servers.remote())
    driver2 = wd.promiseChainRemote(servers.remote())
    const [sessionId1, sessionId2] = await Promise.all([
      driver1.init(cap1),
      driver2.init(cap2)
    ])
    assert.isNotNull(sessionId1)
    assert.isNotNull(sessionId2)
  })

})
