import '../helpers/setup'
import servers from '../helpers/servers'
import test from './test'

describe('Google Search on the second device', () => {
  let driver
  const cap = servers.getOnlineCaps()[1]

  beforeEach(async() => {
    driver = await createDriver(cap)
  })

  afterEach(async() => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should search Google with short duration', async() => {
    await test.runTestShortDuration(driver)
  })

  it('should search Google with long duration', async() => {
    await test.runTestLongDuration(driver)
  })
})
