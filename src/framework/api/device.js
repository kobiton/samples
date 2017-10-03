import BPromise from 'bluebird'
import moment from 'moment'
import Base from './_base'
import group from '../common/groupType/type-of-group'
import config from '../config/test'

class Device extends Base {

  async _getDevices() {
    const [devicesGroups] = await this.get({
      path: 'devices'
    })
    return devicesGroups
  }

  async _getDevicesBy({
    onlineDeviceOnly = true,
    groupType = 'all',
    platformName,
    platformVersion,
    deviceName,
    deviceNumbers,
    indexBegin,
    indexFinish,
    arrayUDID
  } = {}) {
    const devicesGroups = await this._getDevices()
    let devices
    let devicesByUDID = []
    switch (groupType) {
      case group.private:
        devices = devicesGroups.privateDevices.sort((a, b) => a.id - b.id)
        break
      case group.cloud:
        devices = devicesGroups.cloudDevices
        break
      default:
        devices = devicesGroups.cloudDevices.concat(devicesGroups.privateDevices)
    }

    devices = devices.filter((d) => !d.support.appiumDisabled)

    if (platformName) {
      platformName = platformName.toLowerCase()
      devices = devices.filter((d) => d.platformName.toLowerCase() === platformName)
    }

    if (indexBegin !== -1) {
      devices = devices.slice(indexBegin, indexFinish)
    }
    else {
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
    }
    return devices
  }

  async isOnlineDevice(device) {
    const groupType = (device.udid) ? group.private : group.cloud
    let platformName = device.platformName
    const platformVersion = device.platformVersion
    let deviceName = device.deviceName
    const arrayUDID = (device.udid) ? device.udid : ''
    const deviceNumbers = config.device.number
    const indexBegin = -1
    const indexFinish = 1000
    const onlineDevices = await this._getDevicesBy({
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers,
      indexBegin,
      indexFinish,
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
          indexBegin,
          indexFinish,
          arrayUDID
        })
        isOnline = (checkOnline.length > 0)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (!isOnline && duration < timeToCleanUp)
    }
    return isOnline
  }

  async getOnlineDevices({
    groupType = config.device.group,
    platformName = config.device.platform,
    platformVersion = config.device.version,
    deviceName = config.device.name,
    deviceNumbers = config.device.number,
    indexBegin = config.device.indexBegin,
    indexFinish = config.device.indexFinish,
    arrayUDID = config.device.arrayUDID
  } = {}) {

    return await this._getDevicesBy({
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers,
      indexBegin,
      indexFinish,
      arrayUDID
    })
  }

  async getAllDevices({
    groupType = config.device.group,
    platformName = config.device.platform,
    platformVersion = config.device.version,
    deviceName = config.device.name,
    deviceNumbers = config.device.number,
    arrayUDID = config.device.arrayUDID
  } = {}) {
    return await this._getDevicesBy({
      onlineDeviceOnly: false,
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers,
      arrayUDID
    })
  }

  async countDeviceByCriteria({
    groupType,
    status,
    name
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
    return devices.length
  }

  async getDevice(udid) {
    const groups = await this._getDevices()
    const allDevices = groups.privateDevices
    const matches = allDevices.filter((d) => {
      return d.udid === udid
    })
    return matches[0]
  }
}

export default new Device()
