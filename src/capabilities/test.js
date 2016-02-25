import '../setup'
import wd from 'wd'
import {assert} from 'chai'
import data from './data'

describe('Capabilities', () => {
  let driver

  afterEach(async () => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should init failed with non existing device', async () => {
    driver = wd.promiseChainRemote(data.server)

    try {
      let sessionid = await driver.init(data.nonExistingCap)
      assert.isNull(sessionid)
    }
    catch (err) {
      assert.include(err.toString(),
       'The environment you requested was unavailable', 'verify error message')
    }
    driver.quit()
  })

  it('should init successfully with an existing device', async () => {
    driver = wd.promiseChainRemote(data.server)
    let sessionID = await driver.init(data.existingCap)
    assert.isNotNull(sessionID)
  })
})
