import BPromise from 'bluebird'
import moment from 'moment'
import Base from './_base'
import group from '../common/groupType/type-of-group'
import config from '../config/test'

class Device extends Base {

  /**
   * Retrieve devices in 3 groups: private/org, favorite and cloud devices.
   */
  async _getDevices() {
    const [devicesGroups] = await this.get({
      path: 'devices'
    })
    return devicesGroups
  }

  /**
   * Mark a device favorite
   * @param deviceId {integer} - Device ID
   */
  async markDeviceFavorite(deviceId) {
    return await this.post({
      path: `devices/${deviceId}/favorite`
    })
  }

  /**
   * Unmark favorite device
   * @param deviceId {integer} - Device ID
   */
  async unmarkFavoriteDevice(deviceId) {
    return await this.delete({
      path: `devices/${deviceId}/favorite`
    })
  }

  /**
   * Update Device Info into Hub
   * @param data {Object} nodeId, udid, capabilities {} , machine {}
   */
  async updateDeviceInfo(token, data) {
    return await this.post({
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      path: 'devices/update',
      body: data
    })
  }

  /**
   * Update Device Status
   * @param udid {string} udid of device
   * @param state {string} 'ACTIVATING' | ACTIVATED | DEACTIVATED
   * @param message {string} The defined message to send to hub
   */
  async updateDeviceStatus(token, udid, status, message) {
    return await this.put({
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      path: `devices/${udid}/status`,
      body: {
        deviceUDID: udid,
        state: status,
        message
      }
    })
  }

  /**
   * Book device depends on deviceId
   * @param deviceId {int} deviceId in DB
   */
  async bookDevice(token, deviceId) {
    return await this.post({
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      path: 'hubs/book',
      body: {
        deviceId
      }
    })
  }

  /**
   * Filter devices by some criteria
   * @param groupType {string} - Private | Cloud | Favorite | All
   * @param platformName {string} - Android | iOS
   * @param platformVersion {string} - Platform Version
   * @param deviceName {string} - Device Name
   * @param deviceNumbers {integer} - Total devices
   * @param arrayUDID {array} - List of devices
   */
  async _getDevicesBy({
    onlineDeviceOnly,
    groupType = 'all',
    platformName,
    platformVersion,
    deviceName,
    deviceNumbers,
    arrayUDID
  } = {}) {
    const devicesGroups = await this._getDevices()
    let devices
    let devicesByUDID = []
    switch (groupType.toLowerCase()) {
      case groupType.private:
        devices = devicesGroups.privateDevices.sort((a, b) => a.id - b.id)
        break
      case groupType.cloud:
        devices = devicesGroups.cloudDevices
        break
      case groupType.favorite:
        devices = devicesGroups.favoriteDevices
        break
      default:
        devices = devicesGroups.cloudDevices.concat(devicesGroups.privateDevices)
        break
    }

    devices = devices.filter((d) => !d.support.appiumDisabled)

    if (platformName) {
      platformName = platformName.toLowerCase()
      devices = devices.filter((d) => d.platformName.toLowerCase() === platformName)
    }

    if (onlineDeviceOnly) {
      devices = devices.filter((d) => d.isOnline && !d.isBooked)
    }

    if (platformVersion) {
      devices = devices.filter((d) => d.platformVersion.includes(platformVersion))
    }

    if (deviceName) {
      deviceName = deviceName.toLowerCase()
      devices = devices.filter((d) => d.deviceName.toLowerCase().includes(deviceName))
    }

    if (!isNaN(deviceNumbers)) {
      devices = devices.length > deviceNumbers ? devices.slice(0, deviceNumbers) : devices
    }

    if (arrayUDID) {
      const udids = arrayUDID.split(',')
      for (const udid of udids) {
        let specificDevice = devices.filter((d) => d.udid === udid)
        if (specificDevice.length > 0) {
          devicesByUDID.push(specificDevice[0])
        }
      }
      devices = devicesByUDID
    }
    return devices
  }

  /**
   * Get the status of the device
   * @param device {object} - The object device
   */
  async isOnlineDevice(device) {
    const groupType = config.device.group
    let platformName = device.platformName
    const platformVersion = device.platformVersion
    let deviceName = device.deviceName
    const arrayUDID = (config.device.group === 'private') ? device.udid : ''
    const deviceNumbers = config.device.number
    const onlineDevices = await this._getDevicesBy({
      onlineDeviceOnly: true,
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers,
      arrayUDID
    })
    let isOnline = (onlineDevices.length > 0)
    if (!isOnline && config.longTestSuiteIterationAmount > 1) {
      let duration = 0
      const startedAt = moment.utc()
      const timeToCleanUp = 180 // seconds
      do {
        // eslint-disable-next-line babel/no-await-in-loop
        await BPromise.delay(10000) //delay 10000 milliseconds
        // eslint-disable-next-line babel/no-await-in-loop
        const checkOnline = await this._getDevicesBy({
          groupType,
          arrayUDID
        })
        isOnline = (checkOnline.length > 0)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (!isOnline && duration < timeToCleanUp)
    }
    return isOnline
  }

  /**
   * Return the list of Online devices
   * @param groupType {string} - Private | Cloud | Favorite | All
   * @param platformName {string} - Android | iOS
   * @param platformVersion {string} - Platform Version
   * @param deviceName {string} - Device Name
   * @param deviceNumbers {integer} - Total devices
   * @param arrayUDID {array} - List of devices
   */
  async getDevices({
    groupType = config.device.group,
    platformName = config.device.platformName,
    platformVersion = config.device.platformVersion,
    deviceName = config.device.name,
    deviceNumbers = config.device.number,
    arrayUDID = config.device.arrayUDID,
    onlineDeviceOnly = config.device.onlineDeviceOnly
  } = {}) {
    return await this._getDevicesBy({
      onlineDeviceOnly,
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers,
      arrayUDID
    })
  }

  /**
   * Count total devices depend on some criteria
   * @param groupType {string} - Private | Cloud | Favorite | All
   * @param status {string} - Online | Busy | Offline
   * @param name {string} - Device Name
   * @param platformVersion {string} - Platform Version
   */
  async countDeviceByCriteria({
    groupType,
    status,
    name,
    platformVersion
  } = {}) {
    const allDevices = await this._getDevices()
    let devices
    switch (groupType) {
      case group.private:
        devices = allDevices.privateDevices
        break
      case group.cloud:
        devices = allDevices.cloudDevices
        break
      case group.favorite:
        devices = allDevices.favoriteDevices
        break
      default:
        devices = allDevices.cloudDevices.concat(
          allDevices.privateDevices).concat(allDevices.favoriteDevices)
        break
    }
    devices = devices.filter((d) => !d.isHidden)
    switch (status) {
      case 'online':
        devices = devices.filter((d) => d.isOnline && !d.isBooked)
        break
      case 'busy':
        devices = devices.filter((d) => d.isOnline && d.isBooked)
        break
      case 'offline':
        devices = devices.filter((d) => !d.isOnline)
        break
    }
    if (name) {
      name = name.toLowerCase()
      devices = devices.filter((d) => d.deviceName.toLowerCase().includes(name))
    }
    if (platformVersion) {
      devices = devices.filter((d) => d.platformVersion.includes(platformVersion))
    }
    return devices.length
  }

}

export default new Device()
