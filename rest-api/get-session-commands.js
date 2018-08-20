const https = require('https')

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const sessionId = process.env.KOBITON_SESSION_ID

const options = {
  host: 'api.kobiton.com',
  path: `/v1/sessions/${sessionId}/commands`,
  auth: `${username}:${apiKey}`
}
https.get(options, function (res) {
  let body = ""
  res.on('data', function (data) {
    body += data
  })
  res.on('end', function () {
    console.log(JSON.parse(body))
  })
  res.on('error', function (e) {
    console.log('Error: ' + e.message)
  })
})
