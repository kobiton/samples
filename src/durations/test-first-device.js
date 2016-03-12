import '../helpers/setup'
import servers from '../helpers/servers'
const test = require('./test')

describe('Google Search on the first device', () => {
  let driver
  const cap = servers.getOnlineCaps()[0]
  beforeEach(async() => {
    driver = await createDriver(cap)
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
