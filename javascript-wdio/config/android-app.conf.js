const { config } = require('./wdio.conf');

config.specs = [
  './test/specs/android-app-test.js',
];

config.capabilities = [
  {
    sessionName:        'Automation test session',
    sessionDescription: '',
    deviceOrientation:  'portrait',
    noReset:            false,
    fullReset:          true,
    captureScreenshots: true,
    app:                'https://appium.github.io/appium/assets/ApiDemos-debug.apk',
    deviceGroup:        'KOBITON',
    deviceName:         '*',
    platformVersion:    '*',
    platformName:       'Android'
  },
];

exports.config = config;
