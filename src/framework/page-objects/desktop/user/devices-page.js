import MenuBar from './menu-bar'

const defaultElements = {
  deviceList: '//div[text()="Today"]/ancestor::div[6]/div[2]/div',
  deviceInfoSubPath: '/div/div/div/div[1]/div/div/div[2]',
  todayConsumedTimeSubPath: '/div/div/div/div[1]/div/div[2]/div/div[1]',
  weekConsumedTimeSubPath: '/div/div/div/div[1]/div/div[3]/div/div[1]',
  registerButtonSubPath: '//button',
  buttonLabelSubPath: '//button//span',
  deviceStatusLabelSubPath: '/div/div/div/div[2]/div/div/div[2]',
  notificationMessage: '//div[text()="Today"]/ancestor::div[6]/parent::div/div[2]/div',
  dismissButton: '//div[text()="Today"]/ancestor::div[6]/parent::div/div[2]/div/div/a'
}

const deviceStatusEnum = {
  UNAVAILABLE: 'Unavailable',
  CONNECTING: 'Connecting',
  READYTOREGISTER: 'ReadyToRegister',
  REGISTERED: 'Registered'
}

export default class DevicesPage extends MenuBar {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  /**
  * Get devices info from Desktop app
  */
  async getDevicesInfo({
    status,
    deviceName,
    udid
  } = {}) {
    await this.pause(1)
    const totalDevices = (await this.client.elements(this.elements.deviceList)).value.length
    let deviceInfo = {}
    let devicesInfo = []
    if (totalDevices > 0) {
      for (let i = 1; i <= totalDevices; i++) {
        deviceInfo.Index = i
        deviceInfo.DeviceName = await this.client.getText(`${this.elements.deviceList}[${i}]${this.elements.deviceInfoSubPath}/div[1]`) // eslint-disable-line max-len
        deviceInfo.OSVersion = await this.client.getText(`${this.elements.deviceList}[${i}]${this.elements.deviceInfoSubPath}/div[2]`) // eslint-disable-line max-len
        deviceInfo.SerialNumber = (await this.client.getText(`${this.elements.deviceList}[${i}]${this.elements.deviceInfoSubPath}/div[3]`)).replace('S/N:', '') // eslint-disable-line max-len
        deviceInfo.UDID = (await this.client.getText(`${this.elements.deviceList}[${i}]${this.elements.deviceInfoSubPath}/div[4]`)).replace('UDID: ', '') // eslint-disable-line max-len
        deviceInfo.TodayConsumed = (await this.client.getText(`${this.elements.deviceList}[${i}]${this.elements.todayConsumedTimeSubPath}`)).replace('...', '') // eslint-disable-line max-len
        deviceInfo.WeekConsumed = (await this.client.getText(`${this.elements.deviceList}[${i}]${this.elements.weekConsumedTimeSubPath}`)).replace('...', '') // eslint-disable-line max-len
        deviceInfo.Status = await this.getDeviceStatus(i)

        devicesInfo.push(deviceInfo)
        deviceInfo = {}
      }
    }
    if (status) {
      devicesInfo = devicesInfo.filter((d) => d.Status.toLowerCase() === status.toLowerCase())
    }
    if (deviceName) {
      devicesInfo = devicesInfo.filter((d) => d.DeviceName.toLowerCase() === deviceName.toLowerCase()) // eslint-disable-line max-len
    }
    if (udid) {
      devicesInfo = devicesInfo.filter((d) => d.UDID.toLowerCase() === udid.toLowerCase())
    }
    return devicesInfo
  }

  /**
  * Get device's status
  * @param: deviceIndex - device's index in the device list
  * Return a string of status
  */
  async getDeviceStatus(deviceIndex) {
    const statusText = await this.client.getText(`${this.elements.deviceList}[${deviceIndex}]${this.elements.deviceStatusLabelSubPath}`) // eslint-disable-line max-len
    const registerButtonExisting = await this._isExisting(`${this.elements.deviceList}[${deviceIndex}]${this.elements.registerButtonSubPath}`) // eslint-disable-line max-len
    if (statusText === '') {
      return (registerButtonExisting) ? deviceStatusEnum.READYTOREGISTER
              : deviceStatusEnum.UNAVAILABLE
    }
    else if (statusText.includes('Registered')) {
      return deviceStatusEnum.REGISTERED
    }
    else {
      return deviceStatusEnum.CONNECTING
    }
  }

  async _isExisting(locator) {
    return await this.client.isExisting(locator)
  }

  async registerDevice(deviceIndex) {
    await this._switchDevice(deviceIndex, 'REGISTER')
  }

  async registerDevices(deviceIndexes) {
    for (let index of deviceIndexes) {
      await this.registerDevice(index)
    }
  }

  async unregisterDevice(deviceIndex) {
    await this._switchDevice(deviceIndex, 'UNREGISTER')
  }

  async unregisterDevices(deviceIndexes) {
    for (let index of deviceIndexes) {
      await this.unregisterDevice(index)
    }
  }

  /**
  * Register or unregister a device
  * @param: deviceIndex - device's index in the device list
  * @param: state - device's status, it is either Register or Unregister
  */
  async _switchDevice(deviceIndex, state) {
    const registerButtonLocator = `${this.elements.deviceList}[${deviceIndex}]${this.elements.registerButtonSubPath}` // eslint-disable-line max-len
    const deviceStatus = await this.getDeviceStatus(deviceIndex)
    if (await this._isExisting(registerButtonLocator)) {
      switch (state.toUpperCase()) {
        case 'REGISTER':
          if (deviceStatus === deviceStatusEnum.READYTOREGISTER) {
            await this.client.click(registerButtonLocator)
          }
          break
        case 'UNREGISTER':
          if (deviceStatus === deviceStatusEnum.REGISTERED) {
            await this.client.click(registerButtonLocator)
          }
          break
      }
    }
  }

  /**
  * Get device's index in the device list in desktop app
  * @param: udid - a string of device's udid
  * Return an equivalent number that is a position of a device in the device list in desktop app
  */
  async getDeviceIndex(udid) {
    const devicesInfo = await this.getDevicesInfo()
    const filteredDevice = devicesInfo.filter((d) => d.UDID === udid)
    return (filteredDevice.length > 0) ? filteredDevice[0].Index : -1
  }

  /**
  * Get an array of device indexes from an array of device's info
  * @param: devicesInfo - an array of device's info
  * Return an array of device indexes
  */
  getDeviceIndexes(devicesInfo) {
    let indexes = []
    if (devicesInfo.length > 0) {
      devicesInfo.map((deviceInfo) => {
        indexes.push(deviceInfo.Index)
      })
    }
    return indexes
  }

  /**
  * Get an array of device UDIDs from an array of device's info
  * @param: devicesInfo - an array of device's info
  * Return an array of UDIDs
  */
  getDeviceUDIDs(devicesInfo) {
    let udids = []
    if (devicesInfo.length > 0) {
      devicesInfo.map((deviceInfo) => {
        udids.push(deviceInfo.UDID)
      })
    }
    return udids
  }

}
