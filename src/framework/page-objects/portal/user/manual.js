import AuthenticatedPage from './base'
import CanvasScreen from './canvas-screen'

const elements = {
// Header bar
  // eslint-disable-next-line max-len
  qualityButton: '//div[div[text()="High Quality" or text()="Medium Quality" or text()="Low Quality"]]',
  highQuality: '//div[text()="High Quality"]',
  mediumQuality: '//div[text()="Medium Quality"]',
  lowQuality: '//div[text()="Low Quality"]',
  // eslint-disable-next-line max-len
  deviceInfo: '//div[div[text()="High Quality" or text()="Medium Quality" or text()="Low Quality"]]/parent::div/parent::div/span[3]',

// Canvas screen
  // eslint-disable-next-line max-len
  initializingStatus: '//p[contains(normalize-space(text()),"Clearing up") or contains(normalize-space(text()),"Setting up") or contains(normalize-space(text()),"Start session") or contains(normalize-space(text()),"Establishing connection")]',
  connectedToServerAlert: '//div[normalize-space(text())="Connected to server."]',
  disConnectedFromServerAlert: '//div[normalize-space(text())="Disconnected from server."]',
  reConnectingStatus: '//div[normalize-space(text())="Re-connecting ..."]',
  canvasScreen: '//div[@data-radium="true"]/canvas[@tabindex="10000"]',
  setNewDeviceLocationProcessing:
  '//p[contains(normalize-space(text()),"Setting new device location")]',
  setNewLocationStatus: '//div[contains(.,"Device location successfully set to")]',
  // eslint-disable-next-line max-len
  powerOffAlert: '//div[contains(normalize-space(text()),"Please press Power / Home button or tap on screen to wake up device")]',
  dismissMessage: '//div[contains(normalize-space(text()),"Dismiss")]',
  // eslint-disable-next-line max-len
  notSupportLongPressMessage: '//div[contains(normalize-space(text()),"Long Press on iOS 10.0.x to 10.2.x is currently not supported.")]',
  // eslint-disable-next-line max-len
  notSupportDoubleHomeMessage: '//div[contains(normalize-space(text()),"Double Press on iOS 10.3.0+ is currently not supported.")]',

// Menu Action Bar
  collapsePanelButton: '//button[div/div/span[text()="Collapse this panel"]]',
  expandPanelButton: '//button[div/div/span[text()="Expand this panel"]]',
  takeScreenShotButton: '//button[div/div/span[normalize-space(text())="Take screenshot"]]',
  touchButton: '//button[div/div/span[text()="Touch"]]',
  pinchButton: '//button[div/div/span[contains(.,"Pinch")]]',
  rotateButton: '//button[div/div/span[contains(.,"Rotate screen")]]',
  setDeviceLocationButton: '//button[div/div/span[contains(.,"Set device location")]]',
  setDeviceTimeZoneButton: '//button[div/div/span[contains(.,"Set device time zone")]]',
  powerButton: '//button[div/div/span[text()="Power"]]',
  recentAppsButton: '//button[div/div/span[text()="Recent apps"]]',
  homeButton: '//button[div/div/span[contains(normalize-space(text()),"Home (press,")]]',
  backButton: '//button[div/div/span[text()="Back"]]',
  exitButton: '//*[@id="app"]//button[div/span[contains(.,"Exit")]]',

// Set location device pop up
  setDeviceLocationPopup: '//h3[text()="Set device location"]',
  latitudeField: '//div[label[text()="Latitude"]]/input',
  longitudeField: '//div[label[text()="Longitude"]]/input',
  setLocationButton: '//h3[text()="Set device location"]/../div/form//button[contains(.,"Set")]',
  cancelLocationButton:
  '//h3[text()="Set device location"]/../div/form//button[contains(.,"Cancel")]',
  helpLocationButton: '//h3[text()="Set device location"]/../div/form//button[div/a]',
  wrongLatitudeWarning:
  '//div[contains(normalize-space(text()),"Latitude value must be between -90 to 90")]',
  wrongLongitudeWarning:
  '//div[contains(normalize-space(text()),"Longitude value must be between -180 to 180")]',

// Set time zone device pop up
  setDeviceTimezonePopup: '//h3[text()="Set device time zone"]',
  defaultValueTimezone: '//div[p[text()="Time zone"]]//select/option[1]',
  selectTimezoneDropbox: '//div[p[text()="Time zone"]]//select',
  setTimezoneButton: '//div[p[text()="Time zone"]]/div/div/button[contains(.,"Set")]',
  cancelSetTimezoneButton: '//div[p[text()="Time zone"]]/div[2]/button[contains(.,"Cancel")]',
  setNewTimezoneStatus: '//div[contains(.,"Device time zone successfully set to")]',

// Screenshots Board
  screenshotBoard: '//h3[text()="Screenshots"]',
  downloadScreenshotButton: '//a[contains(.,"Download screenshot")]',
  uploadingScreenshot: '//a[contains(.,"Uploading")]',

// Session tab
  sessionButton: '//button[div/div[text()="Session"]]',

// Apps tab
  apkUrlTextbox: '//input[contains(@id,"-apkurl-")]',
  apkFileInput: '//div[@class="TxBJgay1Dock8v41stRW3"]/input[@type="file"]',
  appsButton: '//button[div/div[text()="Apps"]]',

  sendToDeviceAndInstallButton: '//button[span[text()="Send to device & install"]]',
  uploadToDeviceAndInstallButton: '//button[span[text()="Upload to device & install"]]'
}

