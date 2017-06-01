const elements = {
  uiKitCatalogXPath: '//*[@name="UIKitCatalog"]',
  activity : {
    xPath: '//UIAStaticText[@name="Activity Indicators"]'
  },
  alert: {
    xPath: '//UIAStaticText[@name="Alert Controller"]',
    simpleXPath: '//UIAStaticText[@name="Simple"]',
    otherXPath: '//UIAStaticText[@name="Other"]',
    textEntryXPath: '//UIAStaticText[@name="Text Entry"]'
  },
  buttons: {
    xPath: '//UIAStaticText[@name="Buttons"]'
  },
  datePicker: {
    xPath: '//UIAStaticText[@name="Date Picker"]'
  },
  imageView: {
    xPath: '//UIAStaticText[@name="Image View"]'
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

  async backtoUIKitCatalogMenu() {
    await this._driver
      .waitForElementByXPath(elements.uiKitCatalogXPath, this._timeout, 2000)
      .click()
  }

  async gotoActivityController() {
    await this._driver
      .waitForElementByXPath(elements.activity.xPath, this._timeout, 2000)
      .click()
  }

  async gotoAlertController() {
    await this._driver
      .waitForElementByXPath(elements.alert.xPath, this._timeout, 2000)
      .click()
      .waitForElementByXPath(elements.alert.simpleXPath, this._timeout, 2000)
  }

  async gotoButtonsController() {
    await this._driver
      .waitForElementByXPath(elements.buttons.xPath, this._timeout, 2000)
      .click()
  }

  async gotoDatePickerController() {
    await this._driver
      .waitForElementByXPath(elements.datePicker.xPath, this._timeout, 2000)
      .click()
  }

  async gotoImageViewController() {
    await this._driver
      .waitForElementByXPath(elements.imageView.xPath, this._timeout, 2000)
      .click()
  }
}
