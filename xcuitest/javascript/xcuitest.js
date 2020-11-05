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
  groupId:            535, // Group: abcdc  
  deviceGroup:        'ORGANIZATION',
  app:                'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/6/XCUITestSample-cf0cae10-1f0e-11eb-bc6c-e3417e3453b3.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586603&Signature=OrqPAP8KJWapIuStzXmHwS28fNo%3D',
  testRunner:         'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/6/XCUITestSampleUITestRunner-e3ef3500-1f0e-11eb-b45a-478d7efceb5e.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586641&Signature=DDhYizx%2FdKMZyMe%2F5QEXx5gLoGs%3D', 
  testFramework:      'XCUITEST',
  sessionTimeout:     30,
  tests: [],
  testPlan:           'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-plan/users/6/sample-fe1f27f0-1f0e-11eb-964e-0f0d0f83dd07.xctestplan?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1604586682&Signature=WESzuwFm55OqM4R4%2B8Zq0rD6TnA%3D'
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
