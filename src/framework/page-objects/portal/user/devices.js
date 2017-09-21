import {debug} from '@kobiton/core-util'
import AuthenticatedPage from './base'
import ManualPage from './manual'

const elements = {
  buttonSetting: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]/div/button',
  settingsTag: '//div[text()="Settings"]',
  profileTag: '//div[text()="Profile"]',
  subscriptionTag: '//div[text()="Subscription"]',
  logoutTag: '//div[text()="Logout"]',
  favorite: '//div[span//h3[contains(., "Favorite Devices")]]/../following-sibling::div/div/div',
  cloud: '//div[span//h3[contains(., "Cloud Devices")]]/../following-sibling::div/div/div',
  private: '//h3[contains(., "Private Devices")]/../../following-sibling::div/div',
  isOnline: '//div[contains(@style, "rgb(104, 159, 56)")]',
  isUtilizing: '//div[contains(@style, "rgb(251, 192, 45)")]',
  isOffline: '//div[contains(@style, "background-color: rgb(97, 97, 97)")]',
  android: '//div[contains(text(),"Android")]',
  ios: '//div[contains(text(),"iOS")]',
  name: '/div/div[2]/div[1]/div',
  deviceTag: '//div[contains(@style, "background-color: rgb(224, 224, 224)")]',
  launchButton: '/div[2]/div[2]/span/button[1]',
  favoriteButton: '/div[2]/div[1]/span/button',
  devices: '//a[contains(@href, "devices")]/span',
  sessions: '//a[contains(@href, "sessions")]/span',
  appRepo: '//a[contains(@href, "apps")]/span',
  download: '//span[contains(., "Download")]',
  documentation: '//span[contains(., "Documentation")]',
  support: '//span[contains(., "Support")]',
  avatar: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[1]/*[@size="40"]',
  profileSetting: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]',
  onlineCheckbox: '//label[contains(.,"Online")]/parent::div/parent::div/input',
  busyCheckbox: '//label[contains(.,"Busy")]/parent::div/parent::div/input',
  offlineCheckbox: '//label[contains(.,"Offline")]/parent::div/parent::div/input',
  kobitonCheckbox: '//label[contains(.,"Kobiton devices")]/parent::div/parent::div/input',
  myDevicesCheckbox: '//label[contains(.,"My devices")]/parent::div/parent::div/input',
  closeDialogButton: '//*[div/div/h2[contains(.,"Help us, help you.")]]/*[local-name()="svg"]',
  iconSearch: '//input[contains(@placeholder, "Search")]',
  searchTextbox: '//input[contains(@placeholder, "Model, platform or device name")]'
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

  /**
   * Click on specific element
   */
  clickElement(ele) {
    this._browser.click(elements[ele])
    this._browser.pause(2000)
  }

  /**
   * Get attrinute of specific checkbox
   */
  getStyleOfCheckbox(checkbox) {
    const xpathCheckbox = elements[checkbox].concat('/../div/div/div[1]//*[local-name()="svg"][1]')
    return this._browser.getAttribute(xpathCheckbox, 'style')
  }

  /**
   * Count devices by status in a group
   */
  countDevicesInGroupByStatus(group, statusOfDevice) {
    const xpathStatusOfDevice = elements[group].concat(`${elements[statusOfDevice]}`)
    const devices = this._browser.elements(xpathStatusOfDevice)
    const numberOfDevice = devices.value.length
    return numberOfDevice
  }

  /**
   * Count devices by specific criteria
   */
  countDeviceOnUIByCriteria(criteria) {
    const numberOfDevice = this._browser.elements(elements[criteria])
    return numberOfDevice.value.length
  }

  closeHelpDialog() {
    this.waitForLoadingProgressDone()
    if (this._browser.isExisting(elements.closeDialogButton)) {
      this._browser.click(elements.closeDialogButton)
    }
  }

  /**
   * Get url of the page
   */
  getUrlPage() {
    return this._browser.getUrl()
  }

  /**
   * Check element whether it is existing
   */
  isContaining(ele) {
    return this._isExisting(elements[ele])
  }

  /**
   * Search text
   */
  searchText(value) {
    value = value.toLowerCase()
    this._browser.clearElement(elements.searchTextbox)
    this._browser.setValue(elements.searchTextbox, value)
    this._browser.pause(2000)
  }

  /**
   * Launch a device which belong to a group
   */
  launchAnOnlineDevice({group = group.cloud, deviceName}) {
    this.waitForLoadingProgressDone()
    return this._launchADevice(this._getDeviceLocator({group, deviceName}))
  }

  getTotalOnlineDevices({group = group.cloud, deviceName}) {
    const onlineDevices = this._getOnlineDevicesLocator({group: group.cloud, deviceName})
    return this.getTotalVisibleElements(onlineDevices)
  }

  _getOnlineDevicesLocator({group = group.cloud, deviceName}) {
    const deviceLocators = this._getDeviceLocator({group, deviceName})
    return deviceLocators.concat(elements.isOnline)
  }

  _getDeviceLocator({group, deviceName}) {
    const groupLocators = elements[group]
    const deviceLocators = deviceName
      ? groupLocators.concat(`[${elements.name.substr(1)}[text()="${deviceName}"]]`)
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
      const onlineStatusLocator = `${deviceSelector}${elements.isOnline}`

      foundDevice = this._browser.isExisting(onlineStatusLocator)

      if (foundDevice) {
        const launchButtonLocator = `${deviceSelector}${elements.launchButton}`
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
