import {assert} from 'chai'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import APIKeysPage from '../../../framework/page-objects/portal/user/settings/api-keys'

const {username1: username, password1: password} = {...config}
const apiKeyFormat = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/

describe('Settings / API Keys', () => {
  let apiKeysPage

  before(() => {
    const loginPage = new LoginPage()
    loginPage.open()
    loginPage.windowHandleMaximize()
    loginPage.login(username, password)
    apiKeysPage = new APIKeysPage()
    apiKeysPage.open()
  })

  it('should delete all API Keys', () => {
    apiKeysPage.deleteAllAPIKeys()

    const apiKeysSize = apiKeysPage.getAPIKeys().length
    assert.equal(apiKeysSize, 0, 'All API Keys are deleted.')
  })

  it('should create API Key', () => {
    apiKeysPage.addAPIKey()
      
    const apiKeysSize = apiKeysPage.getAPIKeys().length
    assert.equal(apiKeysSize, 1, 'A new API Key is created.')

    const firstAPIKey = apiKeysPage.getAPIKeys()[0]
    assert.match(firstAPIKey, apiKeyFormat, 'New API Key matches the regular expression.')
  })

  it('should cancel Delete action', () => {
    apiKeysPage.deleteAPIKey(0, 3)

    const apiKeysSize = apiKeysPage.getAPIKeys().length
    assert.equal(apiKeysSize, 1, 'Existing API Key is remaining.')
  })

  it('should delete API Key that has just created', () => {
    apiKeysPage.deleteAPIKey(0)

    const apiKeysSize = apiKeysPage.getAPIKeys().length
    assert.equal(apiKeysSize, 0, 'All API Keys are deleted.')
  })

})
