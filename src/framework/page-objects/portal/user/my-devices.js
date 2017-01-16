import AuthenticatedPage from '../base'
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

    this._initElementsGetter(elements)
  }

  open() {
    super.open('devices')
    return this
  }

  scrollToKobitonCloudDevices() {
    this.elements.fistOnlineKobitonCloudDevice.waitForEnabled()
    this.elements.fistOnlineKobitonCloudDevice.moveToObject()
    return this
  }

  launchFirstKobitonCloudDevice() {
    this.scrollToKobitonCloudDevices()
    this.elements.firstOnlineKobitonCloudDeviceLaunchButton.waitForEnabled()
    this.elements.firstOnlineKobitonCloudDeviceLaunchButton.click()
    this.waitForLoadingProgressDone()

    return new DeviceLaunchedPage(this._browser)
  }
}
