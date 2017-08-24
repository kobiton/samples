import {assert} from 'chai'
import RegisterPage from '../../framework/page-objects/portal/intro/register'
import APIKeysPage from '../../framework/page-objects/portal/user/settings/api-keys'
import data from './data'

describe('Setting / API Keys', () => {

  beforeEach(() => {
    browser.reload()
  })

  it('Should have at least 01 key for new registered account', () => {
    let randomUsers = data.generateRandomUsers(2)
    randomUsers.forEach((user) => {
      // Clear browser cookies and data
      browser.reload()

      let registerPage = new RegisterPage()
      registerPage.open()
        .setFullName(user.fullname)
        .setUserName(user.username)
        .setEmail(user.email)
        .setPassword(user.password)
        .register()

      let errorMsg = registerPage.getRegisterErrorMessage()
      assert.isTrue(errorMsg === null || errorMsg.length === 0,
        `Error when register new user ${user.username}`)

      let apiKeysPage = new APIKeysPage()
      let keys = apiKeysPage.open()
        .getAPIKeys()

      assert.isNotNull(keys, 'keys is null')
      assert.isAbove(keys.length, 0, 'No default keys found')
      let key = keys[0]
      assert.isAtLeast(key.length, 20, 'Key length is at least 20 characters')
    })
  })
})

