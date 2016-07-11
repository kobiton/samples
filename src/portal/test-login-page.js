import {assert} from 'chai'
import LoginPage from '../core/portal-pages/login'
import {testerAccount} from './core/data'
import SessionsPage from '../core/portal-pages/sessions'

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
    let sessionsPage
    try {
      sessionsPage = loginPage.login(testerAccount)
      assert.instanceOf(sessionsPage, SessionsPage)

      assert.isTrue(sessionsPage.firstNameCharacter.isVisible())
      assert.isTrue(sessionsPage.nameLbl.isVisible())
      assert.isTrue(sessionsPage.profileTesterLbl.isVisible())
    }
    finally {
      if (sessionsPage && sessionsPage.logout) {
        sessionsPage.logout()
      }
    }
  })

  it('should login failed with an un-registered account', () => {
    const invalidAccount = {username: 'invTester', password: 'never@mind'}
    loginPage.open()
    const page = loginPage.login(invalidAccount)
    assert.instanceOf(page, LoginPage)

    assert.isTrue(page.messageFailedLbl.isVisible())
   
  })
  
})
