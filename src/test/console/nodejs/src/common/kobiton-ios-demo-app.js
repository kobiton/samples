const elements = {
  uiKitCatalogXPath: '//*[@name="UIKitCatalog"]',
  activity: {
    xPath: '//UIAStaticText[@name="Activity Indicators"]'
  }
}

export default class KobitonIOSApp {
  constructor(driver, timeout) {
    this._driver = driver
    this._timeout = timeout
    this._elements = elements
  }

  get elements() {
    return this._elements
  }

  async gotoUIKitCatalogMenu() {
    await this._driver
      .waitForElementByXPath(elements.uiKitCatalogXPath, this._timeout, 2000)
      .click()
  }

}
