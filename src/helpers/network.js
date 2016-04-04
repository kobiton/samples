import request from 'request'
import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'

exports.sendRequest = async (options) => {
  const finalOptions = {method: 'GET', json: true, body: {}, ...options}
  debug.log('helpers', `sendRequest ${finalOptions.method}: ${finalOptions.url}`)

  const [response, body] = await requestAsync(finalOptions)
  if (response.statusCode !== 200) {
    debug.error('helpers', new Error(finalOptions.body.message))
    throw new Error(finalOptions.body.message)
  }
  debug.log('helpers', `response: ${JSON.stringify(body)}`)
  return body
}

const requestAsync = BPromise.promisify(request, {multiArgs: true})
