import sendRequest from './network'
import {getConfig} from './config'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices',
  sessions: 'v1/sessions',
  api_keys: 'v1/users/keys',
  api_key: 'v1/users/key'
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
  const {apiUrl} = getConfig()
  return await sendRequest({
    url: `${apiUrl}${api.devices}`,
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
}

export async function getOnlineDevices(token) {
  let {deviceUDID, filterDevice, deviceGroup} = getConfig()
  const devices = await getDevices(token)

  let onlineDevices
  const privateDevices = _getOnlineDevices(devices.privateDevices)
  const cloudDevices = _getOnlineDevices(devices.cloudDevices)

  // We just support UDID for private group
  deviceGroup = (deviceUDID) ? 'private' : deviceGroup

  // Select onlineDevices depend on private group, cloud group or both
  switch (deviceGroup) {
    case 'private':
      onlineDevices = privateDevices
      break
    case 'cloud':
      onlineDevices = cloudDevices
      break
    default:
      onlineDevices = (privateDevices.length) ? cloudDevices.concat(privateDevices) : cloudDevices
  }

  // Filter device depends on device name, udid

  onlineDevices = (filterDevice)
    ? onlineDevices.filter((d) => d.deviceName.includes(filterDevice)) : onlineDevices
  onlineDevices = (deviceUDID) ? onlineDevices.filter((d) => d.udid === deviceUDID) : onlineDevices

  // Filter device depends on platform name
  const testingType = getTestingType()
  switch (testingType) {
    case 'android':
      onlineDevices = onlineDevices.filter((d) => d.platformName === 'Android')
      break
    case 'ios':
      onlineDevices = onlineDevices.filter((d) => d.platformName === 'iOS')
      break
  }

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
    url: `${apiUrl}${api.api_key}/${apiKey}`,
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
    url: `${apiUrl}${api.api_key}`,
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
    url: `${apiUrl}${api.api_keys}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
}

function getTestingType() {
  return (process.argv.length < 4) ? '' : process.argv[3].replace('--', '')
}

function _getOnlineDevices(listDevices) {
  let onlineDevices = []
  const testingType = getTestingType()
  const {deviceUDID, deviceOrientation} = getConfig()

  if (listDevices && listDevices.length > 0) {
    listDevices = listDevices.filter((d) => d.isOnline === true && d.isBooked === false)

    onlineDevices = listDevices
      .map((d) => {
        const {platformName, platformVersion, deviceName, udid} = d
        let pickDevice = {
          platformName,
          platformVersion,
          deviceName,
          deviceOrientation,
          captureScreenshots: true
        }

        if (deviceUDID) {
          pickDevice = {...pickDevice, udid}
        }

        let browserName
        switch (testingType) {
          case 'android':
            browserName = 'chrome'
            break
          case 'ios':
            browserName = 'safari'
            break
          default:
            browserName = (platformName === 'Android') ? 'chrome' : 'safari'
        }

        return {...pickDevice, browserName}
      })
  }
  return onlineDevices
}
