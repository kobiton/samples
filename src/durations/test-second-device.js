import 'babel-polyfill'
import '../helpers/setup'
const desiredCaps = require('../helpers/caps')
const test = require('./test')

describe('Google Search on the second device', () => {
  let driver

  beforeEach(async() => {
    driver = await createDriver(desiredCaps.nexus5_v6_2)
  })

  afterEach(async() => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should search Google with short duration', async() => {
    await test.run_test_short_duration(driver)
  })

  it('should search Google with long duration', async() => {
    await test.run_test_long_duration(driver)
  })
})
