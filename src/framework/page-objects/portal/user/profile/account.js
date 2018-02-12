import AuthenticatedPage from '../base'

const elements = {
  // Profile form
  userNameInput: '//input[@name="username"]',
  updateProfileButton: '//div[5]/div/button',
  firstNameInput: '//input[@name="firstName"]',
  lastNameInput: '//input[@name="lastName"]',
  emailInput: '//input[@name="email"]',
  successfulProfileUpdateMessage: '//span[text()="Your profile has been updated successfully"]',
  // Updating password form
  currentPasswordInput: '//input[@name="password"]',
  newPasswordInput: '//input[@name="newPassword"]',
  confirmNewPasswordInput: '//input[@name="passwordConfirmation"]',
  updatePasswordButton: '//button[div/div/span[text()="Update Password"]]',
  errorMsgCurrentPasswordInput: '//input[@name="password"]/following-sibling::div[2]',
  errorMsgNewPasswordInput: '//input[@name="newPassword"]/following-sibling::div[2]',
  errorMsgLabelConfirmPassword: '//input[@name="passwordConfirmation"]/following-sibling::div[2]',
  successfulPasswordUpdateMessage: '//span[text()="Your password has been updated successfully"]',
  errorMsgWrongCurrentPassword: '//span[text()="Current password is invalid"]',
  menuButton: '//span[text()="Support"]/../../../following-sibling::div/div',
  logoutAccountButton: '//div[text()="Logout"]',
  // Setting Timezone form
  selectTimeZoneDropbox: '//div[p[text()="Time Zone"]]//select',
  defaultValueTimezone: '//div[p[text()="Time Zone"]]//select/option[1]',
  settingsTimezoneLabel: '//h3[text()="Settings"]',
  updateSettingsButton: '//button/div[div/span[text()="Update Settings"]]',
  successfulTimezoneSetMessage: '//span[text()="Your settings have been updated successfully"]'
}

