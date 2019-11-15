const {config} = require('./wdio.conf')

config.specs = [
  './test/specs/android-app-test.js'
]

config.capabilities = [{
  sessionName:        'Android app test',
  sessionDescription: 'This is an example for Android app',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  app:                'https://appium.github.io/appium/assets/ApiDemos-debug.apk',
  deviceGroup:        'KOBITON',
  deviceName:         '*',
  platformName:       'Android'
}]

exports.config = config
