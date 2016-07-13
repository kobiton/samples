import {assert} from 'chai'
import RegisterPage from '../../core/portal-pages/register'
import {testerAccount, generateUser} from '../core/data'

describe('Verify Register Page', () => {
  const registerPage = new RegisterPage()
  let selectProfilePage

  it('should display register page ui', () => {
    registerPage.open()
    assert.isTrue(registerPage.fullNameTextInput.isVisible())
    assert.isTrue(registerPage.userNameTextInput.isVisible())
    assert.isTrue(registerPage.emailTextInput.isVisible())
    assert.isTrue(registerPage.passwordTextInput.isVisible())
    assert.isTrue(registerPage.registerButtonDisabled.isVisible())
    assert.isTrue(registerPage.agreewithTermsLabel.isVisible())
    assert.isTrue(registerPage.alreadyHaveAccountLink.isVisible())
  })

  it('should display error message when input existing user name', () => {
    registerPage.open()
    const {fullname, password, email} = generateUser()
    const username = testerAccount.username
    registerPage.registerAccount({fullname, username, password, email})
    const actualMsg = registerPage.failedMsgLabel.getText()
    assert.equal(actualMsg, 'Username already exists')
  })

  it('should successfully register an user', () => {
    registerPage.open()
    const {fullname, username, password, email} = generateUser()
    // Verify select profile page
    selectProfilePage = registerPage.registerAccount({fullname, username, password, email})
    assert.isTrue(selectProfilePage.logoImage.isExisting())
    assert.isTrue(selectProfilePage.developerTesterImage.isExisting())
    assert.isTrue(selectProfilePage.deviceOwnerImage.isExisting())
    assert.isTrue(selectProfilePage.productNameLabel.isVisible())
    assert.isTrue(selectProfilePage.headerPickUpProfileMsg.isVisible())
    assert.isTrue(selectProfilePage.developerTesterTitleLabel.isVisible())
    assert.isTrue(selectProfilePage.developerTesterMsgLabel.isVisible())
    assert.isTrue(selectProfilePage.deviceOnwerTitleLabel.isVisible())
    assert.isTrue(selectProfilePage.deviceOwnderMsgLabel.isVisible())
    // Verify devices page after select device owner option
    const mydevicesPage = selectProfilePage.selectDeviceOwner()
    assert.isTrue(mydevicesPage.installImage.isVisible())
    assert.isTrue(mydevicesPage.installLabel.isVisible())
    assert.isTrue(mydevicesPage.connectDeviceImage.isVisible())
    assert.isTrue(mydevicesPage.connectDeviceLabel.isVisible())
    assert.isTrue(mydevicesPage.activateDeviceImage.isVisible())
    assert.isTrue(mydevicesPage.activateDeviceLabel.isVisible())
    assert.isTrue(mydevicesPage.win32Link.isVisible())
    assert.isTrue(mydevicesPage.win64Link.isVisible())
    assert.isTrue(mydevicesPage.OSXLink.isVisible())
    assert.isTrue(mydevicesPage.findOutMoreLink.isVisible())
    // Verify sessions page after select Tester option
    browser.back()
    selectProfilePage.waitForLoadingProgressDone()
    const sessionPage = selectProfilePage.selectTester()
    assert.isTrue(sessionPage.deviceHeader.isVisible())
    assert.isTrue(sessionPage.platformHeader.isVisible())
    assert.isTrue(sessionPage.timeHeader.isVisible())
    const actualMsg = sessionPage.noTestSessionLabel.getText()
    assert.equal(actualMsg, 'You currently have no test session.')
  })
})
