import Page from './page'
import SessionsPage from './sessions'
import {debug} from '@kobiton/core-util'

const defaultElements = {
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
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  login({username, password}) {
    debug.log('login', `${username} and ${password}`)
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
    this.waitForLoadingProgressRunning()
    this.waitForLoadingProgressDone()
    this._waitForPageLoaded()
    const isSuccessful = browser.getUrl().indexOf('sessions') >= 0
    if (isSuccessful) {
      return new SessionsPage()
    }
    debug.log('The session link not exist')
    return this
  }

  open(option) {
    debug.log('viewports', `Simulate ${JSON.stringify(option)}`)
    super.open('login', option)
    browser.waitForExist(this.elements.loadingHidden)
  }

  isLoggedIn() {
    return !browser.isVisible(this.elements.usernameTextInput)
  }

 /**
  * This function is to wait for page transition after click login button
  * it could be loginPage or sessionPage
  */
  _waitForPageLoaded() {
    const locator = '//span[text()="Invalid email and/or password" or text()="Sessions"]'
    browser.waitForExist(locator)
  }

}
