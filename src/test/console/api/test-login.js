import {assert} from 'chai'
import api from '../../../framework/api'
import config from '../../../framework/config/test'

describe('API / Login', () => {

  const {username1: username, password1: password} = {...config}

  it('Should login successfully', async () => {
    const body = await api.User.login(username, password)
    assert.equal(body.user.username, username, 'The response data contains username.')
  })

})
