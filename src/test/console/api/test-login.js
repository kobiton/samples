import {assert} from 'chai'
import api from '../../../framework/api'
import config from '../../../framework/config/test'
import BaseData from '../../../test/browser/data'

describe('API / Login', () => {

  const {username1: username, password1: password, emailUser1: email} = {...config}

  it('should not login with empty username & password', async () => {
    const body = await api.User.login('', '')
    assert.equal(body, 'Email or username is invalid; Password is invalid')
  })

  it('should not login with invalid username & password', async () => {
    const expectedErrorMessage1 = 'Invalid email and/or password'
    const expectedErrorMessage2 = 'Password is invalid'
    const msg = 'User can log in with invalid username/email & password.'
    let user = BaseData.generateRandomUsers()
    let errMsg

    errMsg = await api.User.login(username, user[0].password)
    assert.equal(errMsg, expectedErrorMessage1, msg)

    errMsg = await api.User.login(email, user[0].password)
    assert.equal(errMsg, expectedErrorMessage1, msg)

    errMsg = await api.User.login(user[0].username, password)
    assert.equal(errMsg, expectedErrorMessage1, msg)

    errMsg = await api.User.login(user[0].username, '1')
    assert.equal(errMsg, expectedErrorMessage2, msg)
    
    errMsg = await api.User.login(user[0].username, user[0].password)
    assert.equal(errMsg, expectedErrorMessage1, msg)

    errMsg = await api.User.login(user[0].email, user[0].password)
    assert.equal(errMsg, expectedErrorMessage1, msg)
  })

  it('should login successfully', async () => {
    const body = await api.User.login(username, password)
    assert.equal(body.user.username, username, 'The response data contains username.')
  })

})
