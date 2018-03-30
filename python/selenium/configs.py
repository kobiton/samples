kobitonServerUrl = 'https://userName:apiKey@api.kobiton.com/wd/hub'

# 100 seconds
session_timeout = 100

desired_caps_android_web = {
  'sessionName': 'Android web',
  'sessionDescription': 'This is an example for Android web testing',
  'deviceOrientation':  'portrait',
  'browserName':        'chrome',
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'Galaxy S5',
  'platformName':       'Android'
}

desired_caps_android_app = {
  'sessionName': 'Android app',
  'sessionDescription': 'This is an example for Android app testing',
  'deviceOrientation':  'portrait',
  'app':                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.apk',
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'Galaxy S5',
  'platformName':       'Android'
}

desired_caps_ios_web = {
  'sessionName': 'iOS web',
  'sessionDescription': 'This is an example for iOS web testing',
  'deviceOrientation':  'portrait',
  'browserName':        'safari', 
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'iPhone 7',
  'platformName':       'iOS'
}

desired_caps_ios_app = {
  'sessionName': 'iOS app',
  'sessionDescription': 'This is an example for iOS app testing',
  'deviceOrientation':  'portrait',
  'app':                'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/iFixit.ipa',
  'captureScreenshots': True,
  'deviceGroup':        'KOBITON',
  'deviceName':         'iPhone 7',
  'platformName':       'iOS'
}
