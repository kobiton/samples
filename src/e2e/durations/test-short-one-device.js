import {assert} from 'chai'
import initEnv from '../../core/init-environment'
import {debug} from '@kobiton/core-util'
import {getConfig} from '../../core/config'
import randomRunner from '../core/random-runner'

const {shortRunLoop} = getConfig()
let onlineDevice
let server

describe('test loop on one device', () => {

  before(async() => {
    const env = await initEnv()
    server = env.kobitonServer
    onlineDevice = env.onlineDevices[0]

    assert.equal(env.onlineDevices.length, 1, 'Expected at least 1 online device')
    debug.log('before', `start test with device ${onlineDevice.deviceName}`)
  })

  for (let i = 0; i < shortRunLoop; i++) {
    it(`should run test [${i + 1}/${shortRunLoop}]`, async() => {
      await randomRunner.run(server, onlineDevice)
    })
  }
})
