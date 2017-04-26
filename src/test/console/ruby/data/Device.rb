require 'json'
require_relative '../api/device'

def getABookableDevice(platformName)
  devices = getBookableDevices platformName, 1
  return devices[0]
end
