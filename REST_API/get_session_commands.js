const request = require('request');

const username='<KOBITON_USERNAME>';
const apikey='<KOBITON_API_KEY>';

const session = '<SESSION_ID>';

request({
  url: 'https://api.kobiton.com/v1/sessions/' + session + '/commands'  ,
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