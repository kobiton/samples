import sendRequest from './network'
import {debug} from '@kobiton/core-util'
import {getAccount} from './user-info'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search',
  sessions: 'v1/sessions'
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

export async function getOnlineDevices(token) {
  const testingType = getTestingType()
  const platform = `${testingType}`.includes('android') ? 'android' : 'ios'
  const browsername = `${testingType}`.includes('android') ? 'chrome' : 'safari'
  const {apiUrl} = getAccount()
  let request = {
    method: 'GET',
    url: `${apiUrl}${api.devices}`,
    qs: {
      'platformName': platform
    },
    headers: {
      'authorization': `Bearer ${token}`
    }
  }
  const devices = await sendRequest(request)
  const onlineDevices = devices.data
    .filter((d) => d.availableCount > 0)
    .map((d) => ({
      'browserName': browsername,
      'platformName': d.platformName,
      'platformVersion': d.platformVersion,
      'deviceName': d.deviceName
    })
  )
  debug.log('getOnlineDevices()', `${JSON.stringify(onlineDevices)}`)
  return onlineDevices
}

function getTestingType() {
  if (process.argv.length < 4) {
    return 'android'
  }
  else {
    return process.argv[3].replace('--', '')
  }
}
