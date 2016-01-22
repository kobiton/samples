var config = require('./config')

exports.kobiton = {
  host: 'kobiton.com', //TODO need to update later
  port: 3001, //TODO need to update later
  auth: `${config.userConfigs.username}:${config.userConfigs.apikey}` // auth structure auth:'username:apikey'
}
