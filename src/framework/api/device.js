import Base from './_base'
import config from '../config/test'

class Device extends Base {

  async _getDevices() {
    const [devicesGroups] = await this.get({
      path: 'devices'
    })
    return devicesGroups
  }

  async _getOnlineDevicesBy({
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
      case 'private':
        devices = devicesGroups.privateDevices.sort((a, b) => a.id - b.id)
        break
      case 'cloud':
        devices = devicesGroups.cloudDevices
        break
      default:
        devices = devicesGroups.cloudDevices.concat(devicesGroups.privateDevices)
    }
    if (platformName) {
      platformName = platformName.toLowerCase()
      devices = devices.filter((d) => d.platformName.toLowerCase() === platformName)
    }

    if (indexBegin) {
      devices = devices.slice(indexBegin, indexFinish)
    }
    else {
      devices = devices.filter((d) => d.isOnline && !d.isBooked)

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
    const groupType = (device.udid) ? 'private' : 'cloud'
    let platformName = device.platformName
    const platformVersion = device.platformVersion
    let deviceName = device.deviceName
    const arrayUDID = (device.udid) ? device.udid : ''
    const deviceNumbers = 1
    const indexBegin = null
    const indexFinish = null
    const onlineDevices = await this._getOnlineDevicesBy({
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers,
      indexBegin,
      indexFinish,
      arrayUDID
    })
    const isOnline = (onlineDevices.length > 0)
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

    return await this._getOnlineDevicesBy({
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

  async getPrivateOnlineDevices({
    platformName,
    platformVersion,
    deviceName
  } = {}) {
    return await this._getOnlineDevicesBy({
      platformName,
      platformVersion,
      deviceName,
      groupType: 'private'
    })
  }

  async getCloudOnlineDevices({
    platformName,
    platformVersion,
    deviceName
  } = {}) {
    return await this._getOnlineDevicesBy({
      platformName,
      platformVersion,
      deviceName,
      groupType: 'cloud'
    })
  }
}

export default new Device()
