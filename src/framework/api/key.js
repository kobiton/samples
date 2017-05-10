import Base from './_base'

const subUrl = {
  api_keys: 'users/keys'
}
class Key extends Base {

  async remove({apiKey}) {
    await this.delete({
      path: subUrl.api_keys,
      body: {
        apiKey
      }
    })
  }

  async createNew() {
    const [newKey] = await this.post({
      path: subUrl.api_keys
    })
    return newKey
  }

  async getAll() {
    const [allKeys] = await this.get({
      path: subUrl.api_keys
    })
    return allKeys
  }

  async getApiKey() {
    const allKeys = await this.getAll()

    if (allKeys.length > 0) {
      return allKeys[0].key
    }
    else {
      throw Error('No valid api key found.')
    }
  }
}

export default new Key()
