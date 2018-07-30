import BPromise from 'bluebird'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import testConfig from '../framework/config/test'
import Device from '../framework/api/device'
import * as runner from './runner'
import {report} from './reporter'
import BaseTest from './scripts/base'
import DailyWebTest from './scripts/daily-web'
import AndroidAppTest from './scripts/android-app'
import IOSAppTest from './scripts/ios-app'

const expectedDurationInSeconds = testConfig.expectedDurationInMinutes * 60
const initial = new BaseTest()

class HealthChecker {
  async executeWebCheck() {
    const devices = await Device.getDevices({onlineDeviceOnly: true})
    await this.execute(initial._getTimeStamp(),
      devices, expectedDurationInSeconds, new DailyWebTest())
  }

  async executeIOSAppCheck() {
    const devices = await Device.getDevices({onlineDeviceOnly: true})
    await this.execute(initial._getTimeStamp(),
      devices, expectedDurationInSeconds, new IOSAppTest())
  }

  async executeAndroidAppCheck() {
    const devices = await Device.getDevices({onlineDeviceOnly: true})
    await this.execute(initial._getTimeStamp(),
      devices, expectedDurationInSeconds, new AndroidAppTest())
  }

  async execute(timeStamp, devices, expectedDuration, testScript,
    {retry = testConfig.healthCheck.maxRetry, checkedUUIDs = []} = {}) {

    const attemp = testConfig.healthCheck.maxRetry - retry
    if (attemp) {
      debug.log(`RETRY BUSY DEVICE ${attemp}/${testConfig.healthCheck.maxRetry}`)
    }

    let checkedDeviceUUIDs = [...checkedUUIDs]
    const concurrentDevices = testConfig.healthCheck.maxConcurrentDevices

    let selectedDevices = await this._pickDevices(devices, checkedDeviceUUIDs, concurrentDevices)
    while (selectedDevices && selectedDevices.length) {
      checkedDeviceUUIDs = checkedDeviceUUIDs.concat(selectedDevices.map((d) => d.udid))

      selectedDevices.forEach((device) => {
        debug.log(`Check on: ${device.deviceName} udid: ${device.udid}`)
      })

      // eslint-disable-next-line babel/no-await-in-loop
      const results = await runner.execute(timeStamp, selectedDevices, expectedDuration, testScript)

      // eslint-disable-next-line babel/no-await-in-loop
      await report(results)

      // eslint-disable-next-line babel/no-await-in-loop
      selectedDevices = await this._pickDevices(devices, checkedDeviceUUIDs, concurrentDevices)
    }

    const allDevices = await Device.getDevices({onlineDeviceOnly: false})
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
        await this.execute(timeStamp, busyDevices, expectedDuration, testScript, {
          retry: (retry - 1), checkedUUIDs: checkedDeviceUUIDs
        })
      }
      else {
        this._reportUnavailableDevice(busyDevices, testScript)
      }
    }
  }

  async _pickDevices(devices, ignoredDeviceUDIDs, amount = 1) {
    const devicesUDIDs = devices.map((d) => d.udid)

    const allDevices = await Device.getDevices({onlineDeviceOnly: false})
    return allDevices
      .filter((d) => {
        return devicesUDIDs.includes(d.udid) &&
          d.isOnline && !d.isBooked &&
          !ignoredDeviceUDIDs.includes(d.udid)
      })
      .slice(0, amount)
  }

  async _reportUnavailableDevice(devices, testScript) {
    const results = []
    for (const device of devices) {
      let state = 'failed'
      let err = null
      if (!device.isOnline) {
        err = {message: 'Device is offline'}
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
