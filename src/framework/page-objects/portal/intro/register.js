import Page from '../base'

const elements = {
  fullNameInput: '//input[@type="text" and @name="name"]',
  userNameInput: '//input[@type="text" and @name="username"]',
  emailInput: '//input[@type="text" and @name="email"]',
  passwordInput: '//input[@type="password" and @name="password"]',
  emailValidation: '//div[text()="This is not a valid email"]',
  agreement: '//input[@name="tos"]',
  registerButton: '//button[contains(., "Register")]',
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
    this._browser.waitForEnabled(elements.registerButton)
    this.elements.registerButton.click()
    this.waitForLoadingProgressDone()
    return this
  }

  getRegisterErrorMessage() {
    let errorMsg = ''
    if (this._isElementExists(elements.errorSpan)) {
      errorMsg = this._browser.getText(elements.errorSpan)
    }
    return errorMsg
  }

  /*
  * take wrong format email string as input
  * return error message as output
  */
  emailValidation(invalidEmail) {
    this.setEmail(invalidEmail)
    this._browser.pause(1000)
    const message = this._browser.getText(elements.emailValidation)
    return message
  }

  /*
  * return the state of lisence agreement checkbox, true if checked
  * false if unchecked
  */
  getCheckLiscenceAgreementValue() {
    return this._browser.getValue(elements.agreement)
  }

  /*
  * get attribute ("disabled") of register button
  * return true if the button is disabled, otherwise false
  */
  getRegisterButtonDisabledAttribute() {
    return this._browser.getAttribute(elements.registerButton, 'disabled')
  }
}
