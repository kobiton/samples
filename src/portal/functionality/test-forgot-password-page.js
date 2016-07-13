import {assert} from 'chai'
import ForgotPasswordPage from '../../core/portal-pages/forgot-password'
import {testerAccount} from '../core/data'

describe('Verify Forgot Password Page', () => {
  const forgotPwdPage = new ForgotPasswordPage()
  const successMessage = 'An email has been sent to you with further instructions.'

  before(() => {
    forgotPwdPage.windowHandleMaximize()
  })
  it('should display forgot password page ui', () => {
    forgotPwdPage.open()
    assert.isTrue(forgotPwdPage.emailOrUsernameText.isVisible())
    assert.isTrue(forgotPwdPage.loginLink.isVisible())
    assert.isTrue(forgotPwdPage.registerLink.isVisible())
    assert.isTrue(forgotPwdPage.resetPasswordButtonDisabled.isVisible())
  })

  it('should display error mesage when input wrong username/email', () => {
    forgotPwdPage.open()
    forgotPwdPage.forgotPassword('invalidEmail@123.com')
    const actualMsg = forgotPwdPage.messageFailedLabel.getText()
    assert.equal(actualMsg, 'Not Found')
  })

  it('should not display error message when input right username/email', () => {
    forgotPwdPage.open()
    forgotPwdPage.forgotPassword(testerAccount.username)
    assert.equal(successMessage, forgotPwdPage.messageSuccessLabel.getText())
  })
})
