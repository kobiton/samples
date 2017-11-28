import fs from 'fs'
import path from 'path'
import url from 'url'
import clipboardy from 'clipboardy'
import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import AuthenticatedPage from './base'
import CanvasScreen from './canvas-screen'
import {prepareFolderSync} from '../../../util'
import DownloadProcess from '../../../util/download_process'

const elements = {
// Header bar
  // eslint-disable-next-line max-len
  qualityButton: '//div[div[text()="High Quality" or text()="Medium Quality" or text()="Low Quality"]]',
  highQuality: '//div[text()="High Quality"]',
  mediumQuality: '//div[text()="Medium Quality"]',
  lowQuality: '//div[text()="Low Quality"]',
  // eslint-disable-next-line max-len
  deviceInfo: '//div[div[text()="High Quality" or text()="Medium Quality" or text()="Low Quality"]]/parent::div/parent::div/span[3]',
  // eslint-disable-next-line max-len
  timing: '//div[div[text()="High Quality" or text()="Medium Quality" or text()="Low Quality"]]/parent::div/parent::div/span[2]',
  sessionTab: '//div[text()="Session"]',
  appsTab: '//div[text()="Apps"]',

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
  tooLongTextToPasteMessage: '//div[text()="The copied text is over 2048 characters, the remaining will be trimmed."]',
  // eslint-disable-next-line max-len
  notSupportDoubleHomeMessage: '//div[contains(normalize-space(text()),"Double Press on iOS 10.3.0+ is currently not supported.")]',
  autoEndSession: 'The session has ended, exiting now ...',
  uploadingAppFile: '//div[contains(.,"Uploading app file")]',
  loadingIcon: '//div[contains(@style, "background-image: repeating-linear-gradient")]',
  failedToInstallAppMessage: '//div[contains(text(),"Failed to install")]',
  installingAppMessage: '//div[contains(text(),"Uploaded success, installing app")]',
  uploadingAppMessage: '//div[contains(text(),"Uploading app file")]',
  installedAppMessage: '//div[contains(.,"has been installed on the device")]',
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
  idleCheckbox: '//input[@type="checkbox"]',
  sessionNameForm: '//div[text()="Session name"]/../form',
  editSessionNameButton: '//div[text()="Session name"]/../form/div/button',
  sessionNameField: '//div[text()="Session name"]/../form/div/input',
  // eslint-disable-next-line max-len
  invalidSessionNameMessage: '//span[contains(text(),"sessionName must be between 5 and 80 characters")]',
  // eslint-disable-next-line max-len
  closeInvalidSessionNameWarningButton: '//span[contains(text(),"sessionName must be between")]/../following-sibling::div/*[local-name()="svg"]',
  requiredSessionNameMessage: '//div[text()="Session name is required"]',
  sessionDescriptionForm: '//div[text()="Description"]/../form/div/div',
  editSessionDescriptionButton: '//div[text()="Description"]/../form/div/button',
  sessionDescriptionField: '//div[text()="Description"]/../form/div/div/textarea[2]',
  // eslint-disable-next-line max-len
  idlePopUp: '//p[contains(normalize-space(text()),"Do you want to continue testing?")]',
  continueButton: '//button[div/div/span[text()="Continue testing"]]',
  endSessionButton: '//button[div/div/span[contains(text(),"End session")]]',

// Apps tab
  appsButton: '//button[div/div[text()="Apps"]]',
  chooseFileButton: '//input[@type="file"]',
  apkUrlTextbox: '//input[@type="text"]',
  installAppsButton: '//button[div/div/span[text()="Install from URL"]]',
  processingTag: '//div[contains(@style, "background-image: repeating-linear-gradient")]',
  appTags: '//div[contains(@style, "background-color: rgb(33, 33, 33)")]',

  sendToDeviceAndInstallButton: '//button[span[text()="Send to device & install"]]',
  uploadToDeviceAndInstallButton: '//button[span[text()="Upload to device & install"]]',

// Error messages on system
  // eslint-disable-next-line max-len
  encounterError: '//div[contains(.,"Device encounters a system issue and in progress of re-initializing.")]'
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

  waitForIdlePopUp(timeout) {
    this._browser.waitForExist(elements.idlePopUp, timeout)
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

  takeScreenShot() {
    this._browser.click(elements.takeScreenShotButton)
    this._browser.waitForExist(elements.uploadingScreenshot, 5000)
    this._browser.waitForExist(elements.downloadScreenshotButton, 60000)
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

  /**
   * Get default device time zone
   */
  getDefaultTimezone() {
    this.clickButtonOnMenuBar('setDeviceTimeZoneButton')
    this._browser.waitForExist(elements.setDeviceTimezonePopup)
    return this._browser.getText(elements.defaultValueTimezone)
  }

  /**
   * Set device time zone
   */
  setDeviceTimezone(timezone) {
    this.clickButtonOnMenuBar('setDeviceTimeZoneButton')
    this._browser.waitForExist(elements.setDeviceTimezonePopup)
    this._browser.element(elements.selectTimezoneDropbox).selectByVisibleText(timezone)
    this._browser.pause(5000)
    this._browser.click(elements.setTimezoneButton)
    this._browser.waitForExist(elements.setNewTimezoneStatus, 90000)
  }

  /**
   * Count screenshots were captured
   */
  countElements(ele) {
    const numberOfScreenshot = this._browser.elements(elements[ele])
    return numberOfScreenshot.value.length
  }

  /**
   * Show recent apps
   */
  showRecentApps() {
    this.clickButtonOnMenuBar('recentAppsButton')
    this._browser.pause(2000)
    this.clickButtonOnMenuBar('homeButton')
    this._browser.pause(2000)
  }

  /**
   * Get session name
   */
  getSessionName() {
    return this._browser.getText(elements.sessionNameForm)
  }

  /**
   * Get session description
   */
  getSessionDescription() {
    return this._browser.getText(elements.sessionDescriptionForm)
  }

  /**
   * Get counting time
   */
  getCountingTime() {
    return this._browser.getText(elements.timing)
  }

  continueManualSession() {
    this._browser.click(elements.continueButton)
  }

  /**
   * Close system message
   */
  closeSystemMessage(mesg) {
    this._browser.click(elements[mesg])
    this._browser.pause(1000)
  }

  /**
   * Set up session name
   */
  editSessionName(sessionName) {
    this._browser.click(elements.editSessionNameButton)
    this._browser.pause(1000)
    this._browser.setValue(elements.sessionNameField, sessionName)
    this._browser.click(elements.screenshotBoard)
    this.waitForLoadingProgressDone()
    this._browser.pause(2000)
  }

  /**
   * Set up session description
   */
  editSessionDescription(sessionDescription) {
    this._browser.click(elements.editSessionDescriptionButton)
    this._browser.pause(1000)
    this._browser.setValue(elements.sessionDescriptionField, sessionDescription)
    this._browser.click(elements.screenshotBoard)
    this.waitForLoadingProgressDone()
  }

  /**
   * Fill in session name is empty
   */
  inputEmptySessionName(value) {
    this._browser.click(elements.editSessionNameButton)
    this._browser.pause(1000)
    this._browser.setValue(elements.sessionNameField, value)
    this._browser.click(elements.screenshotBoard)
    this._browser.pause(3000)
  }

  /**
   * Download app test and save it into local machine
   */
  async downloadApp(urlApp) {
    const appTestFolder = 'apps-test'
    prepareFolderSync(appTestFolder)
    const appDirPath = fs.realpathSync(appTestFolder)

    // Get app's name
    const appName = url.parse(urlApp).pathname.split('/').pop()
    const appPath = path.join(appDirPath, appName)
    if (!fs.existsSync(appPath)) {
      return new BPromise((resolve, reject) => {
        const download = new DownloadProcess('download')
        const downloadUrl = urlApp
        download.download(downloadUrl, appPath)
        download
          .on('progress', (state) => debug.log('Progress', JSON.stringify(state)))
          .on('finish', (file) => {
            debug.log('setup', `Finished download file ${file}`)
            resolve(file)
          })
          .on('error', (err) => {
            debug.error('Error', err)
            reject(err)
          })
      })
    }
    else {
      return true
    }
  }

  /**
   * Get path of local app test
   */
  async getAppPath(urlApp) {
    const downloadedApp = await this.downloadApp(urlApp)
    if (downloadedApp) {
      const appDirPath = fs.realpathSync('apps-test')

    // Get app's path
      const appName = url.parse(urlApp).pathname.split('/').pop()
      const appPath = path.join(appDirPath, appName)
      return appPath
    }
    else {
      return 0
    }
  }

  /**
   * Touch on canvas-screen
   */
  touchOnCanvasScreen() {
    this._browser.click(elements.canvasScreen)
  }

  /**
   * Install application from local file
   */
  chooseFileFromLocalFile(filePath) {
    this._browser.click(elements.appsButton)
    this._browser.pause(1000)
    this._browser.chooseFile(elements.chooseFileButton, filePath)
    this._browser.waitForExist(elements.uploadingAppFile)
  }

  /**
   *
   */
  waitForUploadScreenshotDone(timeout) {
    this._browser.waitUntil(() => {
      return !this._browser.isExisting(elements.loadingIcon)
    }, timeout, 'should upload screenshot done', 3000)
  }
  /**
   * Fill url's app in app url textbox
   */
  fillInAppUrlAndInstall(appUrl) {
    this._browser.pause(5000)
    this.clickButtonOnMenuBar('homeButton')
    this._browser.click(elements.appsButton)
    this._browser.click(elements.appsTab)
    this._browser.setValue(elements.apkUrlTextbox, appUrl)
    this._browser.waitForEnabled(elements.installAppsButton)
    this._browser.click(elements.installAppsButton)
    this._browser.waitForExist(elements.loadingIcon, 3000)
  }

  copyAndPasteOnClipboard({textValue} = {}) {
    this._browser.click(elements.canvasScreen)
    const result = this._browser.element(elements.canvasScreen)
    if (textValue) {
      clipboardy.writeSync(textValue)
    }
    else {
      this._browser.elementIdValue(result.value.ELEMENT, ['Command', 'a'])
      this._browser.pause(5000)
      this._browser.elementIdValue(result.value.ELEMENT, ['Command', 'c'])
      this._browser.pause(5000)
    }
    this._browser.click(elements.canvasScreen)
    this._browser.elementIdValue(result.value.ELEMENT, ['Command', 'v'])
    this._browser.pause(5000)
  }

  /**
   * Waiting for install app
   */
  waitForInstallingAppDone(timeout) {
    this._browser.waitUntil(() => {
      return !this._browser.isExisting(elements.loadingIcon)
    }, timeout, 'should install app done', 10000)
  }

  /**
   * Intall app from app repository
   */
  installAppFromAppRepo(orderOfValidApp) {
    this._browser.click(elements.appsButton)
    // eslint-disable-next-line max-len
    const xpathOfInstallButton = elements.appTags.concat(`[${orderOfValidApp}]/div[contains(@style, "justify-content: flex-end")]//button`)
    this._browser.scroll(xpathOfInstallButton)
    this._browser.click(xpathOfInstallButton)
    this._browser.waitForExist(elements.loadingIcon, 2000)
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

  waitForInitializingDeviceDone(timeout) {
    this._browser.waitUntil(() => {
      return !this._browser.isExisting(elements.initializingStatus)
    }, timeout, 'should initilizing done', 3000)
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
