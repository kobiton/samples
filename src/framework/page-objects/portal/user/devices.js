import {debug} from '@kobiton/core-util'
import AuthenticatedPage from './base'
import ManualPage from './manual'

let elements = {
  // Group device
  favorite: '//div[span//h3[contains(., "Favorite Devices")]]/../following-sibling::div/div/div',
  cloud: '//div[span//h3[contains(., "Cloud Devices")]]/../following-sibling::div/div/div',
  org: '//div[span//h3[contains(., "orgName Devices")]]/../following-sibling::div/div/div',
  orgTitle: '//h3[contains(., "orgName Devices")]',

  // Header Checkboxs
  onlineCheckbox: '//label[contains(.,"Online")]/parent::div/parent::div/input',
  busyCheckbox: '//label[contains(.,"Busy")]/parent::div/parent::div/input',
  offlineCheckbox: '//label[contains(.,"Offline")]/parent::div/parent::div/input',
  kobitonCheckbox: '//label[contains(.,"Kobiton devices")]/parent::div/parent::div/input',
  organizationCheckbox: '//label[contains(.,"Organization devices")]/parent::div/parent::div/input',
  myDevicesCheckbox: '//label[contains(.,"My devices")]/parent::div/parent::div/input',

  // Settings
  avatar: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[1]/*[@size="40"]',
  orgName: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[1]/div/span',
  profileSetting: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]',
  buttonSetting: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]/div/button',
  settingsTag: '//div[text()="Settings"]',
  profileTag: '//div[text()="Profile"]',
  subscriptionTag: '//div[text()="Subscription"]',
  logoutTag: '//div[text()="Logout"]',

  // Main functions
  homePageImage: '//a[@href="/"]/img[2]',
  devices: '//a[contains(@href, "devices")]/span',
  sessions: '//a[contains(@href, "sessions")]/span',
  appRepo: '//a[contains(@href, "apps")]/span',
  download: '//span[contains(., "Download")]',
  documentation: '//span[contains(., "Documentation")]',
  support: '//span[contains(., "Support")]',

  // Search box
  iconSearch: '//input[contains(@placeholder, "Search")]',
  searchTextbox: '//input[contains(@placeholder, "Model, platform or device name")]',

  // Status of device
  isOnline: '//div[contains(@style, "rgb(104, 159, 56)")]',
  isUtilizing: '//div[contains(@style, "rgb(251, 192, 45)")]',
  isOffline: '//div[contains(@style, "background-color: rgb(97, 97, 97)")]',
  isFavorite: '',

  // Buttons on each device
  launchButton: '//ancestor::div//div[2]/div[2]/span[1]/button',
  favoriteButton: '//ancestor::div//div[2]/div[1]/span/button',

  // Device Info
  android: '//div[contains(text(),"Android")]',
  ios: '//div[contains(text(),"iOS")]',
  name: '/div/div[2]/div[1]/div',

  deviceTag: '//div[contains(@style, "background-color: rgb(224, 224, 224)")]',
  closeDialogButton: '//*[div/div/h2[contains(.,"Help us, help you.")]]/*[local-name()="svg"]',
  launchButtonOnPopUp: '//button[div/span[text()="Launch"]]'
}
let nameOfOrg

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
   * Get text of tag
   */
  getText(ele) {
    return this._browser.getText(elements[ele])
  }

  /**
   * Get value of tag
   */
  getValue(ele) {
    return this._browser.getValue(elements[ele])
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
    const arrayElement = this._browser.elements(elements[criteria])
    const numberOfDevice = arrayElement.value ? arrayElement.value.length : 0
    return numberOfDevice
  }

  /**
   * Get xpath of organization group
   */
  getElementInOrg(ele) {
    elements[ele] = elements[ele].replace('orgName', nameOfOrg)
  }

  /**
   * Check Org is existing
   */
  isExistingOrg() {
    nameOfOrg = this.getText('orgName')
    return (nameOfOrg !== '')
  }

  closeHelpDialog() {
    this.waitForLoadingProgressDone()
    if (this._browser.isExisting(elements.closeDialogButton)) {
      this._browser.click(elements.closeDialogButton)
    }
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
    this._browser.clearElement(elements.searchTextbox)
    this._browser.setValue(elements.searchTextbox, value)
    this._browser.pause(3000)
  }

  /**
   * Check favorite device
   */
  isFavoriteDevice({group, nameOfDevice, platformVersionOfDevice}) {
    const deviceLocator = this._getDeviceLocator({group, nameOfDevice, platformVersionOfDevice})
     // eslint-disable-next-line max-len
    const xpathFavoriteIcon = deviceLocator.concat('[1]').concat(elements.favoriteButton).concat('//*[local-name()="svg"]')
    this._browser.scroll(deviceLocator)
    this._browser.moveToObject(deviceLocator)
    this._browser.waitForExist(xpathFavoriteIcon)
    const styleOfFavoriveIcon = this._browser.getAttribute(xpathFavoriteIcon, 'style')
    return styleOfFavoriveIcon.includes('fill: rgb(255, 143, 0)')
  }

  /**
   * Mark favorite device
   */
  markOrUnmarkFavoriteDevice({group, nameOfDevice, platformVersionOfDevice}) {
    const deviceLocator = this._getDeviceLocator({group, nameOfDevice, platformVersionOfDevice})
    const favoriteButtonLocator = `${deviceLocator}[1]${elements.favoriteButton}`
    this._moveToDeviceAndClickButton(deviceLocator, favoriteButtonLocator)
    this.waitForLoadingProgressRunning()
    this.waitForLoadingProgressDone()
    this._browser.pause(1000)
  }

  /**
   * Launch a device which belong to a group
   */
  launchAnOnlineDevice({group, nameOfDevice, platformVersionOfDevice}) {
    this.waitForLoadingProgressDone()
    return this._launchADevice(this._getDeviceLocator(
      {group, nameOfDevice, platformVersionOfDevice}), platformVersionOfDevice)
  }

  getTotalOnlineDevices({group, nameOfDevice, platformVersionOfDevice}) {
    const onlineDevices = this._getOnlineDevicesLocator(
      {group, nameOfDevice, platformVersionOfDevice})
    return this.getTotalVisibleElements(onlineDevices)
  }

  _getOnlineDevicesLocator({group, nameOfDevice, platformVersionOfDevice}) {
    const deviceLocators = this._getDeviceLocator({group, nameOfDevice, platformVersionOfDevice})
    return deviceLocators.concat(elements.isOnline)
  }

  _getDeviceLocator({group, nameOfDevice, platformVersionOfDevice}) {
    const groupLocators = elements[group]
    let deviceLocators = nameOfDevice
      ? groupLocators.concat(`[${elements.name.substr(1)}[text()="${nameOfDevice}"]]`)
      : groupLocators
    deviceLocators = platformVersionOfDevice ? deviceLocators.concat(`/div/div[2]/div[3]/div
      [text()="${platformVersionOfDevice}"]`) : deviceLocators
    return deviceLocators
  }

  /**
   * Move to specific device and click on button
   */
  _moveToDeviceAndClickButton(device, button) {
    this._browser.scroll(device)
    this._browser.click(device)
    this.waitForLoadingProgressRunning()
    this.waitForLoadingProgressDone()
    this._browser.waitForExist(button)
    this._browser.click(button)
  }

  /**
   * Launch a device from list device locator
   */
  _launchADevice(listDeviceLocator, platformVersionOfDevice) {
    let i = 1
    let foundDevice = false
    let maxElement = 0
    maxElement = this.getTotalVisibleElements(listDeviceLocator)

    while (foundDevice || i <= maxElement) {
      // This is ancestor element which used to mix with deviceName, onlineStatus,
      // and launchButton
      const deviceSelector = listDeviceLocator.concat(`[${i}]`)
      const onlineStatusLocator = platformVersionOfDevice ? `${deviceSelector}/../..
      ${elements.isOnline}` : `${deviceSelector}${elements.isOnline}`
      foundDevice = this._browser.isExisting(onlineStatusLocator)

      if (foundDevice) {
        this._moveToDeviceAndClickButton(onlineStatusLocator, elements.launchButtonOnPopUp)
        this.waitForLoadingProgressRunning()
        this.waitForLoadingProgressDone()
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
