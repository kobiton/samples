import faker from 'faker'
import {assert} from 'chai'
import RegisterPage from '../../../framework/page-objects/portal/intro/register'
import APIKeysPage from '../../../framework/page-objects/portal/user/settings/api-keys'

describe('Setting / API Keys', () => {
  it('Should have at least 01 key for new registered account', () => {
    const userName = faker.internet.userName(10)
    // Clear browser cookies and data
    browser.reload()
    let registerPage = new RegisterPage()
    registerPage.open()
      .setFirstNameLastName(faker.name.firstName(), faker.name.lastName())
      .setUserName(userName)
      .setEmail(faker.internet.email())
      .setPassword(faker.internet.password(20))
      // Missing step check "I'm not robot"
      .register()

    let errorMsg = registerPage.getRegisterErrorMessage()
    assert.isTrue(errorMsg === null || errorMsg.length === 0,
      `Error when register new user ${userName}`)

    const apiKeysPage = new APIKeysPage()
    const keys = apiKeysPage.open()
      .getAPIKeys()

    assert.isNotNull(keys, 'keys are null')
    assert.isAbove(keys.length, 0, 'No default keys found')
    const key = keys[0]
    assert.isAtLeast(key.length, 20, 'Key length is at least 20 characters')
  })
})

