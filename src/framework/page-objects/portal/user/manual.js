import AuthenticatedPage from './base'
import CanvasScreen from './canvas-screen'

const elements = {
  apkUrlTextbox: '//input[contains(@id,"-apkurl-")]',
  apkFileInput: '//div[@class="TxBJgay1Dock8v41stRW3"]/input[@type="file"]',
  sendToDeviceAndInstallButton: '//button[span[text()="Send to device & install"]]',
  uploadToDeviceAndInstallButton: '//button[span[text()="Upload to device & install"]]',
  showHighRightPanelButton: '//button[div/div/span[text()="Toggle this panel"]]',
  takeScreenShotButton: '//button[div/div/span[normalize-space(text())="Take screenshot"]]',
  powerButton: '//button[div/div/span[text()="Power"]]',
  homeButton: '//button[div/div/span[normalize-space(text())="Home ( Long press )"]]',
  touchButton: '//button[div/div/span[text()="Touch"]]',
  pinchButton: '//button[div/div/span[contains(.,"Pinch")]]',
  rotateButton: '//button[div/div/span[contains(.,"Rotate screen")]]',
  recentAppsButton: '//button[div/div/span[text()="Recent Apps"]]',
  connectedToServerAlert: '//div[normalize-space(text())="Connected to server."]',
  disConnectedFromServerAlert: '//div[normalize-space(text())="Disconnected from server."]',
  reConnectingStatus: '//div[normalize-space(text())="Re-connecting ..."]',
  exitButton: '//*[@id="app"]//button[div/span[contains(.,"Exit")]]',
  canvasScreen: '//div[@data-radium="true"]/canvas[@tabindex="10000"]',
  // eslint-disable-next-line max-len
  screenQuality: '//div[div[text()="High Quality" or text()="Medium Quality" or text()="Low Quality"]]',
  highQuality: '//div[text()="High"]',
  mediumQuality: '//div[text()="Medium"]',
  lowQuality: '//div[text()="Low"]',
  // eslint-disable-next-line max-len
  initializingStatus: '//div[contains(normalize-space(text()),"Initializing the device (this process") or contains(normalize-space(text()),"Re-initializing device")]',
  powerOffAlert: '//div[contains(.,"Screen is off")][div[text()="Dismiss"]]'
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

  selectQuality(quality = 'Medium') {
    this._browser.pause(5000)
    this.elements.screenQuality.waitForEnabled()
    this.elements.screenQuality.click()
    this._browser.pause(2000)
    const qualityElement = `//div[text()="${quality}"]`
    this._browser.waitForExist(qualityElement)
    this._browser.click(qualityElement)
    this.elements.screenQuality.waitForVisible()
  }

  powerOffAlertExist() {
    return this._browser.isExisting(elements.powerOffAlert)
  }
}
