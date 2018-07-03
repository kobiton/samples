import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import BaseData from '../data'

const {username1: username, password1: password, emailUser1: email} = {...config}
const expectedErrorMessage1 = 'Invalid email and/or password'
const expectedErrorMessage2 = 'Password is invalid'
const expectedErrorMessage3 = 'Invalid username and/or password'
let errMsg
let user
let devicesPage

describe('Users / Login', () => {
  let loginPage
  before(() => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.windowHandleMaximize()
  })

  it('should have default controls', () => {
    assert.isTrue(loginPage.isExistingElement('rememberMeLabel'), 'Remember Me Label exists.')
    assert.isTrue(loginPage.isExistingElement('rememberMeCheckbox'), 'Remember Me Checkbox exists.')
    assert.isTrue(loginPage.isExistingElement('forgotPasswordLink'), 'Forgot Password Link exists.')
    assert.isTrue(loginPage.isExistingElement('registerNowLink'), 'Register Now Link exists.')
    assert.isTrue(loginPage.isExistingElement('logoImageHeader'), 'Logo exists.')
    assert.equal(loginPage.getRememberMeCheckboxValue(), 'on', 'Remember Me checkbox is checked.')
  })

  it('should not login with empty username & password', () => {
    loginPage.login('', '', 1)

    const urlPage = loginPage.getUrlPage()
    assert.equal(urlPage, config.portalUrl.concat('/login'), 'The expected url is login page.')
  })

  it('should not login with invalid username & password', () => {

    const msg = 'User can log in with invalid username/email & password.'
    user = BaseData.generateRandomUsers()

    loginPage.login(username, user[0].password, 1)
    errMsg = loginPage.getErrorMessage()
    assert.equal(errMsg, expectedErrorMessage3, msg)

    loginPage.login(email, user[0].password, 1)
    errMsg = loginPage.getErrorMessage()
    assert.equal(errMsg, expectedErrorMessage1, msg)

    loginPage.login(user[0].username, password, 1)
    errMsg = loginPage.getErrorMessage()
    assert.equal(errMsg, expectedErrorMessage3, msg)

    loginPage.login(user[0].username, '1', 1)
    errMsg = loginPage.getErrorMessage()
    assert.equal(errMsg, expectedErrorMessage2, msg)

    loginPage.login(user[0].username, user[0].password, 1)
    errMsg = loginPage.getErrorMessage()
    assert.equal(errMsg, expectedErrorMessage3, msg)

    loginPage.login(user[0].email, user[0].password, 1)
    errMsg = loginPage.getErrorMessage()
    assert.equal(errMsg, expectedErrorMessage1, msg)

  })

  it('should be still standing on Devices page if clicking back button', () => {
    loginPage.open()
    devicesPage = loginPage.login(username, password)

    let urlPage = loginPage.getUrlPage()
    assert.equal(urlPage, config.portalUrl.concat('/devices'),
      'The expected url is devices page.')

    // Verify that once logged in, clicking back button doesn't logout user
    devicesPage.back()
    urlPage = loginPage.getUrlPage()
    assert.equal(urlPage, config.portalUrl.concat('/devices'),
      'The expected url is devices page.')
    devicesPage.logout()
  })

  it('shouldn\'t allow user access Devices page if user logouts', () => {
    loginPage.open()
    devicesPage = loginPage.login(email, password)
    devicesPage.waitForLoadingProgressDone()
    devicesPage.logout()

    // Verify that once logged in, clicking back button doesn't login user
    loginPage.back()
    assert.equal(loginPage.getUrlPage(), config.portalUrl.concat('/login'),
      'The expected url is login page.')
  })

})
