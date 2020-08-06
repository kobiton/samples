const request = require('request')

const username = ''
const apiKey = ''

const encodeAuth = 'Basic ' + Buffer.from(`${username}:${apiKey}`).toString('base64')

const configuration = { 
  sessionName: 'Automation test session',
  sessionDescription: 'This is an example for Espresso testing',
  deviceName: '*',
  deviceGroup: 'KOBITON',
  app: 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/espresso-app.apk',
  testRunner: 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/esspresso-test-runner.apk',
  continueOnFailure: true,
  sessionTimeout: 5,
  testTimeout: 1,
  retryTimes: 3,
  tests: [
    'HintMatchersTest#hint_endsWith_Passed',
    'com.example.android.testing.espresso.CustomMatcherSample.test'
  ]
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
  console.log('Response body:', body)
})
