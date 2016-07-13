import Page from './page'

const defaultElements = {
  emailOrUsernameText: 'form input[name="emailOrUsername"]',
  resetPasswordButtonDisabled: '#app form button[disabled]',
  resetPasswordButton: '#app form button',
  loginLink: 'div=Login',
  registerLink: 'div=Register',
  messageFailedLabel: 'form div > span',
  messageSuccessLabel: '//form/div[2]/div/div',
  form: '#app form'
}

export default class ForgotPasswordPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('forgot')
  }

  forgotPassword(emailOrUsername) {
    this.emailOrUsernameText.clearElement()
    this.emailOrUsernameText.setValue(emailOrUsername)
    this.resetPasswordButton.click()
    // click reset password button then submit form instead because of the known issue:
    // https://trello.com/c/ZeL2ilpT/816-portal-chrome-firefox-login-could-not-click-on-login-button-after-input-username-and-password
    // TODO: remove 2 lines below when the trello card above is fixed
    this.resetPasswordButton.waitForEnabled()
    this.form.submitForm()
    this.waitForLoadingProgressDone()
  }
}
