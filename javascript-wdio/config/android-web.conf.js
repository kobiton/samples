const {config} = require('./wdio.conf')

config.specs = [
  './test/specs/android-web-test.js'
]

config.capabilities = [{
  sessionName:        'Android web test',
  sessionDescription: 'This is an example for Android web',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  browserName:        'chrome',
  deviceGroup:        'KOBITON',
  deviceName:         '*',
  platformName:       'Android'
}]

exports.config = config
