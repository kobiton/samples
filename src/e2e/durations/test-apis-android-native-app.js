import {assert} from 'chai'
import moment from 'moment'
import initEnv from '../../core/init-environment'
import {debug} from '@kobiton/core-util'
import {getConfig} from '../../core/config'
import {testAndroidNativeApp} from '../core/android-native-app-test.js'

const {shortRunLoop} = getConfig()
let onlineDevices
let server

describe('test Android native app on one device', () => {

  before(async() => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices.filter((d) => d.platformName === 'Android').slice(0, 1)
    assert.equal(onlineDevices.length, 1, 'Expected at least 1 online device')
    debug.log('before', `start test with device ${onlineDevices[0].deviceName}`)
  })

  for (let i = 0; i < shortRunLoop; i++) {
    it(`should run test [${i + 1}/${shortRunLoop}]`, async() => {
      const startedAt = moment.utc()
      const results = await testAndroidNativeApp(server, onlineDevices)
      const endedAt = moment.utc()
      const durationInMinutes = endedAt.diff(startedAt, 'minutes')

      assert.equal(results, onlineDevices.length, 'Expected one device is run successfully')
      debug.log(`Loop ${i + 1} is ran in ${durationInMinutes} minutes`)
    })
  }
})
