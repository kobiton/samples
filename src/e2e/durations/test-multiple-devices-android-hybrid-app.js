import {assert} from 'chai'
import moment from 'moment'
import initEnv from '../../core/init-environment'
import {debug} from '@kobiton/core-util'
import {getConfig} from '../../core/config'
import {runAndroidHybridApp} from '../core/test'

const {runDurationLoop, expectedDurationInMinutes} = getConfig()
let onlineDevices
let server
let listDeviceNames

describe('test Android hybrid app on multiple devices', () => {

  before(async() => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices.filter((d) => d.platformName === 'Android')
    assert.isAtLeast(onlineDevices.length, 2, 'Expected at least two online devices')
    listDeviceNames = onlineDevices.map((d) => d.deviceName)
    debug.log('before', `start test with devices ${listDeviceNames.join()}`)
  })

  for (let i = 0; i < runDurationLoop; i++) {
    it(`should run test in ${expectedDurationInMinutes} minutes [${i + 1}/${runDurationLoop}]`,
      async() => {
        const startedAt = moment.utc()
        const results = await runAndroidHybridApp(server, onlineDevices, expectedDurationInMinutes)
        const endedAt = moment.utc()
        const durationInMinutes = endedAt.diff(startedAt, 'minutes')

        assert.isAtLeast(durationInMinutes, expectedDurationInMinutes,
          `Expected run in ${durationInMinutes} minutes`)
        assert.equal(results, onlineDevices.length, 'Expected one device is run successfully')
      })
  }
})
