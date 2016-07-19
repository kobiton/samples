import {assert} from 'chai'
import initEnv from '../../core/init-environment'
import {launch} from '../core/test'
import * as data from '../core/data'
import BPromise from 'bluebird'

describe('Run tests on multiple devices in parallel', () => {

  let onlineDevices
  let server

  before(async () => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices
    assert.isAtLeast(onlineDevices.length, 2, 'Expected at least two online devices')
  })

  it('should run in 1.5 hours', async () => {
    const expectedDuration = _calculateExpectedDuration(data.smallListSearchTerms.length)
    await run(data.smallListSearchTerms, expectedDuration, 'Expected at least ~ 1 hour')
  })

  it('should run in 3 hours', async () => {
    const expectedDuration = _calculateExpectedDuration(data.shortListSearchTerms.length)
    await run(data.shortListSearchTerms, expectedDuration, 'Expected at least ~ 2.5 hours')
  })

  it('should run in 4 hours', async () => {
    const expectedDuration = _calculateExpectedDuration(data.longListSearchTerms.length)
    await run(data.longListSearchTerms, expectedDuration, 'Expected at least ~ 3 hours')
  })

  it('should run in 5 hours', async () => {
    const expectedDuration = _calculateExpectedDuration(data.hugeListSearchTerms.length)
    await run(data.hugeListSearchTerms, expectedDuration, 'Expected at least ~ 3.5 hours')
  })

  function _calculateExpectedDuration(dataLength) {
    // The duration for each loop is approximately 40 seconds.
    // We expect that the test can run at least 75% per total the test duration.
    return 60 * 0.5 * dataLength
  }

  async function run(data, maximumDuration, msg) {
    const start = Date.now()
    const jobs = onlineDevices
      .map((cap) => launch(server, cap, data))
      .map((promise) => promise.then(onSuccess, onError))
    const finishedJobs = await BPromise.all(jobs)
    const successCount = finishedJobs.reduce((sum, ok) => (sum + ok), 0)
    const end = Date.now()
    const durationInSeconds = (end - start) / 1000
    assert.equal(successCount, onlineDevices.length, 'Expected all devices are run successfully')
    assert.isAtLeast(durationInSeconds, maximumDuration, msg)

    function onSuccess() {
      return 1
    }
    function onError() {
      return 0
    }
  }

})
