import AuthenticatedPage from './authenticated'
import CanvasScreen from './canvas-screen'

const defaultElements = {
  apkUrlTextbox: '//input[contains(@id,"-apkurl-")]',
  apkFileInput: '//div[@class="TxBJgay1Dock8v41stRW3"]/input[@type="file"]',
  sendToDeviceAndInstallButton: '//button[span[text()="Send to device & install"]]',
  uploadToDeviceAndInstallButton: '//button[span[text()="Upload to device & install"]]',
  showHighRightPanelButton: '//button[div/div/span[text()="Show / hide right panel"]]',
  takeScreenShotButton: '//button[div/div/span[text()="Take screenshot"]]',
  powerButton: '//button[div/div/span[text()="Power"]]',
  homeButton: '//button[div/div/span[text()="Home"]]',
  touchButton: '//button[div/div/span[text()="Touch"]]',
  pinchButton: '//button[div/div/span[contains(.,"Pinch")]]',
  rotateButton: '//button[div/div/span[contains(.,"Rotate Screen")]]',
  volumeUpButton: '//button[div/div/span[contains(.,"Volume Up")]]',
  volumeDownButton: '//button[div/div/span[contains(.,"Volume Down")]]',
  recentAppsButton: '//button[div/div/span[text()="Recent Apps"]]',
  connectedToServerAlert: '//div[text()="Connected to server."]',
  disConnectedFromServerAlert: '//div[text()="Disconnected from server."]',
  reConnectingStatus: '//div[text()="Re-connecting ..."]',
  exitButton: '//*[@id="app"]//button[div/span[contains(.,"Exit")]]',
  screenCanvas: '//div[@data-radium="true"]/canvas[@tabindex="10000"]',
  // eslint-disable-next-line max-len
  initializingStatus: '//div[text()="Initializing device ..." or text()="Re-initializing device ..."]'
}

export default class ManualPage extends AuthenticatedPage {
  constructor(elements = {}) {
    super({...defaultElements, ...elements})
    this.DeviceName = ''
    this._canVasScreen = new CanvasScreen(this._elements.screenCanvas)
  }

  waitForPageLoaded() {
    browser.waitForExist(this.elements.homeButton)
  }

  waitForSessionLoaded() {
    browser.waitForEnabled(this.elements.stopSessionButton)
  }

  isInitializing() {
    return browser.isVisible(this.elements.initializingStatus)
  }

  doSwipeUp() {
    this._canVasScreen.swipeUp()
  }

  doSwipeDown() {
    this._canVasScreen.swipeDown()
  }

  doSwipeLeft() {
    this._canVasScreen.swipeLeft()
  }

  doSwipeRight() {
    this._canVasScreen.swipeRight()
  }

  doSwipeCrossRight() {
    this._canVasScreen.swipeCrossRight()
  }

  doTouch({x, y}) {
    this._canVasScreen.touch({x, y})
  }

  exitManual() {
    if (browser.isExisting(this.elements.exitButton)) {
      this.exitButton.click()
    }
  }

  waitForInitializingDeviceDone(timeOut) {
    browser.waitUntil(() => {
      return !browser.isExisting(this._elements.initializingStatus)
    }, timeOut, 'should initilizing done', 3000)
  }

  startFpsCount() {
    /* eslint-disable */
    browser.execute(() => {
      window.createObjectURLFunct = URL.createObjectURL;
      window.frameCount = 0;
      URL.createObjectURL = function () {
        window.frameCount++;
        return window.createObjectURLFunct.apply(this, arguments);
      }
      })
      /* eslint-enable */
  }

  /**
   * This function will end fps count and return the number of fps
   */
  stopFpsCount() {
    /* eslint-disable */
    const fps = browser.execute(() => {
      URL.createObjectURL = window.createObjectURLFunct
      return window.frameCount;
    })
      /* eslint-enable */
    return fps.value
  }
}
