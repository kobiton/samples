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
  rotateButton: '//button[div/div/span[contains(.,"Rotate Screen")]]',
  volumeUpButton: '//button[div/div/span[contains(.,"Volume up")]]',
  volumeDownButton: '//button[div/div/span[contains(.,"Volume down")]]',
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
    const qualityElement = `//div[text()="${quality}"]`
    this._browser.waitForExist(qualityElement)
    this._browser.click(qualityElement)
    this.elements.screenQuality.waitForVisible()
  }

  powerOffAlertExist() {
    return this._browser.isExisting(elements.powerOffAlert)
  }

  startFpsCount() {
    // The block below works at browser condition
    /* eslint-disable */
    this._browser.execute(() => {
      window.createObjectURLFunct = URL.createObjectURL;
      window.frameCount = 0;
      window.frameQueue = {};
      var startDate = new Date();
      window.frameQueue[startDate.toLocaleTimeString()] = 0;

      URL.createObjectURL = function () {
        var date = new Date();
        if (!window.frameQueue[date.toLocaleTimeString()]) {
          window.frameQueue[date.toLocaleTimeString()] = 0;
        }
        window.frameQueue[date.toLocaleTimeString()]++;
        window.frameCount++;
        return window.createObjectURLFunct.apply(this, arguments);
      }
      })
      /* eslint-enable */
  }

  /**
   * This function will reset and return current frame count
   */
  resetFrameCount() {
    // The block below works at browser condition
    /* eslint-disable */
    const frameCount = this._browser.execute(() => {
      var frameCount = window.frameCount;
      window.frameCount = 0;
      return frameCount;
    })
      /* eslint-enable */
    return frameCount.value
  }

  getAverageFps() {
    // The block below works at browser condition
    /* eslint-disable */
    const averageFps = this._browser.execute(() => {
      var sumOfFrame = Object.values(window.frameQueue).reduce(function(a,b){ return a+b;}, 0);
      var timeLength = Object.values(window.frameQueue).length;
      // Don't count the fps at the first second
      var average = timeLength > 1 ? sumOfFrame/(timeLength-1) : 0;
      return average;
    })
      /* eslint-enable */
    return averageFps.value
  }

}
