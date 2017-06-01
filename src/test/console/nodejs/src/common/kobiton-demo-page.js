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

  async getMessage() {
    return await this._driver
      .waitForElementByXPath(elements.messageXpath, this._timeout, 2000)
      .text()
  }
}
