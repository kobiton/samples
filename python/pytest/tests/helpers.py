DESIRED_CAPS_ANDROID_WEB = {
  'sessionName':        '[Python] Android web',
  'sessionDescription': 'This is an example for Android web testing',
  'browserName':        'chrome',
  'deviceGroup':        'KOBITON',
  'deviceName':         'Galaxy*',
  'platformName':       'Android',
  'newCommandTimeout':  120
}

DESIRED_CAPS_ANDROID_APP = {
  'sessionName':        '[Python] Android app',
  'sessionDescription': 'This is an example for Android app testing',
  'app':                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/ContactManager.apk',
  'appPackage':         'com.example.android.contactmanager',
  'appActivity':        '.ContactManager',
  'deviceGroup':        'KOBITON',
  'deviceName':         'Galaxy*',
  'platformName':       'Android',
  'newCommandTimeout':  120
}

DESIRED_CAPS_IOS_WEB = {
  'sessionName':        '[Python] iOS web',
  'sessionDescription': 'This is an example for iOS web testing',
  'browserName':        'safari', 
  'deviceGroup':        'KOBITON',
  'deviceName':         'iPhone*',
  'platformName':       'iOS',
  'newCommandTimeout':  120
}

DESIRED_CAPS_IOS_APP = {
  'sessionName':        '[Python] iOS app',
  'sessionDescription': 'This is an example for iOS app testing',
  'app':                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa',
  'deviceGroup':        'KOBITON',
  'deviceName':         'iPhone*',
  'platformName':       'iOS',
  'newCommandTimeout':  120
}
