import {assert} from 'chai'
import api from '../../../framework/api'
import BPromise from 'bluebird'

const apiKeyFormat = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/

describe('API / apiKey', () => {

  it('Should able to delete an existing api key', async() => {
    const listAccessTokens = (await api.Key.getAll()).map((item) => {
      return item.key
    })
    const deletedToken = listAccessTokens[0]
    assert.match(deletedToken, apiKeyFormat)

    await api.Key.remove({apiKey: deletedToken})

    const listNewAccessTokens = (await api.Key.getAll()).map((item) => {
      return item.key
    })
    assert.notInclude(listNewAccessTokens, deletedToken, 'api key was not deleted')
  })

  it('Should generate a new api key', async () => {
    const result = await api.Key.createNew()

    const listAccessTokens = (await api.Key.getAll()).map((item) => {
      return item.key
    })
    assert.include(listAccessTokens, result.key)
    assert.match(result.key, apiKeyFormat, 'new api key does not matche regexp')
  })

  it('Should limit new api keys upto 250', async () => {
    const listAccessTokens = (await api.Key.getAll()).map((item) => {
      return item.key
    })

    const newTokenLength = 250 - listAccessTokens.length
    let tasks = []
    // This step is to create to full of 250 api keys
    for (let i = 0; i < newTokenLength; i++) {
      tasks.push(api.Key.createNew())
    }
    await BPromise.all(tasks)
    // This step is to create a last new apiKey at position 251
    try {
      await api.Key.createNew()
    }
    catch (err) {
      // TODO: need to add assertion for a specific error message when this feature complete
    }

    const listUpdatedAccessTokens = (await api.Key.getAll()).map((item) => {
      return item.key
    })
    assert.isBelow(250, listUpdatedAccessTokens.lenght,
      `num of access tokens ${listUpdatedAccessTokens.length} larger than 250`)
  })

})
