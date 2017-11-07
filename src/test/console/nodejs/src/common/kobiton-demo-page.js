const elements = {
  url: 'http://the-internet.herokuapp.com/login',
  usernameId: 'username',
  passwordId: 'password',
  formXpath: '//form[@name="login"]',
  messageXpath: '//div[@id="flash"]'
}

export default class HerokuPage {
  constructor(driver, timeout) {
    this._driver = driver
    this._timeout = timeout
  }

  async login(username, password) {
    await this._driver
      .get(elements.url)
      .waitForElementById(elements.usernameId, this._timeout, 2000)
      .sendKeys(username)
      .waitForElementById(elements.passwordId, this._timeout, 2000)
      .sendKeys(password)
      .waitForElementByXPath(elements.formXpath, this._timeout, 2000)
      .submit()
  }

  async loginUsingSelenium(username, password, seleniumWebDriver) {
    await this._driver.get('http://the-internet.herokuapp.com/login')

    await this._driver.wait(() => {
      return this._driver.findElement(seleniumWebDriver.By.id(elements.usernameId)).isDisplayed()
    }, 2000)

    await this._driver.findElement(seleniumWebDriver.By.id(elements.usernameId)).sendKeys('tomsmith')

    await this._driver.wait(() => {
      return this._driver.findElement(seleniumWebDriver.By.id(elements.passwordId)).isDisplayed()
    }, 2000)

    await this._driver.findElement(seleniumWebDriver.By.id(elements.passwordId)).sendKeys(password)
    await this._driver.wait(() => {
      return this._driver.findElement(seleniumWebDriver.By.id(elements.passwordId)).isDisplayed()
    }, 2000)

    await this._driver.wait(() => {
      return this._driver.findElement(seleniumWebDriver.By.xpath(elements.formXpath)).isDisplayed()
    }, 2000)

    await this._driver.findElement(seleniumWebDriver.By.xpath(elements.formXpath)).submit()
  }

  async getMessage() {
    return await this._driver
      .waitForElementByXPath(elements.messageXpath, this._timeout, 2000)
      .text()
  }

  async getMessageUsingSelenium(seleniumWebDriver) {
    await this._driver.wait(() => {
      return this._driver
        .findElement(seleniumWebDriver.By.xpath(elements.messageXpath))
        .isDisplayed()
    }, 2000)

    return await this._driver
      .findElement(seleniumWebDriver.By.xpath(elements.messageXpath))
      .getText()
  }
}
