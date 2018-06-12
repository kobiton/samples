import Device from '../../../framework/api/device'
import BPromise from 'bluebird'
import DevicesData from './_devices-data'
import Koby from '../../../framework/loadtest/koby'
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
  const concurrentDevices = config.concurrentLoadTest

  /**
   * Simulate Manual Session
   * @param token {string}
   * @param deviceId {int}
   * @param deviceInfo {object}
   */
  function simulateManualSession(token, deviceId, deviceInfo) {
    return new BPromise(async (resolve, reject) => {
      const koby = new Koby({
        deviceInfo,
        token
      })
      await koby.activate()
      .catch((err) => {
        reject(err)
      })

      debug.log('Start manual')
      const appInstance = new Manual(token, deviceId)
      await appInstance.launch()
        .catch((err) => {
          reject(err)
        })

      koby.on('session-ended', () => {
        resolve()
      })
    })
  }

  it('should launch concurrent 300 manual test sessions successfully', async () => {
    const token = await Device.getBearerToken(username, password)
    devices = devices.slice(0, concurrentDevices)

    const devicesTest = await devices.map(async(d) => {
      let object = deviceInfo(d)
      await Device.updateDeviceInfo(token, object)
      const onlineDevice = await Device.getOnlineDevices({
        groupType: 'private',
        arrayUDID: object.udid
      })
      if (onlineDevice[0] && onlineDevice[0].id) {
        simulateManualSession(token, onlineDevice[0].id, object)
      }
    })

    await BPromise.all(devicesTest)
  })
})
