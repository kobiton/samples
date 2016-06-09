import {assert} from 'chai'
import initEnv from '../helpers/init-environment'
import {launch} from './test'
import * as data from './data'
import BPromise from 'bluebird'

describe('Run script with at least three online devices', () => {

  let onlineDevices
  let server

  before(async () => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices
    assert.isAtLeast(onlineDevices.length, 3, 'Expected at least three online devices')
  })

  it('should run at least 10 minutes', async () => {
    const maximumDuration = 60 * 1.5 * data.smallListSearchTerms.length
    await run(data.smallListSearchTerms, maximumDuration, 'Expected at least 10 minutes')
  })

  it('should run at least 45 minutes', async () => {
    const maximumDuration = 60 * 1.5 * data.shortListSearchTerms.length
    await run(data.shortListSearchTerms, maximumDuration, 'Expected at least 45 minutes')
  })

  it('should run at least 1.5 hours', async () => {
    const maximumDuration = 60 * 1.5 * data.longListSearchTerms.length
    await run(data.longListSearchTerms, maximumDuration, 'Expected at least 1.5 hours')
  })

  it('should run at least 3 hours', async () => {
    const maximumDuration = 60 * 1.5 * data.hugeListSearchTerms.length
    await run(data.hugeListSearchTerms, maximumDuration, 'Expected at least 3 hours')
  })

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
