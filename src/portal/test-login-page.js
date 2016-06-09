import {assert} from 'chai'
import LoginPage from './page-objects/login'
import {testerAccount} from './data'

describe('Verify Login Page', () => {
  const loginPage = new LoginPage()
  
  it('should be display login ui', () => {
    loginPage.open()
    assert.isTrue(loginPage.usernameLbl.isVisible())
    assert.isTrue(loginPage.usernameTxt.isVisible())
    assert.isTrue(loginPage.passwordLbl.isVisible())
    assert.isTrue(loginPage.passwordTxt.isVisible())
    assert.isTrue(loginPage.loginBtn.isVisible())
    assert.isTrue(loginPage.rememberMeLbl.isVisible())
    assert.isTrue(loginPage.forgotPasswordLnk.isVisible())
    assert.isTrue(loginPage.registerNowLnk.isVisible())
    assert.isTrue(loginPage.rememberMeChk.isExisting())
  })

  it('should login successfully with a registered tester account', () => {
    loginPage.open()
    const sessionsPg = loginPage.login(testerAccount)
    assert.isTrue(sessionsPg.firstNameCharacter.isVisible())
    assert.isTrue(sessionsPg.nameLbl.isVisible())
    assert.isTrue(sessionsPg.profileTester.isVisible())
    sessionsPg.logout()
  })

  it('should login failed with an un-registered account', () => {
    const invalidAccount = {username: 'invTester', password: 'never@mind'}
    loginPage.open()
    loginPage.login(invalidAccount)
    assert.isTrue(loginPage.messageFailedLbl.isVisible())
  })
})
