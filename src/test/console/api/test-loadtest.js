import Device from '../../../framework/api/device'
import BPromise from 'bluebird'
import DevicesData from './_devices-data'
import Koby from '../../../framework/loadtest/koby'
import Auto from '../../../framework/loadtest/auto'
import Manual from '../../../framework/loadtest/manual'
import {debug} from '@kobiton/core-util'
import config from '../../../framework/config/test'
const {username1: username, password1: password} = {...config}

describe('HUB/ API', () => {

  const machine = {
    'hostname': 'MacBook-Pro loadtest',
    'arch': 'x64',
    'freemem': 164831232,
    'totalmem': 8589934592,
    'platform': 'darwin',
    'type': 'Darwin',
    'uptime': 72701,
    'version': 'v2.2',
    'buildNumber': 'loadtest',
    'network': {
      'address': '192.168.36.52',
      'netmask': '255.255.255.0',
      'family': 'IPv4',
      'mac': 'f4:0f:24:1f:f3:d6',
      'internal': false
    }
  }

  /**
   * Generate device Info
   * @param capabilities {object}
   */
  function deviceInfo(capabilities) {
    return {
      nodeId: '7728179D-CBFD-58AF-9D6B-A99490D1A905',
      udid: capabilities.udid,
      capabilities,
      machine
    }
  }

  let devices = DevicesData.devices
  const concurrentDevices = config.concurrentLoadTest || 50
  const typeOfTest = config.typeOfTest || 'all'

  /**
   * Simulate Auto || Manual Session
   * @param type {string} auto || manual
   * @param token {string}
   * @param deviceId {int}
   * @param deviceInfo {object}
   */
  function simulateSession(type, token, deviceId, deviceInfo) {
    let appInstance
    return new BPromise(async (resolve, reject) => {
      const koby = new Koby({
        deviceInfo,
        token
      })
      await koby.activate()
      .catch((err) => {
        reject(err)
      })

      debug.log(`Start ${type}`)
      if (type === 'auto') {
        appInstance = new Auto(deviceInfo)
        appInstance.on('wd-failed', () => {
          koby.disconnectControlConnection()
          koby.emit('session-ended')
        })
        
      }
      else if (type === 'manual') {
        appInstance = new Manual(token, deviceId)
      }
      await appInstance.launch()
        .catch((err) => {
          reject(err)
        })
      koby.on('session-ended', () => {
        resolve()
      })
    })
  }

  let token
  before(async () => {
    token = await Device.getBearerToken(username, password)
    devices = devices.slice(0, concurrentDevices)
    
  })

  async function runTest(type, device) {
    let object = deviceInfo(device)
    await Device.updateDeviceInfo(token, object)
    await BPromise.delay(2000)
    const onlineDevice = await Device.getDevices({
      groupType: 'private',
      arrayUDID: object.udid,
      onlineDeviceOnly: false
    })
    if (onlineDevice[0] && onlineDevice[0].id) {
      await simulateSession(type, token, onlineDevice[0].id, object)
    }
  }

  it(`should launch concurrent ${concurrentDevices} ${typeOfTest} test sessions`, async () => {
    let devicesTest
    switch (typeOfTest.toLowerCase()) {
      case 'auto':
      case 'manual':
        devicesTest = await devices.map(async (d) => {
          await runTest(typeOfTest.toLowerCase(), d)
        })
        await BPromise.all(devicesTest)
        break
      default:
        devicesTest = await devices.map(async (d) => {
          await runTest('auto', d)
        })
        await BPromise.all(devicesTest)

        await BPromise.delay(5000)

        devicesTest = await devices.map(async (d) => {
          await runTest('manual', d)
        })
        await BPromise.all(devicesTest)
        break
    }
  })

})
