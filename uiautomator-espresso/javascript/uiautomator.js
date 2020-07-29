const request = require('request')

const username = ''
const apiKey = ''

const encodeAuth = 'Basic ' + Buffer.from(`${username}:${apiKey}`).toString('base64')

const configuration = { 
  sessionName: "Automation test session",
  sessionDescription: "This is an example for Android app testing",
  noReset: true,
  fullReset: false,
  deviceName: "*",
  platformVersion: "*",
  deviceGroup: "KOBITON",
  app: "",
  testRunner: "",
  continueOnFailure: true,
  sessionTimeout: 2,
  testTimeout: 3,
  retryTimes: 2,
  tests: []
}

const headers = {
  'Content-Type':'application/json',
  'Authorization': encodeAuth,
  'Accept':'application/json'
}
const body = {
  configuration
}

request({
  url: 'https://api.kobiton.com/hub/session',
  json: true,
  method: 'POST',
  body,
  headers
}, function (err, response, body) {
  if (err) return console.error('Error:', err)
  console.log('Response:', response)
  console.log('Response body:', body)
})
