import AuthenticatedPage from './authenticated'

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
}
