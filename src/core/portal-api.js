import sendRequest from './network'
import {debug} from '@kobiton/core-util'
import {getAccount} from './config'
import {pick} from 'lodash'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search',
  sessions: 'v1/sessions',
  key: 'v1/users/key'
}

export async function getUserInfo() {
  const {emailOrUsername, password, apiUrl} = getAccount()
  return await sendRequest({
    url: `${apiUrl}${api.login}`,
    method: 'POST',
    body: {emailOrUsername, password}})
}

export async function getSession({token, sessionid}) {
  const {apiUrl} = getAccount()
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
  const {apiUrl} = getAccount()
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
  const {apiUrl} = getAccount()
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
  const onlineDevices = devices.data
    .filter((d) => d.availableCount > 0)
    .map((d) => {
      const pickDevice = pick(d, 'platformName', 'platformVersion', 'deviceName')
      const testingType = getTestingType()
      let browserName
      switch(testingType){
        case 'android':
          browserName = 'chrome'
          break
        case 'ios':
          browserName = 'safari'
          break
        default:
        browserName = d.platformName.includes('Android') ? 'chrome' : 'safari'
      }
      return {...pickDevice, browserName}
    }
  )
  debug.log('portal-api:getOnlineDevices() ', `${JSON.stringify(onlineDevices)}`)
  return onlineDevices
}

export async function generateApiKey(token) {
  const {apiUrl} = getAccount()
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
  const {apiUrl} = getAccount()
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
  const {apiUrl} = getAccount()
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
