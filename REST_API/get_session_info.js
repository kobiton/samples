const request = require('request');

const username='<YOUR_USERNAME>';
const apikey='<YOUR_APIKEY>';

const session = '<SESSION_ID>';
request({
  url: 'https://api.kobiton.com/v1/sessions/' + session,
  json: true,
  method: 'GET',
  auth: {
    'user':username,
    'pass':apikey
  }
}, function (err, response, body){
  if (err) return console.error('Error:', err);
  console.log('Response:', response);
  console.log('Response body:', body);
});
