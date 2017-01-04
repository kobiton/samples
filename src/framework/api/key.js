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
}

export default new Key()
