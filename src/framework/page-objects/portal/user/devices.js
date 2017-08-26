import AuthenticatedPage from './base'
import ManualPage from './manual'
import {debug} from '@kobiton/core-util'

const elements = {
  mainFunction: {
    devices: '//a[contains(@href, "devices")]/span',
    sessions: '//a[contains(@href, "sessions")]/span',
    appRepo: '//a[contains(@href, "apps")]/span',
    download: '//span[contains(., "Download")]',
    documentation: '//span[contains(., "Documentation")]',
    support: '//span[contains(., "Support")]'
  },
  group: {
    favorite: '//h3[contains(., "Favorite Devices")]/../../following-sibling::div/div',
    cloud: '//div[span//h3[contains(., "Cloud Devices")]]/../following-sibling::div/div/div',
    private: '//h3[contains(., "Private Devices")]/../../following-sibling::div/div'
  },
  device: {
    isOnline: '//div[contains(@style, "rgb(104, 159, 56)")]',
    isUtilizing: '//div[contains(@style, "rgb(251, 192, 45)")]',
    isOffline: '//div[contains(@style, "rgb(97, 97, 97)")]',
    name: '/div/div[2]/div[1]/div',
    launchButton: '/div[2]/div[2]/span/button[1]'
  },
  search: {
    onlineCheckbox: '//label[contains(.,"Online")]/../div',
    busyCheckbox: '//label[contains(.,"Busy")]/../div',
    offlineCheckbox: '//label[contains(.,"Offline")]/../div',
    isKobitonDevices: '//label[contains(.,"Kobiton devices")]/../div',
    isMyDevices: '//label[contains(.,"My devices")]/../div'
  },
  closeDialogButton: '//*[div/div/h2[contains(.,"Help us, help you.")]]/*[local-name()="svg"]'
}

export default class DevicesPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  /**
   * Open devices page
   */
  open() {
    super.open('devices')
  }

  closeHelpDialog() {
    this.waitForLoadingProgressDone()
    if (this._browser.isExisting(elements.closeDialogButton)) {
      this._browser.click(elements.closeDialogButton)
    }
  }

  /**
   * Get url of devices page
   */
  getUrlPage() {
    return this._browser.getUrl()
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
    return deviceLocators.concat(elements.device.isOnline)
  }

  _getDeviceLocator({group = 'cloud', deviceName}) {
    const groupLocators = elements.group[group]
    const deviceLocators = deviceName
      ? groupLocators.concat(`[${elements.device.name.substr(1)}[text()="${deviceName}"]]`)
      : groupLocators
    return deviceLocators
  }

/**
 * Launch a device from list device locator
 */
  _launchADevice(listDeviceLocator) {
    let i = 1
    let foundDevice = false
    let maxElement = 0
    maxElement = this.getTotalVisibleElements(listDeviceLocator)

    while (foundDevice || i <= maxElement) {
      // This is ancestor element which used to mix with deviceName, onlineStatus,
      // and launchButton
      const deviceSelector = listDeviceLocator.concat(`[${i}]`)
      const onlineStatusLocator = `${deviceSelector}${elements.device.isOnline}`

      foundDevice = this._browser.isExisting(onlineStatusLocator)

      if (foundDevice) {
        const launchButtonLocator = `${deviceSelector}${elements.device.launchButton}`
        this._browser.scroll(onlineStatusLocator)
        this._browser.moveToObject(onlineStatusLocator)
        this._browser.waitForExist(launchButtonLocator)
        this._browser.click(launchButtonLocator)
        const manualPage = new ManualPage()
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
      const results = this._browser.isVisible(selector)
      if (Array.isArray(results)) {
        return results.length
      }
      else {
        return (results) ? 1 : 0
      }
    }
    catch (err) {
      debug.error(err)
      return 0
    }
  }

}
