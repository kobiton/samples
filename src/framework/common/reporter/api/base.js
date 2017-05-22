import BPromise from 'bluebird'
import request from 'request'
import config from '../../../config/test'

const requestAsync = BPromise.promisify(request, {multiArgs: true})

export default class BaseAPI {
  async _send({method = 'GET', json = true, url, headers, body = {}} = {}) {
    const finalHeaders = headers || {
      'token': config.report.serverSecretKey,
      'content-type': 'application/json'
    }
    const finalOptions = {
      method,
      json,
      url,
      headers: finalHeaders,
      body
    }

    const [response, resBody] = await requestAsync(finalOptions)
    if (response.statusCode >= 400) {
      const bodyMsg = (resBody instanceof String) ? resBody : JSON.stringify(resBody)
      throw new Error(`statusCode: ${response.statusCode}, body message: ${bodyMsg}`)
    }

    return [resBody, response]
  }
}
