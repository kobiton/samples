import {debug} from '@kobiton/core-util'
import {assert} from 'chai'
import {getUserInfo, generateApiKey} from '../core/portal-api'

describe('Verify generate api key', () => {

  it('POST users/key function should generate a new api key successfully', async () => {
    const {token, apiKey} = await getUserInfo()

    const result = await generateApiKey(token)

    debug.log('generate-api-key', JSON.stringify(result))
    assert.notEqual(result.apiKey, apiKey)
  })

})
