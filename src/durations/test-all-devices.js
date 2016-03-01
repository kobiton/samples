import 'babel-polyfill'
const desiredCaps = require('../helpers/caps')
const test = require('./test')

describe('Scenario-run script with all of existing devices', () => {
  let drivers = []

  beforeEach(async() => {
    for (let cap of desiredCaps.existingCaps) {
      let driver
      try {
        driver = await createDriver(cap)//eslint-disable-line
      }
      catch (error) {
      }
      finally {
        if (driver != null) {
          drivers.push(driver)
        }
      }
    }
  })

  afterEach(async () => {
    const jobs = []
    for (let driver of drivers) {
      if (driver != null) {
        jobs.push(driver.quit())
      }
    }
    await Promise.all(jobs)
  })

  it('should be succesfully run a short test with all of existing devices parallel', async () => {
    const jobs = []
    for (let driver of drivers) {
      jobs.push(test.run_test_short_duration(driver))
    }
    await Promise.all(jobs)
  })
})
