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
    let useUDID = []
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

    devices = devices.filter((d) => d.isOnline && !d.isBooked)

    if (platformName) {
      platformName = platformName.toLowerCase()
      devices = devices.filter((d) => d.platformName.toLowerCase() === platformName)
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
        if (specificDevice.length !== 0) {
          useUDID.push(specificDevice[0])
        }
      }
      devices = useUDID
    }

    devices = devices.slice(indexBegin, indexFinish)

    return devices
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