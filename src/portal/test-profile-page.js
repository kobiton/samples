import {assert} from 'chai'
import LoginPage from '../core/portal-pages/login'
import {testerAccount, generateUser} from './core/data'

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
    assert.isTrue(profilePage.emailTxt.isVisible())
    assert.isTrue(profilePage.fullNameTxt.isVisible())
    assert.isTrue(profilePage.currentPassTxt.isVisible())
    assert.isTrue(profilePage.newPassTxt.isVisible())
    assert.isFalse(profilePage.confirmPassTxt.isEnabled())
    assert.isTrue(profilePage.updateBtn.isVisible())
  })

  it('should display error message when update with existing email', () => {
    profilePage.open()
    const email = 'thuha.msright@gmail.com'
    profilePage.updateInvalidEmail({email})
    const actualMsg = profilePage.notificationLbl.getText()
    assert.equal(actualMsg, 'Email already exists')
  })

  it('should display error message when update with invalid password', () => {
    profilePage.open()
    const currentPass = 'mario8x@'
    const newPass = 'mario8x@123'
    const confirmPass = 'mario8x@123'
    profilePage.updateInvalidPass({currentPass, newPass, confirmPass})
    const actualMsg = profilePage.notificationLbl.getText()
    assert.equal(actualMsg, 'Current password is invalid')
  })

  it('should be updated successfully with valid information', () => {
    profilePage.open()
    const {fullname, email, password} = generateUser()
    const currentPassword = testerAccount.password
    const newPassword = password
    const confirmPassword = password
    profilePage.updateProfile({email, fullname, currentPassword, newPassword, confirmPassword})
    const actualMsg = profilePage.notificationLbl.getText()
    assert.equal(actualMsg, 'Your profile has been updated successfully')
  })
})
