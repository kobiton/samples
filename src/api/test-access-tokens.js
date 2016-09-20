import {assert} from 'chai'
import {getUserInfo, generateAPIKey, getAPIKeys, deleteAPIKey} from '../core/portal-api'
import BPromise from 'bluebird'

const apiKeyFormat = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/

describe('API keys:', () => {

  it('DELETE users/access-token/api-key should delete an existing api key', async() => {
    const {token} = await getUserInfo()
    const listAccessTokens = (await getAPIKeys(token)).map((item) => {
      return item.token
    })
    const deletedToken = listAccessTokens[0]
    assert.match(deletedToken, apiKeyFormat)

    await deleteAPIKey({token, apiKey: deletedToken})

    const listNewAccessTokens = (await getAPIKeys(token)).map((item) => {
      return item.token
    })
    assert.notInclude(listNewAccessTokens, deletedToken)
  })

  it('POST users/access-token function should generate a new api key', async () => {
    const {token} = await getUserInfo()

    const result = await generateAPIKey(token)

    const listAccessTokens = (await getAPIKeys(token)).map((item) => {
      return item.token
    })
    assert.include(listAccessTokens, result.token)
    assert.match(result.token, apiKeyFormat, 'new api key matches regexp')
  })

  it('POST users/access-token function should limit new api keys upto 250', async () => {
    const {token} = await getUserInfo()
    const listAccessTokens = (await getAPIKeys(token)).map((item) => {
      return item.token
    })

    const newTokenLength = 250 - listAccessTokens.length
    let tasks = []
    // This step is to create to full of 250 api keys
    for (let i = 0; i < newTokenLength; i++) {
      tasks.push(generateAPIKey(token))
    }
    await BPromise.all(tasks)
    // This step is to create a last new apiKey at position 251
    try {
      await generateAPIKey(token)
    }
    catch (err) {
      // TODO: need to add assertion for a specific error message when this feature complete
    }

    const listUpdatedAccessTokens = (await getAPIKeys(token)).map((item) => {
      return item.token
    })
    assert.isBelow(250, listUpdatedAccessTokens.lenght,
      `num of access tokens ${listUpdatedAccessTokens.length} larger than 250`)
  })

})
