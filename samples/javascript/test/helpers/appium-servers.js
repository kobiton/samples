var config = require('./config')

exports.kobiton = {
  protocol: 'https',
  host: 'api-test.kobiton.com',
  port: 443,
  auth: `${config.userConfigs.username}:${config.userConfigs.apikey}` // auth structure auth:'username:apikey'
}
