kobitonServerUrl = 'https://userName:apiKey@api.kobiton.com/wd/hub'

# 100 seconds
session_timeout = 120

desired_caps_android_web = {
  'sessionName': '[Python] Android web',
  'sessionDescription': 'This is an example for Android web testing',
  'deviceOrientation':  'portrait',
  'browserName':        'chrome',
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'Galaxy S5',
  'platformName':       'Android',
  'newCommandTimeout':  120
}

desired_caps_android_app = {
  'sessionName': '[Python] Android app',
  'sessionDescription': 'This is an example for Android app testing',
  'deviceOrientation':  'portrait',
  'app':                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk',
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'Galaxy S5',
  'platformName':       'Android',
  'newCommandTimeout':  120
}

desired_caps_ios_web = {
  'sessionName': '[Python] iOS web',
  'sessionDescription': 'This is an example for iOS web testing',
  'deviceOrientation':  'portrait',
  'browserName':        'safari', 
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'iPhone 7',
  'platformName':       'iOS',
  'newCommandTimeout':  120
}

desired_caps_ios_app = {
  'sessionName': '[Python] iOS app',
  'sessionDescription': 'This is an example for iOS app testing',
  'deviceOrientation':  'portrait',
  'app':                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa',
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'iPhone 7',
  'platformName':       'iOS',
  'newCommandTimeout':  120
}
