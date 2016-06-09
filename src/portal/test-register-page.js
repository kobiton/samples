import {assert} from 'chai'
import RegisterPage from '../core/portal-pages/register'
import {testerAccount, generateUser} from './core/data'

describe('Verify Register Page', () => {
  const registerPage = new RegisterPage()
  let selectProfilePage

  it('should display register page ui', () => {
    registerPage.open()
    assert.isTrue(registerPage.fullNameTxt.isVisible())
    assert.isTrue(registerPage.userNameTxt.isVisible())
    assert.isTrue(registerPage.emailTxt.isVisible())
    assert.isTrue(registerPage.passwordTxt.isVisible())
    assert.isTrue(registerPage.registerBtnDisabled.isVisible())
    assert.isTrue(registerPage.agreewithTermsLbl.isVisible())
    assert.isTrue(registerPage.alreadyHaveAccountLnk.isVisible())
  })

  it('should display error message when input existing user name', () => {
    registerPage.open()
    const {fullname, password, email} = generateUser()
    const username = testerAccount.username
    registerPage.registerAccount({fullname, username, password, email})
    const actualMsg = registerPage.failedMsgLbl.getText()
    assert.equal(actualMsg, 'Username already exists')
  })

  it('should successfully register an user', () => {
    registerPage.open()
    const {fullname, username, password, email} = generateUser()
    // verify select profile page
    selectProfilePage = registerPage.registerAccount({fullname, username, password, email})
    assert.isTrue(selectProfilePage.logoImg.isExisting())
    assert.isTrue(selectProfilePage.developerTesterImg.isExisting())
    assert.isTrue(selectProfilePage.deviceOwnerImg.isExisting())
    assert.isTrue(selectProfilePage.productNameLbl.isVisible())
    assert.isTrue(selectProfilePage.headerPickUpProfileMsg.isVisible())
    assert.isTrue(selectProfilePage.developerTesterTitleLbl.isVisible())
    assert.isTrue(selectProfilePage.developerTesterMsgLbl.isVisible())
    assert.isTrue(selectProfilePage.deviceOnwerTitleLbl.isVisible())
    assert.isTrue(selectProfilePage.deviceOwnderMsgLbl.isVisible())
    // verify devices page after select device owner option
    const mydevicesPage = selectProfilePage.selectDeviceOwner()
    assert.isTrue(mydevicesPage.installImg.isVisible())
    assert.isTrue(mydevicesPage.installLbl.isVisible())
    assert.isTrue(mydevicesPage.connectDeviceImg.isVisible())
    assert.isTrue(mydevicesPage.connectDeviceLbl.isVisible())
    assert.isTrue(mydevicesPage.activateDeviceImg.isVisible())
    assert.isTrue(mydevicesPage.activateDeviceLbl.isVisible())
    assert.isTrue(mydevicesPage.win32Lnk.isVisible())
    assert.isTrue(mydevicesPage.win64Lnk.isVisible())
    assert.isTrue(mydevicesPage.OSXLnk.isVisible())
    assert.isTrue(mydevicesPage.findOutMoreLnk.isVisible())
    // Verify sessions page after select Tester option
    browser.back()
    selectProfilePage.loadingHidden.isExisting()
    const sessionPage = selectProfilePage.selectTester()
    assert.isTrue(sessionPage.deviceHeader.isVisible())
    assert.isTrue(sessionPage.platformHeader.isVisible())
    assert.isTrue(sessionPage.timeHeader.isVisible())
    const actualMsg = sessionPage.noTestSessionLbl.getText()
    assert.equal(actualMsg, 'You currently have no test session.')
  })
})
