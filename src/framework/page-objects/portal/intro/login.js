import Page from '../base'
import DevicesPage from '../user/devices'

const timeout = 30000
const elements = {
  usernameLabel: '//input[@name="emailOrUsername"]/../label',
  usernameTextInput: 'input[name="emailOrUsername"]',
  passwordLabel: '//input[@name="password"]/../label',
  passwordTextInput: 'input[name="password"]',
  loginButton: '#app form button',
  rememberMeLabel: '//span[contains(.,"Remember me")]',
  rememberMeCheckbox: 'input[name="remember"]',
  messageFailedLabel: '//form/span',
  forgotPasswordLink: 'div=Forgot password?',
  registerNowLink: 'div=Register now',
  logoImageHeader: '//img',
  form: '#app form',
  errorMsg: '//form/span',
  locator: '//*[contains(text(), "Invalid email and/or password") or text()="Devices"]'
}

const LOGIN_STATUSES = {
  SUCCESSED: 0,
  FAILED: 1
}

export default class LoginPage extends Page {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  open(option) {
    super.open('login', option)
    this.waitForLoadingProgressDone()
    return this
  }

  /**
  * Returns true if at least one element is existing by given selector
  */
  isExistingElement(element) {
    return this._isExisting(elements[element])
  }

  /**
  * Returns true if at least one element is existing by given selector
  */
  getRememberMeCheckboxValue() {
    return this._browser.getValue(elements.rememberMeCheckbox)
  }

  /**
  * Enter username into username field
  * @param {string} enter username or email
  */
  setUserName(value) {
    this._browser.waitForExist(elements.usernameTextInput, timeout)
    this._browser.clearElement(elements.usernameTextInput)
    if (value) {
      this._browser.setValue(elements.usernameTextInput, value)
    }
    return this
  }

  /**
  * Enter password into password field
  * @param {string} enter password
  */
  setPassword(value) {
    this._browser.clearElement(elements.passwordTextInput)
    if (value) {
      this._browser.setValue(elements.passwordTextInput, value)
    }
    return this
  }

  /**
  * Click Login button
  */
  clickLogin() {
    this._browser.click(elements.loginButton)
    this.waitForLoadingProgressDone()
    return this
  }

  /**
  * login action
  * @param {string} enter username or email
  * @param {string} enter password
  * @param {int} set expectation
  *   Option 0: Expected to log in successfully
  *   Option 1: Expected to log in unsuccessfully
  */
  login(username, password, options = LOGIN_STATUSES.SUCCESSED) {
    this.setUserName(username)
    this.setPassword(password)
    this.clickLogin()

    //For login test suite
    if (options === LOGIN_STATUSES.SUCCESSED) {
      this._waitForPageLoaded()
      const isSuccessful = this._browser.getUrl().indexOf('devices') >= 0
      if (isSuccessful) {
        return new DevicesPage(this._browser)
      }
    }

    return this
  }

  /**
  * Return true if the selected DOM-element found by given selector is visible
  * Returns an array if multiple DOM-elements are found for the given selector.
  */
  isLoggedIn() {
    return !this._browser.isVisible(elements.usernameTextInput)
  }

  /**
  * Get the error after clicking on Login button
  */
  getErrorMessage() {
    this._browser.waitForExist(elements.errorMsg, timeout)
    return this._browser.element(elements.errorMsg).getText()
  }

 /**
  * This function is to wait for page transition after click login button
  * it could be loginPage or sessionPage
  */
  _waitForPageLoaded() {
    this._browser.waitForExist(elements.locator, timeout * 2)
  }
}
