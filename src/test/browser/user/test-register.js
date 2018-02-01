import {assert} from 'chai'
import RegisterPage from '../../../framework/page-objects/portal/intro/register'

describe('Register Page', () => {
  let registerPage

  before(() => {
    registerPage = new RegisterPage()
    registerPage.open()
  })

  it('should validate email of user', () => {
    const errorMessage = registerPage.emailValidation('test')
    assert.equal(errorMessage, 'This is not a valid email', 'email not validated correctly')
  })

  it('should be checked by default \'I agree with License Agreements\'', () => {
    assert.equal(registerPage.getCheckLiscenceAgreementValue(), 'on', 'is not validated')
  })

  it('should not let user click register if uncheck \'I agree with License Agreements\'', () => {
    assert.equal(registerPage.getRegisterButtonDisabledAttribute(), 'true', 'should be disabled')
  })

})
