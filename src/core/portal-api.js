import sendRequest from './network'
import {debug} from '@kobiton/core-util'
import {getConfig} from './config'
import {pick} from 'lodash'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search',
  sessions: 'v1/sessions',
  access_tokens: 'v1/users/access-tokens',
  access_token: 'v1/users/access-token'
}

// Account
export async function getUserInfo() {
  const {emailOrUsername, password, apiUrl} = getConfig()
  const userInfo = await sendRequest({
    url: `${apiUrl}${api.login}`,
    method: 'POST',
    body: {emailOrUsername, password}})

  return userInfo
}

/**
 * register an account
 * @param {fullname, username, password, email}
 * @uses to register an new account
 */
export async function registerAccount({fullname, username, password, email}) {
  const {apiUrl} = getConfig()
  return await sendRequest({
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

// Sessions
export async function getSession({token, sessionid}) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    url: `${apiUrl}${api.sessions}/${sessionid}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
}

export async function getSessions({token, page, size}) {
  const {apiUrl} = getConfig()
  const result = await sendRequest(
    {
      url: `${apiUrl}${api.sessions}`,
      qs: {
        page,
        size
      },
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      }
    }
  )
  return result.data
}

export async function deleteSessionDetail({token, sessionId}) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    method: 'DELETE',
    url: `${apiUrl}${api.sessions}/${sessionId}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
}

// Devices
export async function getDevices(token) {
  const platformName = getTestingType()
  const {apiUrl} = getConfig()
  return await sendRequest({
    url: `${apiUrl}${api.devices}`,
    qs: {
      platformName
    },
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
}

export async function getOnlineDevices(token) {
  const devices = await getDevices(token)
  const {filterDevice} = getConfig()
  const onlineDevices = devices.data
    .filter((d) => {
      return (filterDevice) ? d.availableCount > 0 && d.deviceName === filterDevice : d.availableCount > 0  // eslint-disable-line max-len
    })
  .map((d) => {
    const pickDevice = pick(d, 'platformName', 'platformVersion', 'deviceName')
    const testingType = getTestingType()
    let browserName
    switch (testingType) {
      case 'android':
        browserName = 'chrome'
        break
      case 'ios':
        browserName = 'safari'
        break
      default:
        browserName = d.platformName.includes('Android') ? 'chrome' : 'safari'
    }
    const desiredCaps = Object.assign(pickDevice, {
      browserName,
      'deviceOrientation': 'portrait',
      'captureScreenshots': true
    })
    return desiredCaps
  })
  debug.log('portal-api:getOnlineDevices() ', `${JSON.stringify(onlineDevices)}`)

  return onlineDevices
}

// Organization

/**
 * delete api key
 * @param {token, apiKey} token is a authentication token,
 * apiKey is a token to run automated script
 * @uses to delete a api key from user
 */
export async function deleteAPIKey({token, apiKey}) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    method: 'DELETE',
    url: `${apiUrl}${api.access_token}/${apiKey}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
}

/**
 * generate api key
 * @param {token} is a authentication token
 * @uses to generate a new apk key for user
 */
export async function generateAPIKey(token) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    method: 'POST',
    url: `${apiUrl}${api.access_token}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
}

/**
 * get api keys
 * @param {token} is an authentication token
 * @uses to get a list of api keys from user
 */
export async function getAPIKeys(token) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    url: `${apiUrl}${api.access_tokens}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
}

function getTestingType() {
  return (process.argv.length < 4) ? '' : process.argv[3].replace('--', '')
}
