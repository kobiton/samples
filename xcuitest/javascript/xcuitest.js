const request = require('request')

const username = 'luanttruong'
const apiKey = 'e91ef0d3-acbb-4e91-8bfa-0d5e09a70723'

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
  app:                '<APP_URL>',
  testRunner:         '<TEST_RUNNER_URL>', 
  testFramework:      'XCUITEST',
  sessionTimeout:     30,
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
  console.log('Response body:', body)
})
