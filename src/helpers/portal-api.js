import network from './network'
import {debug} from '@kobiton/core-util'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search',
  sessions: 'v1/sessions'
}
const accountTest = {
  apiUrl: 'https://api-test.kobiton.com/',
  hubUrl: 'api-test.kobiton.com',
  emailOrUsername: 'api_test1',
  password: 'mario8x@123'
}
const accountStaging = {
  apiUrl: 'https://api-staging.kobiton.com/',
  hubUrl: 'api-staging.kobiton.com',
  emailOrUsername: 'staging_test1',
  password: 'mario8x@123'
}
const accountProduction = {
  apiUrl: 'https://api.kobiton.com/',
  hubUrl: 'api.kobiton.com',
  emailOrUsername: 'production_test1',
  password: 'mario8x@123'
}

exports.getAccount = getAccount

exports.getUserInfo = async () => {
  const {emailOrUsername, password, apiUrl} = getAccount()
  return await network.sendRequest({
    url: `${apiUrl}${api.login}`,
    method: 'POST',
    body: {emailOrUsername, password}})
}
exports.getSession = async ({token, sessionid}) => {
  const {apiUrl} = getAccount()
  let request = {
    method: 'GET',
    url: `${apiUrl}${api.sessions}/${sessionid}`,
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  }
  const session = await network.sendRequest(request)
  return session
}

exports.getSessions = async ({token, page, size}) => {
  const {apiUrl} = getAccount()
  let request = {
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
  const sessions = await network.sendRequest(request)
  return sessions.data
}
exports.getOnlineDevices = async (token) => {
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
  const devices = await network.sendRequest(request)
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

function getAccount() {
  switch (global._mocha.env) {
    case 'staging':
      return accountStaging
    case 'production':
      return accountProduction
    default :
      return accountTest
  }
}

function getTestingType() {
  if (process.argv.length < 4) {
    return 'android'
  }
  else {
    return process.argv[3].replace('--', '')
  }
}
