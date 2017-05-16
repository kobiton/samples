import BPromise from 'bluebird'
import moment from 'moment'
import * as runner from './runner'
import DailyWebTest from './scripts/daily-web'
import AndroidAppTest from './scripts/android-app'
import IOSAppTest from './scripts/ios-app'
import {report} from './reporter'
import api from '../framework/api'
import testConfig from '../framework/config/test'

import {debug} from '@kobiton/core-util'

class HealthChecker {
  async executeWebCheck() {
    const devices = await api.Device.getOnlineDevices()
    await this.execute(devices, new DailyWebTest())
  }

  async executeIOSAppCheck() {
    const devices = await api.Device.getOnlineDevices()
    await this.execute(devices, new IOSAppTest())
  }

  async executeAndroidAppCheck() {
    const devices = await api.Device.getOnlineDevices()
    await this.execute(devices, new AndroidAppTest())
  }

  async execute(devices, testScript,
    {retry = testConfig.healthCheck.maxRetry, checkedUUIDs = []} = {}) {

    const attemp = testConfig.healthCheck.maxRetry - retry
    if (attemp) {
      debug.log(`RETRY BUSY DEVICE ${attemp}/${testConfig.healthCheck.maxRetry}`)
    }
    let checkedDeviceUUIDs = [...checkedUUIDs]

    let device = await this._pickDevice(devices, checkedDeviceUUIDs)
    while (device) {
      checkedDeviceUUIDs.push(device.udid)
      debug.log(`Check on: ${device.deviceName} udid: ${device.udid}`)
      // eslint-disable-next-line babel/no-await-in-loop
      const results = await runner.execute([device], testScript)
      // eslint-disable-next-line babel/no-await-in-loop
      await report(results)
      // eslint-disable-next-line babel/no-await-in-loop
      device = await this._pickDevice(devices, checkedDeviceUUIDs)
    }

    const allDevices = await api.Device.getOnlineDevices()
    const unavailableDevices = allDevices.filter((d) => {
      return !checkedDeviceUUIDs.includes(d.udid)
    })

    if (unavailableDevices.length) {
      const offlineDevices = unavailableDevices.filter((d) => !d.isOnline)
      checkedDeviceUUIDs = checkedDeviceUUIDs.concat(offlineDevices.map((d) => d.udid))
      this._reportUnavailableDevice(offlineDevices, testScript)

      const busyDevices = unavailableDevices.filter((d) => d.isBooked && d.isOnline)
      if (retry > 0 && busyDevices.length > 0) {
        await BPromise.delay(testConfig.healthCheck.onDeviceBusyRetryInterval)
        await this.execute(busyDevices, testScript, {
          retry: (retry - 1), checkedUUIDs: checkedDeviceUUIDs
        })
      }
      else {
        this._reportUnavailableDevice(busyDevices, testScript)
      }
    }
  }

  async _pickDevice(devices, ignoredDeviceUDIDs) {
    const devicesUDIDs = devices.map((d) => d.udid)

    const allDevices = await api.Device.getOnlineDevices()
    return allDevices
      .filter((d) => {
        return devicesUDIDs.includes(d.udid) &&
          d.isOnline && !d.isBooked &&
          !ignoredDeviceUDIDs.includes(d.udid)
      })[0]
  }

  async _reportUnavailableDevice(devices, testScript) {
    const results = []
    for (const device of devices) {
      let state = 'failed'
      let err = null
      if (!device.isOnline) {
        err = {errMessage: 'Device is offline'}
      }
      else if (device.isBooked) {
        state = 'busy'
      }
      debug.log(`${device.deviceName} - udid: ${device.udid} : ${state} - ${JSON.stringify(err)}`)

      const result = runner.createResult({
        testCaseName: testScript.constructor.name,
        device,
        startedAt: moment(),
        finishedAt: moment(),
        state,
        err
      })
      results.push(result)
    }
    await report(results)
  }

}

export default new HealthChecker()
