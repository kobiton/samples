const {config} = require('./wdio.conf')

config.specs = [
  './test/specs/ios-web-test.js'
]

config.capabilities = [{
  sessionName:        'iOS web test',
  sessionDescription: 'This is an example for iOS web',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  browserName:        'safari',
  deviceGroup:        'KOBITON',
  deviceName:         '*',
  platformName:       'iOS'
}]

exports.config = config
