import Page from './page'
import SelectProfilePage from './select-profile'

const defaultElements = {
  fullNameTextInput: 'input[name="name"]',
  userNameTextInput: 'input[name="username"]',
  emailTextInput: 'input[name="email"]',
  passwordTextInput: 'input[name="password"]',
  agreeWithTermsCheck: '#app form input[type="checkbox"]',
  registerButtonDisabled: '#app form button[disabled]',
  registerButton: '#app form button',
  agreewithTermsLabel: '#app a > span',
  alreadyHaveAccountLink: '#app > div > div > div > div > div > div > div:nth-child(2) > div',
  failedMsgLabel: '//form/span',
  form: '#app form'
}

export default class RegisterPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('register')
  }

  registerAccount({fullname, username, email, password}) {
    this.fullNameTextInput.setValue(fullname)
    this.userNameTextInput.setValue(username)
    this.emailTextInput.setValue(email)
    this.passwordTextInput.setValue(password)
    this.registerButton.click()
    // click register button then submit form instead because of the known issue:
    // https://trello.com/c/ZeL2ilpT/816-portal-chrome-firefox-login-could-not-click-on-login-button-after-input-username-and-password
    // TODO: remove 2 lines below when the trello card above is fixed
    this.registerButton.waitForEnabled()
    this.form.submitForm()
    this.waitForLoadingProgressDone()
    return new SelectProfilePage()
  }
}
