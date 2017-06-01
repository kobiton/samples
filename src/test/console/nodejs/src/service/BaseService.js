import request from 'request-promise'
import configs from '../configs'

export default class BaseService {
  _get(uri) {
    const options = {
      uri,
      headers: {
        token: configs.testServer.secretKey
      },
      json: true
    }

    return request(options)
  }
}