export default class ManualPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
    this._canvasScreen = new CanvasScreen(specificBrowser, elements.canvasScreen)
  }

  waitForPageLoaded() {
    this._browser.waitForExist(elements.homeButton)
  }

  waitForSessionLoaded() {
    this._browser.waitForEnabled(elements.stopSessionButton)
  }

  isInitializing() {
    return this._browser.isVisible(elements.initializingStatus)
  }

  isContaining(ele) {
    return this._isExisting(elements[ele])
  }

  isVisableButton(ele) {
    return this._browser.isEnabled(elements[ele])
  }

  getPlatformNameInfo() {
    const device = this._browser.getText(elements.deviceInfo)
    const pieceOfDeviceInfo = device.split(' ')
    return pieceOfDeviceInfo[pieceOfDeviceInfo.length - 2]
  }

  getPlatformVersionInfo() {
    const device = this._browser.getText(elements.deviceInfo)
    const pieceOfDeviceInfo = device.split(' ')
    return pieceOfDeviceInfo[pieceOfDeviceInfo.length - 1]
  }

  takeScreenShot(ele) {
    this.clickButtonOnMenuBar('takeScreenShotButton')
    this._browser.waitForExist(elements.uploadingScreenshot)
  }

  getStyleOfButton(ele) {
    const xpathOfIcon = elements[ele].concat('//div/*[local-name()="svg"]')
    return this._browser.getAttribute(xpathOfIcon, 'style')
  }

  clickButtonOnMenuBar(ele) {
    this._browser.waitForEnabled(elements[ele])
    this._browser.click(elements[ele])
    this._browser.pause(2000)
  }

  rotateScreen() {
    this.clickButtonOnMenuBar('rotateButton')
    this._browser.pause(5000)
  }

  setDeviceLocation({lat, long} = {}) {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(long)
    this.clickButtonOnMenuBar('setDeviceLocationButton')
    this._browser.waitForExist(elements.setDeviceLocationPopup)
    this._browser.setValue(elements.latitudeField, lat)
    this._browser.setValue(elements.longitudeField, long)
    this._browser.click(elements.setDeviceLocationPopup)
    if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
      this._browser.waitForEnabled(elements.setLocationButton)
      this._browser.click(elements.setLocationButton)
      this._browser.waitForExist(elements.setNewLocationStatus)
      this._browser.pause(2000)
    }
  }

  getDefaultTimezone() {
    this.clickButtonOnMenuBar('setDeviceTimeZoneButton')
    this._browser.waitForExist(elements.setDeviceTimezonePopup)
    return this._browser.getText(elements.defaultValueTimezone)
  }

  setDeviceTimezone(timezone) {
    this.clickButtonOnMenuBar('setDeviceTimeZoneButton')
    this._browser.waitForExist(elements.setDeviceTimezonePopup)
    this._browser.element(elements.selectTimezoneDropbox).selectByVisibleText(timezone)
    this._browser.pause(5000)
    this._browser.click(elements.setTimezoneButton)
    this._browser.pause(40000)
  }

  countScreenshots(ele) {
    const numberOfScreenshot = this._browser.elements(elements[ele])
    return numberOfScreenshot.value.length
  }

  showRecentApps() {
    this.clickButtonOnMenuBar('recentAppsButton')
    this._browser.pause(2000)
    this.clickButtonOnMenuBar('homeButton')
    this._browser.pause(2000)
  }

  turnBack() {
    this.clickButtonOnMenuBar('backButton')
    this._browser.pause(2000)
  }

  doSwipeUp() {
    this._canvasScreen.swipeUp()
    this._browser.pause(500)
  }

  doSwipeDown() {
    this._canvasScreen.swipeDown()
    this._browser.pause(500)
  }

  doSwipeLeft() {
    this._canvasScreen.swipeLeft()
    this._browser.pause(500)
  }

  doSwipeRight() {
    this._canvasScreen.swipeRight()
    this._browser.pause(500)
  }

  doSwipeCrossRight() {
    this._canvasScreen.swipeCrossRight()
    this._browser.pause(500)
  }

  doTouch({x, y}) {
    this._canvasScreen.touch({x, y})
  }

  exitManual() {
    if (this._browser.isExisting(elements.exitButton)) {
      this.elements.exitButton.click()
    }
  }

  waitForInitializingDeviceDone(timeOut) {
    this._browser.waitUntil(() => {
      return !this._browser.isExisting(elements.initializingStatus)
    }, timeOut, 'should initilizing done', 3000)
  }

  selectQuality(quality) {
    this.elements.qualityButton.click()
    this._browser.pause(3000)
    const qualityElement = `//div[text()="${quality}"]`
    this._browser.waitForExist(qualityElement)
    this._browser.click(qualityElement)
    this._browser.pause(3000)
  }

}
