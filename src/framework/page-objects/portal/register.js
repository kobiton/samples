import Page from './base/_page'

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

  }

  get fullNameInput() {
    return this._getElement(elements.fullNameInput)
  }

  get userNameInput() {
    return this._getElement(elements.userNameInput)
  }

  get emailInput() {
    return this._getElement(elements.emailInput)
  }

  get passwordInput() {
    return this._getElement(elements.passwordInput)
  }

  get registerSpan() {
    return this._getElement(elements.registerSpan)
  }

  get errorSpan() {
    return this._getElement(elements.errorSpan)
  }

  open(option) {
    super.open('register', option)
    this.waitForLoadingProgressDone()
    return this
  }

  setFullName(value) {
    this.fullNameInput.clearElement()
    this.fullNameInput.setValue(value)
    return this
  }

  setUserName(value) {
    this.userNameInput.clearElement()
    this.userNameInput.setValue(value)
    return this
  }

  setEmail(value) {
    this.emailInput.clearElement()
    this.emailInput.setValue(value)
    return this
  }

  setPassword(value) {
    this.passwordInput.clearElement()
    this.passwordInput.setValue(value)
    return this
  }

  register() {
    this._browser.waitForEnabled(elements.registerSpan)
    this.registerSpan.click()
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
