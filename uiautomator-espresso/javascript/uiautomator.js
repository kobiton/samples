const request = require('request')

const username = ''
const apiKey = ''

const encodeAuth= `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`

const configuration = { 
  sessionName: 'Automation test session',
  sessionDescription: 'This is an example for UIAutomator testing',
  deviceName: '*',
  app: 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/uiautomator-app.apk',
  testRunner: 'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/uiautomator-espresso/uiautomator-test-runner.apk',
  continueOnFailure: true,
  sessionTimeout: 30,
  testTimeout: 10,
  retryTimes: 3,
  tests: [
    'com.example.android.testing.uiautomator.BasicSample.test',
    'ChangeTextBehaviorTest',
    'ChangeTextBehaviorTest#testChangeText_sameActivity'
  ],
  testFramework: 'UIAUTOMATOR'
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
