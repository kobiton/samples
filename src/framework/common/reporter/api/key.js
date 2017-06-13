import BaseAPI from './base'
import config from '../../../config/test'
import {removeSlash} from '../../../util'

class KeyAPI extends BaseAPI {
  async getApiKey() {
    const [allKeys] = await this._get({
      url: `${removeSlash(config.report.serverUrl)}/api-keys`
    })

    return allKeys[0]
  }
}

export default new KeyAPI()
