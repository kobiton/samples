const elements = {
  accessibility: {
    menuXPath: '//android.widget.TextView[@content-desc="Accessibility"]',
    nodeProviderXPath: '//android.widget.TextView[@content-desc="Accessibility Node Provider"]',
    nodeQueryingXPath: '//android.widget.TextView[@content-desc="Accessibility Node Querying"]',
    serviceXPath: '//android.widget.TextView[@content-desc="Accessibility Service"]',
    customViewXPath: '//android.widget.TextView[@content-desc="Custom View"]'
  },
  app: {
    menuXPath: '//android.widget.TextView[@content-desc="App"]',
    activityXPath: '//android.widget.TextView[@content-desc="Activity"]',
    customTitleXPath: '//android.widget.TextView[@content-desc="Custom Title"]',
    customTitle: {
      leftHeaderXPath: '//android.widget.TextView[1]',
      rightHeaderXPath: '//android.widget.TextView[2]',
      changeLeftTextXPath: '//android.widget.LinearLayout[1]/android.widget.EditText',
      changeLeftButtonXPath: '//android.widget.Button[@content-desc="Change Left"]',
      changeRightTextXPath: '//android.widget.LinearLayout[2]/android.widget.EditText',
      changeRightButtonXPath: '//android.widget.Button[@content-desc="Change Right"]'
    }
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

  async backtoMainMenuFromAccessibility() {
    await this._driver
      .back()
      .waitForElementByXPath(elements.accessibility.menuXPath, this._timeout, 2000)
  }

  async gotoCustomTitleApp() {
    await this._driver
      .waitForElementByXPath(elements.app.menuXPath, this._timeout, 2000)
      .click()
      .waitForElementByXPath(elements.app.activityXPath, this._timeout, 2000)
      .click()
      .waitForElementByXPath(elements.app.customTitleXPath, this._timeout, 2000)
      .click()
  }

  async changeLeftText(string) {
    await this._driver
      .waitForElementByXPath(elements.app.customTitle.changeLeftTextXPath, this._timeout, 2000)
      .clear()
      .sendKeys(string)
      .waitForElementByXPath(elements.app.customTitle.changeLeftButtonXPath, this._timeout, 2000)
      .click()
  }

  async getLeftHeaderText() {
    return this._driver
      .waitForElementByXPath(elements.app.customTitle.leftHeaderXPath, this._timeout, 2000)
      .text()
  }

  async changeRightText(string) {
    await this._driver
      .waitForElementByXPath(elements.app.customTitle.changeRightTextXPath, this._timeout, 2000)
      .clear()
      .sendKeys(string)
      .waitForElementByXPath(elements.app.customTitle.changeRightButtonXPath, this._timeout, 2000)
      .click()
  }

  async getRightHeaderText() {
    return this._driver
      .waitForElementByXPath(elements.app.customTitle.rightHeaderXPath, this._timeout, 2000)
      .text()
  }
}
