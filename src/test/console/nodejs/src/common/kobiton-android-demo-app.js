const elements = {
  accessibility: {
    menuXPath: '//android.widget.TextView[@content-desc="Accessibility"]',
    nodeProviderXPath: '//android.widget.TextView[@content-desc="Accessibility Node Provider"]'
  }
}

export default class ApiDemoAndroidApp {
  constructor(driver, timeout) {
    this._driver = driver
    this._timeout = timeout
    this._elements = elements
  }

  get elements() {
    return this._elements
  }

  async gotoAccessibilityMenu() {
    await this._driver
      .waitForElementByXPath(elements.accessibility.menuXPath, this._timeout, 2000)
      .click()
  }

}
