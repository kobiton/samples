import {requestAsync} from '../../core/network'
import {getAccount} from '../../core/user-info'

/**
 * Public functions for api testing
 */
export async function registerAccount({fullname, username, password, email}) {
  const {apiUrl} = getAccount()
  return await _sendRequest({
    method: 'POST',
    url: `${apiUrl}v1/users`,
    form: {
      name: fullname,
      username,
      password,
      email
    }
  })
}

async function _sendRequest(options) {
  const finalOptions = {method: 'GET', json: true, body: {}, ...options}
  return await requestAsync(finalOptions)
}
