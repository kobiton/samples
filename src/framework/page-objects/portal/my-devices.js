import AuthenticatedPage from './base/_authenticated'
import DeviceLaunchedPage from './device-launched'

const elements = {
  fistOnlineKobitonCloudDevice: '(//h3[contains(.,"Kobiton Cloud Devices")]' +
    '/parent::div/parent::div/parent::div' +
    '//div[contains(@style,"background-color: rgb(104, 159, 56)")])[1]' +
    '/parent::div/parent::div/parent::div/parent::div/parent::div',
  firstOnlineKobitonCloudDeviceLaunchButton: '(//h3[contains(.,"Kobiton Cloud Devices")]' +
    '/parent::div/parent::div/parent::div' +
    '//div[contains(@style,"background-color: rgb(104, 159, 56)")])[1]' +
    '/parent::div/parent::div/parent::div/parent::div/parent::div' +
    '/div[3]/button[1]'
}

export default class MyDevicesPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
  }

  open() {
    super.open('devices')
    return this
  }

  get fistOnlineKobitonCloudDevice() {
    return this._getElement(elements.fistOnlineKobitonCloudDevice)
  }

  get firstOnlineKobitonCloudDeviceLaunchButton() {
    return this._getElement(elements.firstOnlineKobitonCloudDeviceLaunchButton)
  }

  scrollToKobitonCloudDevices() {
    this.fistOnlineKobitonCloudDevice.waitForEnabled()
    this.fistOnlineKobitonCloudDevice.moveToObject()
    return this
  }

  launchFirstKobitonCloudDevice() {
    this.scrollToKobitonCloudDevices()
    this.firstOnlineKobitonCloudDeviceLaunchButton.waitForEnabled()
    this.firstOnlineKobitonCloudDeviceLaunchButton.click()
    this.waitForLoadingProgressDone()

    return new DeviceLaunchedPage(this._browser)
  }
}
