import '../helpers/setup'
import servers from '../helpers/servers'
import test from './test'

describe('Google Search on the first device', () => {
  let driver
  const wait = (t) => {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
  const cap = servers.getOnlineCaps()[0]
  beforeEach(async() => {
    driver = await createDriver(cap)
  })

  afterEach(async() => {
    if (driver != null) {
      await driver.quit()
      await wait(15000)
    }
  })

  it('should search Google with short duration', async() => {
    await test.runTestShortDuration(driver)
  })

  it('should search Google with long duration', async() => {
    await test.runTestLongDuration(driver)
  })
})
