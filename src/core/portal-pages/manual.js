import AuthenticatedPage from './authenticated'
import {captureElement} from '../helpers/webdriver'

const defaultElements = {
  stopSessionButton: '//button[div/span[text()="Stop session"]]',
  apkUrlTextbox: '//input[contains(@id,"-apkurl-")]',
  apkFileInput: '//div[@class="TxBJgay1Dock8v41stRW3"]/input[@type="file"]',
  sendToDeviceAndInstallButton: '//button[span[text()="Send to device & install"]]',
  uploadToDeviceAndInstallButton: '//button[span[text()="Upload to device & install"]]',
  powerButton: '//button[div/span[text()="Power"]]',
  backButton: '//button[div/span[text()="Back"]]',
  homeButton: '//button[div/span[text()="Home"]]',
  menuButton: '//button[div/span[text()="Menu"]]',
  screenCanvas: '//div[@data-radium="true"]/canvas[@tabindex="10000"]'
}

export default class ManualPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
    this.DeviceName = ''
  }

  waitForPageLoaded() {
    browser.waitForExist(this.elements.homeButton)
  }

  waitForSessionLoaded() {
    browser.waitForEnabled(this.elements.stopSessionButton)
  }

  captureCanvas(imagePath) {
    captureElement(defaultElements.screenCanvas, imagePath)
  }
}
