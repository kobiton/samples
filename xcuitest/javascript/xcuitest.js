const request = require('request')

const username = ''
const apiKey = ''

const encodeAuth= `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`

const configuration = { 
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for XCUITEST testing', 
  noReset:            true,
  fullReset:          false,     
  deviceName:         '*',
  platformVersion:    '*',  
  // The given group is used for finding devices and the created session will be visible for all members within the group.
  groupId:            583, // Group: abcdc  
  deviceGroup:        'KOBITON',
  app:                'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/XCUITestSample.ipa',
  testRunner:         'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/XCUITestSampleUITestRunner.ipa', 
  testFramework:      'XCUITEST',
  sessionTimeout:     30,

  // The user can specifically test running via testPlan or tests
  // If the testPlan and tests are set, the test framework will auto-select the testPlan first
  tests:              [],
  testPlan:           'https://kobiton-devvn.s3-ap-southeast-1.amazonaws.com/apps-test/sample.xctestplan'
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
