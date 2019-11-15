const {config} = require('./wdio.conf')

config.specs = [
  './test/specs/ios-app-test.js'
]

config.capabilities = [{
  sessionName:        'iOS app test',
  sessionDescription: 'This is an example for iOS app',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  app:                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
  deviceGroup:        'KOBITON',
  deviceName:         '*',
  platformName:       'iOS'
}]

exports.config = config
