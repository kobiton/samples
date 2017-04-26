require 'rest-client'
require 'json'
require_relative '../config/config'

def getBookableDevices(platformName, numberOfDevices)
  headers = {
    token: $config['reportServerSecretKey']
  }
  res = RestClient.get "#{$config['reportServerUrl']}/devices/bookable/#{platformName}/#{numberOfDevices}", headers
  return JSON.parse res
end
