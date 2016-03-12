import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import servers from '../helpers/servers'
import test from './test'

describe('Run a short script with all of existing devices', () => {
  let drivers = []
  const onlineCaps = servers.getOnlineCaps()

  beforeEach(async() => {
    for (let cap of onlineCaps) {
      let driver
      try {
        debug.log('durations', 'create driver ' + cap.deviceName)
        driver = await createDriver(cap)//eslint-disable-line
      }
      catch (err) {
        debug.error('durations', err)
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
    assert.isAtLeast(drivers.length, 1, 'There should be atleast 1 online device')
    for (let driver of drivers) {
      jobs.push(test.run_test_short_duration(driver))
    }
    await Promise.all(jobs)
  })
})
