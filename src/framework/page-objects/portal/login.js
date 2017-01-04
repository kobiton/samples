import Page from './base/_page'
import DevicesPage from './my-devices'

const elements = {
  usernameLabel: '//input[@name="emailOrUsername"]/../label',
  usernameTextInput: 'input[name="emailOrUsername"]',
  passwordLabel: '//input[@name="password"]/../label',
  passwordTextInput: 'input[name="password"]',
  loginButton: '#app form button',
  rememberMeLabel: '//span[contains(.,"Remember me")]',
  rememberMeCheck: 'input[name="remember"]',
  messageFailedLabel: '//form/span',
  forgotPasswordLink: 'div=Forgot password?',
  registerNowLink: 'div=Register now',
  logoImageHeader: '//img',
  sessionsLnk: "//a[@href='/me/sessions']",
  form: '#app form'
}

export default class LoginPage extends Page {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
  }

  get usernameTextInput() {
    return this._getElement(elements.usernameTextInput)
  }

  get passwordTextInput() {
    return this._getElement(elements.passwordTextInput)
  }

  get loginButton() {
    return this._getElement(elements.loginButton)
  }

  get form() {
    return this._getElement(elements.form)
  }

  login({username, password}) {
    this.usernameTextInput.waitForExist()
    this.usernameTextInput.clearElement()
    this.usernameTextInput.setValue(username)
    this.passwordTextInput.clearElement()
    this.passwordTextInput.setValue(password)
    this.loginButton.click()
    // click login button then submit form because of the known issue:
    // https://trello.com/c/ZeL2ilpT/816-portal-chrome-firefox-login-could-not-click-on-login-button-after-input-username-and-password
    // TODO: remove 2 lines below when the trello card above is fixed
    this.loginButton.waitForEnabled()
    this.form.submitForm()
    this.waitForLoadingProgressDone()
    this._waitForPageLoaded()
    const isSuccessful = this._browser.getUrl().indexOf('devices') >= 0
    if (isSuccessful) {
      return new DevicesPage(this._browser)
    }
    return this
  }

  open(option) {
    super.open('login', option)
    this.waitForLoadingProgressDone()
    return this
  }

  isLoggedIn() {
    return !this._browser.isVisible(elements.usernameTextInput)
  }

 /**
  * This function is to wait for page transition after click login button
  * it could be loginPage or sessionPage
  */
  _waitForPageLoaded() {
    const locator = '//span[text()="Invalid email and/or password" or text()="Sessions"]'
    this._browser.waitForExist(locator)
  }
}
