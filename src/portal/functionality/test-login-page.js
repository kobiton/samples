import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import {getConfig} from '../../core/config'
import SessionsPage from '../../core/portal-pages/sessions'

const account = getConfig()
const invalidAccounts = [
  {
    'username': 'invalid',
    'password': 'invalid'
  },
  {
    'username': 'invalid2',
    'password': 'invalid2'
  }
]
const validAccounts = [
  {
    'username': account.emailOrUsername,
    'password': account.password
  },
  {
    'username': account.emailOrUsername2,
    'password': account.password2
  }
]

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

  validAccounts.forEach((validAccount) => {

    it(`Should login successfully with a registered account: '${validAccount.username}'`, () => {
      loginPage.open()
      let sessionsPage
      try {
        sessionsPage = loginPage.login(validAccount)
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
  })

  invalidAccounts.forEach((invalidAccount) => {

    it(`Should login failed with an un-registered account: '${invalidAccount.username}'`, () => {
      loginPage.open()
      const page = loginPage.login(invalidAccount)
      assert.instanceOf(page, LoginPage)
      assert.isTrue(loginPage.messageFailedLabel.isVisible())
    })
  })
})
