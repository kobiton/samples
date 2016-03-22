import request from 'request'
import {debug} from '@kobiton/core-util'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search'
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
const remote = {}
const onlineCaps = []
const testerCaps = [{
  deviceName: 'Nexus 5',
  browserName: 'chrome',
  platformName: 'Android',
  platformVersion: '6.0.1'}
]

const sendRequest = ({
  method = 'GET', url, qs = {}, headers = {}, body = {}, json = true, token}) => {
  const options = {
    method: `${method}`,
    url: `${url}`,
    qs,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      ...headers
    },
    body,
    json
  }
  debug.log('helpers', `sendRequest ${method}: ${url}`)
  return new Promise((resolve, reject) => {
    request(options, function (err, response, body) {
      if (!err) {
        if (response.statusCode == 200) {
          resolve(body)
        }
        else {
          debug.error('helpers', new Error(body.message))
          reject(new Error(body.message))
        }
      }
      else {
        debug.error('helpers', new Error('Network error'))
        reject(new Error('Network error'))
      }
    })
  })
}

exports.login = async () => {
  const {emailOrUsername, password, apiUrl} = exports.getAccount()
  const url = apiUrl + api.login
  return await sendRequest({url, method: 'POST', body: {emailOrUsername, password}})
}

exports.getDevices = async (token) => {
  const account = exports.getAccount()
  let options = {
    method: 'GET',
    url: account.apiUrl + api.devices,
    qs: {
      platformName: 'android', platformVers: ''
    },
    headers: {
      'postman-token': 'a1d7a79d-3cc5-7727-df15-629bb52c419f',
      'cache-control': 'no-cache',
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    json: true
  }
  return await sendRequest(options)
}

exports.getAccount = () => {
  let account
  switch (process.env.REMOTE) {
    case 'staging':
      account = accountStaging
      break;
    case 'production':
      account = accountProduction
      break;
    default :
      account = accountTest
  }
  return account;
}
exports.initServer = async () => {
  try {
    const account = exports.getAccount()
    debug.log('helpers', 'initServer')
    const loginAccount = await exports.login()
    //init remote information for testing
    remote.protocol = 'http'
    remote.host = account.hubUrl
    remote.auth = account.emailOrUsername + ':' + loginAccount.user.apiKey
    remote.port = 80
    const devices = await exports.getDevices(loginAccount.token)
    devices.data.forEach((device) => {
      if (device.onlineCount > 0) {
        //init online caps for testing
        let cap = {
          browserName: 'chrome',
          platformName: device.platformName,
          platformVersion: device.platformVersion,
          deviceName: device.deviceName
        }
        debug.log('helpers', 'initServer: online caps:' + cap.deviceName)
        onlineCaps.push(cap)
      }
    })
  }
  catch (error) {
    throw new Error(error.message)
  }
}

exports.getRemote = () => {
  return remote
}

exports.getOnlineCaps = () => {
  return onlineCaps
  //return testerCaps
}

exports.getValidCaps = () => {
  const caps = []
  caps.push(exports.getOnlineCaps()[0])
  return caps
}
