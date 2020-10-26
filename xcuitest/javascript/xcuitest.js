const request = require('request')

const username = 'luanttruong'
const apiKey = 'e91ef0d3-acbb-4e91-8bfa-0d5e09a70723'

const encodeAuth= `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`

const configuration = { 
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for XCUITEST testing', 
  noReset:            true,
  fullReset:          false,     
  deviceName:         'iPad Pro 2G 12.9 (Wi-Fi)',
  platformVersion:    '13.3.1',  
  // The given group is used for finding devices and the created session will be visible for all members within the group.
  groupId:            535, // Group: abcdc  
  deviceGroup:        'ORGANIZATION',
  app:                'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/11456/Sumeru-2-a7bacf10-1737-11eb-9457-af5fda59b9f9.ipa?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1603724547&Signature=JczRmdhUlcqJLgxpWrQZEjSMmRM%3D',
  testRunner:         'https://kobiton-devvn.s3.ap-southeast-1.amazonaws.com/test-runner/users/11456/UITests-Runner-dbbc1a30-1737-11eb-ba5a-0d3fa7e7a6d1.zip?AWSAccessKeyId=AKIAYOIAYUIRQXR7QYH2&Expires=1603724638&Signature=iklhDGUCpHTNaz0hadqShZyufDY%3D', 
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
  url: 'https://api-test.kobiton.com/hub/session',
  json: true,
  method: 'POST',
  body,
  headers
}, function (err, response, body) {
  if (err) return console.error('Error:', err)
  console.log('Response body:', body)
})
