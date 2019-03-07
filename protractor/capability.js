var androidWebCapability =  {
    sessionName:        '[Protractor] Android Web',
    sessionDescription: 'This is an example for Android Web testing',
    deviceOrientation:  'portrait',
    captureScreenshots: true,
    browserName:        'chrome',
    deviceGroup:        'KOBITON',
    deviceName:         'Galaxy*',
    platformName:       'Android'
}

var iOSWebCapability =  {
    sessionName:        '[Protractor] iOS Web',
    sessionDescription: 'This is an example for iOS Web testing',
    deviceOrientation:  'portrait',
    captureScreenshots: true,
    browserName:        'safari',
    deviceGroup:        'KOBITON',
    deviceName:         'iPhone*',
    platformName:       'iOS'
}

module.exports = {androidWebCapability, iOSWebCapability}
