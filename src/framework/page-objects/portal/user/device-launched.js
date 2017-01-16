import AuthenticatedPage from '../base'

const elements = {
  sessionCreatedLabel: '//span[contains(.,"Session created at")]',
  takeScreenShotButton: '//span[contains(.,"Take screenshot")]/parent::div/parent::div/parent::button', // eslint-disable-line max-len
  screenShotImages: '//h3[contains(.,"Screenshots")]/parent::div/div[3]/div/a/img',
  uploadingSpan: '//span[contains(.,"Uploading")]'
}

export default class DeviceLaunchedPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)

    this._initElementsGetter(elements)
  }

  open(key) {
    super.open(`devices/launch?key=${key}`)
  }

  waitForSessionCreated() {
    this._browser.waitForEnabled(elements.sessionCreatedLabel)
    return this
  }

  takeScreenShot() {
    this._browser.click(elements.takeScreenShotButton)
    // Wait for web javascript handle click action - display uploading item
    this._browser.pause(300)
    return this
  }

  waitForScreenShotUploaded() {
    let uploadingSpan = this._browser.element(elements.uploadingSpan)
    uploadingSpan.waitForEnabled()

    this._browser.waitUntil(() => {
      let uploadings = this._browser.elements(elements.uploadingSpan)
      return uploadings.value && uploadings.value.length === 0
    }, 30000, 'Expected to uploading completed in 30s', 500)
    return this
  }

  getScreenShotUrls() {
    let screenShotImages = this.elements.screenShotImages
    let urls = screenShotImages.map((img) => {
      return img.getAttribute('src')
    })
    return urls
  }
}
