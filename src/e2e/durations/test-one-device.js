import {assert} from 'chai'
import moment from 'moment'
import initEnv from '../../core/init-environment'
import {debug} from '@kobiton/core-util'
import {getConfig} from '../../core/config'
import {run} from '../core/test'

const {runDurationLoop, expectedDurationInHours} = getConfig()
let onlineDevices
let server

describe('test one device', () => {

  before(async() => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices.slice(0, 1)

    assert.equal(onlineDevices.length, 1, 'Expected at least 1 online device')
    debug.log('beforeEach', `start test with device ${onlineDevices[0].deviceName}`)
  })

  for (let i = 0; i < runDurationLoop; i++) {
    it(`should run test in ${expectedDurationInHours} [${i + 1}/${runDurationLoop}]`, async() => {
      const startedAt = moment.utc()
      const results = await run(server, onlineDevices, expectedDurationInHours)
      const endedAt = moment.utc()
      const durationInMinutes = endedAt.diff(startedAt, 'minutes')

      assert.equal(results, onlineDevices.length, 'Expected one device is run successfully')
      assert.isAtLeast(expectedDurationInHours * 60, durationInMinutes,
        `Expected run in ${durationInMinutes} minutes`)
    })
  }
})
