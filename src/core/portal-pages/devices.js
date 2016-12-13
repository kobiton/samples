import AuthenticatedPage from './authenticated'
import ManualPage from './manual'
import {debug} from '@kobiton/core-util'

const defaultElements = {
  group: {
    favorite: '//h3[contains(., "Favorite Devices")]/../../following-sibling::div/div',
    cloud: '//h3[contains(., "Cloud Devices")]/../../following-sibling::div/div',
    private: '//h3[contains(., "Private Devices")]/../../following-sibling::div/div'
  },
  device: {
    isOnline: '/div/div[2]/div[2]/div/div[contains(@style, "rgb(104, 159, 56)")]',
    name: '/div/div[2]/div[1]/div',
    launchButton: '/div[3]/button[1]'
  },
  closeDialogButton: '//*[div/div/h2[contains(.,"Help us, help you.")]]/*[local-name()="svg"]'
}

export default class devicesPage extends AuthenticatedPage {
  constructor(elements = {}) {
    super({...defaultElements, ...elements})
  }

  open() {
    super.open('devices')
  }

  closeHelpDialog() {
    this.waitForLoadingProgressDone()
    if (browser.isExisting(this.elements.closeDialogButton)) {
      browser.click(this.elements.closeDialogButton)
    }
  }

  /**
   * Launch a device which belong to a group
   */
  launchAnOnlineDevice({group = 'cloud', deviceName}) {
    this.waitForLoadingProgressDone()
    return this._launchADevice(this._getDeviceLocator({group, deviceName}))
  }

  getTotalOnlineDevices({group = 'cloud', deviceName}) {
    const onlineDevices = this._getOnlineDevicesLocator({group: 'cloud', deviceName})
    return this.getTotalVisibleElements(onlineDevices)
  }

  _getOnlineDevicesLocator({group = 'cloud', deviceName}) {
    const deviceLocators = this._getDeviceLocator({group, deviceName})
    return deviceLocators.concat(this.elements.device.isOnline)
  }

  _getDeviceLocator({group = 'cloud', deviceName}) {
    const groupLocators = this.elements.group[group]
    const deviceLocators = deviceName
      ? groupLocators.concat(`[${this.elements.device.name.substr(1)}[text()="${deviceName}"]]`)
      : groupLocators
    return deviceLocators
  }

/**
 * Launch a device from list device locator
 */
  _launchADevice(listDeviceLocator) {
    let i = 1
    let foundDevice = false
    let currentDeviceName
    let maxElement = 0
    maxElement = this.getTotalVisibleElements(listDeviceLocator)
    // disable websocket to make sure that the order of devices won't change
    this._disableWebSocket()
    while (foundDevice || i <= maxElement) {
      // This is ancestor element which used to mix with deviceName, onlineStatus,
      // and launchButton
      const deviceSelector = listDeviceLocator.concat(`[${i}]`)
      const deviceNameLocator = `${deviceSelector}${this.elements.device.name}`
      currentDeviceName = browser.getText(deviceNameLocator)
      const onlineStatusLocator = `${deviceSelector}${this.elements.device.isOnline}`

      foundDevice = browser.isExisting(onlineStatusLocator)

      if (foundDevice) {
        const launchButtonLocator = `${deviceSelector}${this.elements.device.launchButton}`
        browser.scroll(onlineStatusLocator)
        browser.moveToObject(onlineStatusLocator)
        browser.click(onlineStatusLocator)
        browser.waitForExist(launchButtonLocator)
        // Enable websocket for using at manual page
        this._enableWebSocket()
        browser.click(launchButtonLocator)
        const manualPage = new ManualPage()
        manualPage.DeviceName = currentDeviceName
        return manualPage
      }
      i++
    }
  }

  /**
   * Get the total visible elments
   */
  getTotalVisibleElements(selector) {
    try {
      const results = browser.isVisible(selector)
      if (Array.isArray(results)) {
        return results.length
      }
      else {
        if (results) return 1
        else return 0
      }
    }
    catch (err) {
      debug.error(err)
      return 0
    }
  }

  _disableWebSocket() {
    /* eslint-disable */
    browser.execute(() => {
      window.sendFunc = window.WebSocket.prototype.send;
      window.WebSocket.prototype.send = function () {
      }
    })
    /* eslint-enable */
  }

  _enableWebSocket() {
    /* eslint-disable */
    browser.execute(() => {
      window.WebSocket.prototype.send = window.sendFunc;
    })
    /* eslint-enable */
  }

}
