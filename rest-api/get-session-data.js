const https = require('https')
const username = process.env.username
const apiKey = process.env.apikey
const sessionId = process.env.sessionId

var auth = 'Basic ' + Buffer.from(`${username}:${apiKey}`).toString('base64');
const options = {
  hostname : 'api.kobiton.com',
  path: `/v1/sessions/${sessionId}`,
  method : 'GET',
  json : true,
  headers: {
    'Authorization': auth
  }
};
const req = https.request(options, (res) => {
  res.on('data', (respon) => {
    console.log(JSON.parse(respon))
  })
})
req.on('error', (e) => {
  console.error(`error: ${e.message}`)
})
req.end();