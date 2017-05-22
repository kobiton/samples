import BaseAPI from './base'
import config from '../../../config/test'
import {removeSlash} from '../../../util'

class TestCasesAPI extends BaseAPI {
  async add(testCases) {
    return this._send({
      method: 'POST',
      url: `${removeSlash(config.report.serverUrl)}/test-cases`,
      body: testCases
    })
  }
}

export default new TestCasesAPI()
