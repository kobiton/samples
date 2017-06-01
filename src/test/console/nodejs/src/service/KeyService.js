import BaseService from './BaseService'
import configs from '../configs'

class KeyService extends BaseService {
  async getApiKey() {
    const allKeys = await this._get(`${configs.testServer.url}/api-keys`)
    return allKeys[0]
  }
}

export default new KeyService()
