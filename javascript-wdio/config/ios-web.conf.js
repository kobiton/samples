const { config } = require('./wdio.conf');

config.specs = [
  './test/specs/ios-web-test.js',
];

config.capabilities = [
  {
    sessionName:        'Automation test session',
    sessionDescription: 'This is an example for iOS web',
    deviceOrientation:  'portrait',
    noReset:            false,
    fullReset:          true,
    captureScreenshots: true,
    browserName:        'safari',
    deviceGroup:        'KOBITON',
    deviceName:         '*',
    platformVersion:    '*',
    platformName:       'iOS'
  },
];

exports.config = config;
