const { config } = require('./wdio.conf');

config.specs = [
    './test/specs/android-web-test.js',
];

config.capabilities = [
    {
        sessionName:        'Automation test session',
        sessionDescription: 'This is an example for Android web',
        deviceOrientation:  'portrait',
        noReset:            false,
        fullReset:          true,
        captureScreenshots: true,
        browserName:        'chrome',
        deviceGroup:        'KOBITON',
        deviceName:         '*',
        platformVersion:    '*',
        platformName:       'Android'
    },
];

exports.config = config;
