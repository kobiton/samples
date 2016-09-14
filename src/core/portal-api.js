import sendRequest from './network'
import {debug} from '@kobiton/core-util'
import {getConfig} from './config'
import {pick} from 'lodash'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search',
  sessions: 'v1/sessions',
  key: 'v1/users/key'
}

export async function getUserInfo() {
  const {emailOrUsername, password, apiUrl} = getConfig()
  return await sendRequest({
    url: `${apiUrl}${api.login}`,
    method: 'POST',
    body: {emailOrUsername, password}})
}

export async function getSession({token, sessionid}) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    method: 'GET',
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
      method: 'GET',
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

export async function getDevices(token) {
  const platformName = getTestingType()
  const {apiUrl} = getConfig()
  return await sendRequest({
    method: 'GET',
    url: `${apiUrl}${api.devices}`,
    qs: {
      'platformName': platformName
    },
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
}

export async function getOnlineDevices(token) {
  const devices = await getDevices(token)
  const {filterDevice} =  getConfig()
  const onlineDevices = devices.data
    .filter((d) => {
    return (filterDevice) ? d.availableCount > 0 && d.deviceName === filterDevice : d.availableCount > 0
  })
  .map((d) => {
    const {platformName, platformVersion, deviceName} = d
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



export async function generateApiKey(token) {
  const {apiUrl} = getConfig()
  return await sendRequest({
    method: 'POST',
    url: `${apiUrl}${api.key}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  })
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

function getTestingType() {
  return (process.argv.length < 4) ? '' : process.argv[3].replace('--', '')
}
