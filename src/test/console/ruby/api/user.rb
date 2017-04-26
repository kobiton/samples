require 'rest-client'
require 'json'
require_relative '../config/config'

def getTestAccountInfo
  headers = {
    token: $config['reportServerSecretKey']
  }
  res = RestClient.get "#{$config['reportServerUrl']}/api-keys", headers
  allKeys = JSON.parse(res)
  return allKeys[0]
end