export default class AccountSettingsPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  /**
   * Open Account page
   */
  open() {
    super.open('profile/account')
  }

  /**
  * Logout account
  */
  logoutAccount() {
    this._browser.click(elements.menuButton)
    this._browser.waitForEnabled(elements.logoutAccountButton)
    this._browser.click(elements.logoutAccountButton)
    this.waitForLoadingProgressDone()
    return this
  }
  /**
  * Returns true if successfulProfileUpdateMessage field is existing
  * Get the state of successfulProfileUpdateMessage
  */
  isExistingSuccessfulProfileUpdateMessage() {
    this.wait(500)
    return this._isExisting(elements.successfulProfileUpdateMessage)
  }

  /**
  * Returns true if successfulTimezoneSetMessage field is existing
  */
  isExistingSuccessfulTimezoneSetMessage() {
    this.wait(500)
    return this._isExisting(elements.successfulTimezoneSetMessage)
  }

   /**
  * Returns true if successfulPasswordUpdateMessage field is existing
  */
  isExistingSuccessfulPasswordUpdateMessage() {
    this.wait(500)
    return this._isExisting(elements.successfulPasswordUpdateMessage)
  }

   /**
  * Returns true if errorMessageCurrentPassword field is existing
  */
  isExistingErrorMsgCurrentPassword() {
    this.wait(100)
    return this._isExisting(elements.errorMsgCurrentPasswordInput)
  }

 /**
  * Returns true if errorMsgConfirmPassword field is existing
  */
  isExistingErrorMsgConfirmPassword() {
    this.wait(500)
    return this._isExisting(elements.errorMsgLabelConfirmPassword)
  }

  /**
  * Returns true if errorMsgNewPassword field is existing
  */
  isExistingErrorMsgNewPassword() {
    this.wait(500)
    return this._isExisting(elements.errorMsgNewPasswordInput)
  }

  /**
  * Returns true if error  message current password field is existing
  */
  isExistingErrorMsgWrongCurrentPassword() {
    this.wait(500)
    return this._isExisting(elements.errorMsgWrongCurrentPassword)
  }

  /**
  * Click an option of list Timezone
  * @param index {integer} - Index of option
  */
  clickOptionTimezone(index) {
    const option = `//div[p[text()="Time Zone"]]//select/option[${index}]`
    this._browser.click(option)
  }

  /**
  * Get element string of an option timezone
  * @param index {integer} - Index of option
  */
  getElementOptionTimezone(index) {
    return `//div[p[text()="Time Zone"]]//select/option[${index}]`
  }

  /**
  * Update timezone
  * @param index {integer} - Index of option timezone
  */
  updateTimezone(index) {
    this._browser.click(elements.selectTimeZoneDropbox)
    this.wait(1000)
    this.clickOptionTimezone(index)
    this._browser.click(elements.updateSettingsButton)
    this.wait(1000)
  }

  /**
  * Set text into current password field
  * @param value {string} - Text
  */
  setTextIntoCurrentPasswordField(value) {
    this._browser.setValue(elements.currentPasswordInput, value)
  }

  /**
  * Set text into new password field
  * @param value {string} - Text
  */
  setTextIntoNewPasswordField(value) {
    this._browser.setValue(elements.newPasswordInput, value)
  }

  /**
  * Set text into confirm password field
  * @param value {string} - Text
  */
  setTextIntoConfirmPasswordField(value) {
    this._browser.setValue(elements.confirmNewPasswordInput, value)
  }

  /**
  * Update password
  * @param currentPassword {string} - Current password
  * @param newPassword {string} - New password
  * @param confirmPassword {string} - Confirm password
  */
  updatePassword(currentPassword, newPassword, confirmPassword) {
    this.setTextIntoCurrentPasswordField(currentPassword)
    this.setTextIntoNewPasswordField(newPassword)
    this.setTextIntoConfirmPasswordField(confirmPassword)
    this.wait(500)
    this._browser.click(elements.updatePasswordButton)
    this.waitForLoadingProgressDone()
  }

  /**
  * Set text into current password and new password fields
  * @param currentPassword {string} - Current password
  * @param newPassword {string} - New password
  */
  setTextIntoChangePasswordForm(currentPassword, newPassword) {
    this.setTextIntoCurrentPasswordField(currentPassword)
    this.setTextIntoNewPasswordField(newPassword)
  }

  /**
  * Click option timezone found by given value of option
  * @param value {string} - Value of option
  */
  clickOptionTimezoneValue(value) {
    const option = `//option[@value="${value}"]`
    this._browser.click(option)
  }

  /**
  * Set text into last name field
  * @param value {string} - Text
  */
  setTextIntoLastNameField(value) {
    this._browser.setValue(elements.lastNameInput, value)
  }

  /**
  * Set text into first name field
  * @param value {string} - Text
  */
  setTextIntoFirstNameField(value) {
    this._browser.setValue(elements.firstNameInput, value)
  }

  /**
   * Get the state of "Update profile" button
   */
  isEnabledUpdateProfileButton() {
    this.wait(500)
    return this._browser.isEnabled(elements.updateProfileButton)
  }

  /**
   * Clear data on first name field
   */
  clearDataOnFirstNameField() {
    this._browser.setValue(elements.firstNameInput, ['', '\uE003'])
    this.wait(1000)
  }

  /**
   * Clear data on last name field
   */
  clearDataOnLastNameField() {
    this._browser.setValue(elements.lastNameInput, ['', '\uE003'])
    this.wait(1000)
  }

  /**
   * Return true if username field is enabled
   */
  isVisibleUserNameField() {
    return this._browser.isEnabled(elements.userNameInput)
  }

  /**
   * Get profile info
   * Return an object
   */
  getProfile() {
    const profile = {}
    profile.Email = this._browser.getValue(elements.emailInput)
    profile.UserName = this._browser.getValue(elements.userNameInput)
    profile.FirstName = this._browser.getValue(elements.firstNameInput)
    profile.LastName = this._browser.getValue(elements.lastNameInput)
    return profile
  }

  /**
   * Click "Update Profile" button
   */
  clickUpdateProfileButton() {
    this.wait(1000)
    this._browser.click(elements.updateProfileButton)
    this.waitForLoadingProgressDone()
  }

  /**
   * Returns true if timezone dropbox is existing
   */
  isExistingTimeZoneDropbox() {
    return this._isExisting(elements.selectTimeZoneDropbox)
  }

  /**
   * Click Timezone dropbox
   */
  clickTimezoneDropbox() {
    this._browser.click(elements.selectTimeZoneDropbox)
  }
 
  /**
   * Returns true if default option timezone is existing
   */
  isExistingDefaultValueTimezone() {
    return this._isExisting(elements.defaultValueTimezone)
  }

  /**
   * Get current timezone
   */
  getValueTimezone() {
    return this.elements.selectTimeZoneDropbox.getValue()
  }
}
