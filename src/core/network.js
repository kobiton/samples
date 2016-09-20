import request from 'request'
import BPromise from 'bluebird'

export default async function sendRequest(options) {
  const finalOptions = {method: 'GET', json: true, body: {}, ...options}

  const [response, body] = await requestAsync(finalOptions)
  if (response.statusCode !== 200) {
    throw (response.statusCode == 404) ? new Error(body) : new Error(body.message)
  }

  return body
}

export const requestAsync = BPromise.promisify(request, {multiArgs: true})
