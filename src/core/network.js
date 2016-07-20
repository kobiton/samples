import request from 'request'
import {debug} from '@kobiton/core-util'
import BPromise from 'bluebird'

export default async function sendRequest(options) {
  const finalOptions = {method: 'GET', json: true, body: {}, ...options}
  debug.log('sendRequest()', `${finalOptions.method}: ${finalOptions.url}`)

  const [response, body] = await requestAsync(finalOptions)
  if (response.statusCode !== 200) {
    debug.error('sendRequest()', new Error(finalOptions.body.message))
    throw new Error(finalOptions.body.message)
  }
  debug.log('response()', `${JSON.stringify(body)}`)
  return body
}

export const requestAsync = BPromise.promisify(request, {multiArgs: true})
