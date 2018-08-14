const request = require('request');

const username='YOUR_USERNAME';
const apikey='YOUR_APIKEY';

const session = [SESSIONID];

var length = session.length;
for (var i = 0 ; i< length; i++){
  request({
    url: 'https://api.kobiton.com/v1/sessions/' + session[i],
    json: true,
    method: 'GET',
    auth: {
      'user':username,
      'pass':apikey
    }
  }, function (err, response, body){
  if (err) return console.error('Error:', err);
  console.log(body);
  });
}
