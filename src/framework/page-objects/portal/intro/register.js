import Page from '../base'

const elements = {
  fullNameInput: '//input[@type="text" and @name="name"]',
  userNameInput: '//input[@type="text" and @name="username"]',
  emailInput: '//input[@type="text" and @name="email"]',
  passwordInput: '//input[@type="password" and @name="password"]',
  registerSpan: '//button[contains(., "Register")]',
  errorSpan: '//form/span'
}

export default class RegisterPage extends Page {
  constructor(specificBrowser = browser) {
    super(specificBrowser)

    this._initElementsGetter(elements)
  }

  open(option) {
    super.open('register', option)
    this.waitForLoadingProgressDone()
    return this
  }

  setFullName(value) {
    this.elements.fullNameInput.clearElement()
    this.elements.fullNameInput.setValue(value)
    return this
  }

  setUserName(value) {
    this.elements.userNameInput.clearElement()
    this.elements.userNameInput.setValue(value)
    return this
  }

  setEmail(value) {
    this.elements.emailInput.clearElement()
    this.elements.emailInput.setValue(value)
    return this
  }

  setPassword(value) {
    this.elements.passwordInput.clearElement()
    this.elements.passwordInput.setValue(value)
    return this
  }

  register() {
    this._browser.waitForEnabled(elements.registerSpan)
    this.elements.registerSpan.click()
    this.waitForLoadingProgressDone()
    return this
  }

  getRegisterErrorMessage() {
    let errorMsg = ''
    if (this._isElementExists(elements.errorSpan)) {
      errorMsg = this.errorSpan.getText()
    }

    return errorMsg
  }
}
