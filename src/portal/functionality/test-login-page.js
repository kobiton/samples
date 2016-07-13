import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import {testerAccount} from '../core/data'
import SessionsPage from '../../core/portal-pages/sessions'

describe('Verify Login Page', () => {
  const loginPage = new LoginPage()

  it('should be display login ui', () => {
    loginPage.open()
    assert.isTrue(loginPage.usernameLabel.isVisible())
    assert.isTrue(loginPage.usernameTextInput.isVisible())
    assert.isTrue(loginPage.passwordLabel.isVisible())
    assert.isTrue(loginPage.passwordTextInput.isVisible())
    assert.isTrue(loginPage.loginButton.isVisible())
    assert.isTrue(loginPage.rememberMeLabel.isVisible())
    assert.isTrue(loginPage.forgotPasswordLink.isVisible())
    assert.isTrue(loginPage.registerNowLink.isVisible())
    assert.isTrue(loginPage.rememberMeCheck.isExisting())
  })

  it('should login successfully with a registered tester account', () => {
    loginPage.open()
    let sessionsPage
    try {
      sessionsPage = loginPage.login(testerAccount)
      assert.instanceOf(sessionsPage, SessionsPage)

      assert.isTrue(sessionsPage.firstNameCharacter.isVisible())
      assert.isTrue(sessionsPage.nameLabel.isVisible())
      assert.isTrue(sessionsPage.profileTesterLabel.isVisible())
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
    assert.isTrue(loginPage.messageFailedLabel.isVisible())
  })

})
