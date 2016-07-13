import AuthenticatedPage from './authenticated'

const defaultElements = {
  emailTextInput: 'input[name="email"]',
  fullNameTextInput: 'input[name="name"]',
  currentPasswordTextInput: 'input[name="password"]',
  newPasswordTextInput: 'input[name="newPassword"]',
  confirmPasswordTextInput: 'input[name="passwordConfirmation"]',
  updateButton: '#app form button',
  notificationLabel: 'div:nth-child(2) > span > div > div > div:nth-child(2) > span',
  form: '#app form'
}

export default class ProfilePage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open() {
    super.open('me/profile')
  }

  updateProfile({email, fullname, currentPassword, newPassword, confirmPassword}) {
    if (email) this.emailTextInput.setValue(email)
    if (fullname) this.fullNameTextInput.setValue(fullname)
    if (currentPassword) this.currentPasswordTextInput.setValue(currentPassword)
    if (newPassword) this.newPasswordTextInput.setValue(newPassword)
    if (confirmPassword) this.confirmPasswordTextInput.setValue(confirmPassword)
    this.updateButton.click()
    // click update button then submit form because of the known issue:
    // https://trello.com/c/ZeL2ilpT/816-portal-chrome-firefox-login-could-not-click-on-login-button-after-input-username-and-password
    // TODO: remove 2 lines below when the trello card above is fixed
    this.updateButton.waitForEnabled()
    this.form.submitForm()
    this.loadingHidden.isExisting()
  }
}
