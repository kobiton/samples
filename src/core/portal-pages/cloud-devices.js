import AuthenticatedPage from './authenticated'
import ManualPage from './manual'
import {debug} from '@kobiton/core-util'

const _DeviceNameToken = '{DEVICE_NAME}'
const superLocatorClass = '@class="TxBJgay1Dock8v41stRW3"'
const subLocatorClass = '@class="rmq-d2e1f6de"'
const _LaunchButtonLocatorTemplate = `(//div[ ${superLocatorClass} and div[${subLocatorClass} ` +
  `and text()="${_DeviceNameToken}"]]/following-sibling::div[${superLocatorClass}]` +
  '//button[//span[text()="Launch"]])[1]'
const _DeviceNameElementLocatorSuffix = `/ancestor::div[${superLocatorClass}]/preceding-sibling` +
  `::div[ ${superLocatorClass} and div[${subLocatorClass}]]/div[${subLocatorClass}]`
const defaultElements = {
  platformLabel: 'div=Platform',
  platformSelectButton: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(1) svg', //eslint-disable-line max-len
  iOSPlatformOption: 'span=iOS',
  platformVersionLabel: 'div=Platform version',
  platformVersionSelectButton: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(2) svg', //eslint-disable-line max-len
  browserSelectButton: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(3) svg', // eslint-disable-line max-len
  sortByLabel: 'div=Sort by',
  sortBySelectButton: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(4) svg', // eslint-disable-line max-len
  availableHeader: 'span=Available',
  utilizedHeader: 'span=Utilized',
  offlineHeader: 'span=Offline'

}


export default class CloudDevicesPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('search')
  }

  /**
   * Launch manual testing for a device which is specified by device name
   */
  launch(deviceName) {
    try {
      let launchButtonLocator = ''
      let currentDeviceName = ''

      if (deviceName) {
        launchButtonLocator = _LaunchButtonLocatorTemplate
          .replace(_DeviceNameToken, deviceName)
        currentDeviceName = deviceName
      }
      else {
        const replaceToken = `and text()="${_DeviceNameToken}"`
        launchButtonLocator = _LaunchButtonLocatorTemplate
          .replace(replaceToken, '')
      }
      this.waitForLoadingProgressDone()
      browser.click(launchButtonLocator)
      if (currentDeviceName == '') {
        const deviceNameElementLocator = launchButtonLocator + _DeviceNameElementLocatorSuffix
        currentDeviceName = browser.getText(deviceNameElementLocator)
      }
      const manualPage = new ManualPage()
      manualPage.DeviceName = currentDeviceName
      return manualPage
    }
    catch (err) {
      debug.error(err)
      return this
    }
  }
  containsText(text) {
    const selector = `div*=${text}`
    const results = browser.isVisible(selector)
    if (Array.isArray(results)) {
      return true
    }
    return results
  }

  getOptions() {
    const options = []
    for (let i = 1; ; i++) {
      const selector = `body > div:nth-child(4) > div > div > div > div:nth-child(${i})`
      if (browser.isExisting(selector)) {
        const text = String(browser.getText(selector))
        options.push(text)
      }
      else {
        break
      }
    }
    return options
  }

  selectAndroidPlatform() {
    this.waitForLoadingProgressDone()
    this.platformSelectButton.click()
    this.androidPlatformOption.click()
    this.waitForLoadingProgressDone()
  }

  selectiOSPlatform() {
    this.waitForLoadingProgressDone()
    this.platformSelectButton.click()
    this.iOSPlatformOption.click()
    this.waitForLoadingProgressDone()
  }

  isDeviceReadyToLaunch(deviceName, waitingTime = 5000) {
    browser.waitUntil(() => {
      return browser.getUrl().indexOf('search') >= 0
    }, waitingTime, 'wait until the url contains "search" text')

    const launchButtonLocator = _LaunchButtonLocatorTemplate
      .replace(_DeviceNameToken, deviceName)
    return browser.isExisting(launchButtonLocator)
  }

}
