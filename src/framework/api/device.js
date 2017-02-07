import Base from './_base'

const subUrl = {
  devices: 'devices'
}

class Device extends Base {

  async _getDevices() {
    const [devicesGroups] = await this.get({
      path: subUrl.devices
    })
    return devicesGroups
  }

  async _getOnlineDevicesBy({
    groupType = 'all',
    platformName,
    platformVersion,
    deviceName,
    deviceNumbers
  } = {}) {
    const devicesGroups = await this._getDevices()
    let devices
    switch (groupType) {
      case 'private':
        devices = devicesGroups.privateDevices
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

    return devices
  }

  async getOnlineDevices({
    groupType = 'all',
    platformName,
    platformVersion,
    deviceName,
    deviceNumbers
  } = {}) {

    return await this._getOnlineDevicesBy({
      groupType,
      platformName,
      platformVersion,
      deviceName,
      deviceNumbers
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
