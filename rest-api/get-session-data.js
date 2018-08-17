const https = require('https')

const username = process.env.USERNAME
const apiKey = process.env.API_KEY
const sessionId = process.env.SESSION_ID

const options = {
  host : 'api.kobiton.com',
  path: `/v1/sessions/${sessionId}`,
  headers: {
    'Authorization': 'Basic ' + new Buffer(`${username}:${apiKey}`).toString('base64')
  }
};
request = https.get(options, function(res){
  var body = "";
  res.on('data', function(data) {
     body += data;
  });
  res.on('end', function() {
     console.log(JSON.parse(body));
  })
  res.on('error', function(e) {
     onsole.log("Error: " + e.message);
  });
 });