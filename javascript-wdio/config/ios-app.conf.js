const { config } = require('./wdio.conf');

config.specs = [
  './test/specs/ios-app-test.js',
];

config.capabilities = [
  {
    sessionName:        'Automation test session',
    sessionDescription: '',
    deviceOrientation:  'portrait',
    noReset:            false,
    fullReset:          true,
    captureScreenshots: true,
    app:                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/UIKitCatalog-Test-Adhoc.ipa',
    deviceGroup:        'KOBITON',
    deviceName:         '*',
    platformVersion:    '*',
    platformName:       'iOS'
  },
];

exports.config = config;
