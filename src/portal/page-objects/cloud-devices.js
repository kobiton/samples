import Page from './page'

const defaultElements = {
  platformLbl: 'div=Platform',
  platformSelectBtn: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(1) svg', //eslint-disable-line
  androidPlatformOption: 'span=Android',
  iOSPlatformOption: 'span=iOS',
  platformVersionLbl: 'div=Platform version',
  platformVersionSelectbtn: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(2) svg', //eslint-disable-line
  browserLbl: 'div=Browser',
  browserSelectBtn: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(3) svg', //eslint-disable-line
  sortByLbl: 'div=Sort by',
  sortBySelectBtn: '#app > div > div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(4) svg', //eslint-disable-line
  availableHeader: 'span=Available',
  utilizedHeader: 'span=Utilized',
  offlineHeader: 'span=Offline'
}

export default class CloudDevicesPage extends Page {
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
    this.loadingHidden.isExisting()
    this.platformSelectBtn.click()
    this.androidPlatformOption.click()
    this.loadingHidden.isExisting()
  }

  selectiOSPlatform() {
    this.loadingHidden.isExisting()
    this.platformSelectBtn.click()
    this.iOSPlatformOption.click()
    this.loadingHidden.isExisting()
  }
}
