import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import {testerAccount, generateUser} from '../core/data'

describe('Verify My Devices Page', () => {
  const loginPage = new LoginPage()
  let profilePage

  before(() => {
    loginPage.windowHandleMaximize()
    loginPage.open()
    const sessionsPage = loginPage.login(testerAccount)
    profilePage = sessionsPage.selectProfile()
  })

  it('should be displayed my profile page ui', () => {
    assert.isTrue(profilePage.emailTextInput.isVisible())
    assert.isTrue(profilePage.fullNameTextInput.isVisible())
    assert.isTrue(profilePage.currentPasswordTextInput.isVisible())
    assert.isTrue(profilePage.newPasswordTextInput.isVisible())
    assert.isFalse(profilePage.confirmPasswordTextInput.isEnabled())
    assert.isTrue(profilePage.updateButton.isVisible())
  })

  it('should display error message when update with existing email', () => {
    profilePage.open()
    const email = 'thuha.msright@gmail.com'
    profilePage.updateProfile({email})
    const actualMsg = profilePage.notificationLabel.getText()
    assert.equal(actualMsg, 'Email already exists')
  })

  it('should display error message when update with invalid password', () => {
    profilePage.open()
    const currentPassword = 'mario8x@'
    const newPassword = 'mario8x@123'
    const confirmPassword = 'mario8x@123'
    profilePage.updateProfile({currentPassword, newPassword, confirmPassword})
    const actualMsg = profilePage.notificationLabel.getText()
    assert.equal(actualMsg, 'Current password is invalid')
  })

  it('should be updated successfully with valid information', () => {
    profilePage.open()
    const {fullname, email} = generateUser()
    const currentPassword = testerAccount.password
    const newPassword = testerAccount.password
    const confirmPassword = testerAccount.password
    profilePage.updateProfile({email, fullname, currentPassword, newPassword, confirmPassword})
    const actualMsg = profilePage.notificationLabel.getText()
    assert.equal(actualMsg, 'Your profile has been updated successfully')
  })
})
