import BPromise from 'bluebird'
import request from 'request'
import testConfig from '../../framework/config/test'
import {removeSlash} from '../../framework/util'

const requestAsync = BPromise.promisify(request, {multiArgs: true})

class TestServerReporter {
  async _send({method = 'GET', json = true, url, headers, body = {}} = {}) {
    const finalHeaders = headers || {
      'token': testConfig.report.serverSecretKey,
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

  async add(testCases) {
    return this._send({
      method: 'POST',
      url: `${removeSlash(testConfig.report.serverUrl)}/test-cases`,
      body: testCases
    })
  }
}

export default new TestServerReporter()
