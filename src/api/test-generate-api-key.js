import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import {getUserInfo, generateApiKey} from '../core/portal-api'

const apiKeyFormat = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/

describe('Verify generate api key', () => {

  it('POST users/key function should generate a new api key successfully', async () => {
    const {user, token} = await getUserInfo()

    const result = await generateApiKey(token)

    debug.log('generate-api-key', `new: ${result.apiKey} vs old: ${user.apiKey} `)
    assert.notEqual(result.apiKey, user.apiKey)
    assert.match(result.apiKey, apiKeyFormat, 'new api key matches regexp')
  })

})
