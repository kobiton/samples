import BaseAPI from './base'
import config from '../../../config/test'
import {removeSlash} from '../../../util'

class AvailabitityAPI extends BaseAPI {
  async add(availabitities) {
    return this._send({
      method: 'POST',
      url: `${removeSlash(config.report.serverUrl)}/availability`,
      body: availabitities
    })
  }
}

export default new AvailabitityAPI()
