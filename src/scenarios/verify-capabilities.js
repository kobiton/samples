import 'babel-polyfill'
import data from '../data/capabilities'
import wd from 'wd'
import {assert} from 'chai'

describe('kobiton:e2e testing suite', () => {
  let driver
  afterEach(async () => {
    if (driver != null) {
      await driver.quit()
    }
  });

  it('should init failed with non existing device', async () => {
    driver = wd.promiseChainRemote(data.capabilities.server)

    try {
      let sessionid = await driver.init(data.capabilities.nonexistingcap)
      assert.isNull(sessionid)
    }
    catch (err) {
      assert.include(err.toString(),
       'The environment you requested was unavailable', 'verify error message')
    }
    driver.quit()
  })

  it('should init successfully with an existing device', async () => {
    driver = wd.promiseChainRemote(data.capabilities.server)
    let sessionID = await driver.init(data.capabilities.existingcap)
    assert.isNotNull(sessionID)
  })

})
