import 'babel-core/register'
import 'babel-polyfill'
import request from 'request'

const api = {
  login: 'v1/users/login',
  devices: 'v1/devices/search'
}
const account_test = {
  api_url: 'https://api-test.kobiton.com/',
  hub_url: 'api-test.kobiton.com',
  emailOrUsername: 'api_test1',
  password: 'mario8x@123'
}
const account_staging = {
  api_url: 'https://api-staging.kobiton.com/',
  hub_url: 'api-staging.kobiton.com',
  emailOrUsername: 'ktest2',
  password: 'mario8x@123'
}
const account_production = {
  api_url: 'https://api.kobiton.com/',
  hub_url: 'api.kobiton.com',
  emailOrUsername: 'ktest1',
  password: 'mario8x@123'
}
let remote = {}
let caps = []

const sendRequest = (
  {method = 'GET', url, qs = {}, headers = {}, body = {}, json = true, token}) => {
  let options = {
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

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        reject(error)
      }
        else {
        if (response.statusCode == 200) {
          resolve(body)
        }
          else {
          reject(body.message)
        }
      }
    })
  })
  return promise
}

const login = async () => {

  let url = exports.account().api_url + api.login
  let body = {emailOrUsername: exports.account().emailOrUsername,
               password: exports.account().password}
  return await sendRequest({url, method: 'POST', body})
}

const getDevices = async (token) => {
  let options = {
    method: 'GET',
    url: exports.account().api_url + api.devices,
    qs: {
      platformName: 'android', platformVers: ''
    },
    headers: {'postman-token': 'a1d7a79d-3cc5-7727-df15-629bb52c419f',
     'cache-control': 'no-cache',
     authorization: `Bearer ${token}`,
     'content-type': 'application/json'
   },
    json: true
  }
  return await sendRequest(options)
}

exports.account = () => {
  let account
  switch (process.env.REMOTE) {
    case 'staging':
      account = account_staging
      break;
    case 'production':
      account = account_production
      break;
    default :
      account = account_test
  }
  return account;
}
exports.initServer = async () => {
  try {
    let account = await login()
    //init remote information for testing
    remote.protocol = 'http'
    remote.host = exports.account().hub_url
    remote.auth = exports.account().emailOrUsername + ':' + account.user.apiKey
    remote.port = 80

    let devices = await getDevices(account.token)
    devices.data.forEach((device) => {
      if (device.onlineCount > 0) {
        exports.availableDevices.push(device)
        //init online caps for testing
        let cap = {
          browserName: 'chrome',
          platformName: device.platformName,
          platformVersion: device.platformVersion,
          deviceName: device.deviceName
        }
        caps.push(cap)
      }

    })
    console.log(1, 'success', devices);//eslint-disable-line no-console
  }
  catch (error) {
    console.log(2, 'error', error.message);//eslint-disable-line no-console
  }
  //await login().then(callback.success, callback.error)
  //console.log('result is: ' + result)
}
exports.availableDevices = []

exports.remote = () => {
  return remote
}

exports.onlineCaps = () => {
  return caps
}

exports.validCaps = () => {
  let caps = []
  caps.push(exports.onlineCaps()[0])
  return caps
}
