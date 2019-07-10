export const listOfSingleiOSDesiredCaps = [
  // Appium Capabilities
  {name: 'automationName', value: '"XCUITest"', expectedResult: 'passed'},
  {name: 'automationName', value: '"YouiEngine"', expectedResult: 'passed'},
  {name: 'automationName', value: null, expectedResult: 'passed'},
  {name: 'orientation', value: '"LANDSCAPE"', expectedResult: 'passed'},
  {name: 'orientation', value: '"PORTRAIT"', expectedResult: 'passed'},
  {name: 'orientation', value: null, expectedResult: 'passed'},
  {name: 'newCommandTimeout', value: 60, expectedResult: 'passed'},
  {name: 'newCommandTimeout', value: null, expectedResult: 'passed'},
  {name: 'language', value: '"fr"', expectedResult: 'passed'},
  {name: 'language', value: null, expectedResult: 'passed'},
  {name: 'locale', value: '"fr_CA"', expectedResult: 'passed'},
  {name: 'locale', value: null, expectedResult: 'passed'},
  {name: 'locale', value: '"xyz"', expectedResult: 'failed'},
  {name: 'autoWebview', value: true, expectedResult: 'passed'},
  {name: 'autoWebview', value: null, expectedResult: 'passed'},
  {name: 'autoWebview', value: false, expectedResult: 'passed'},
  {name: 'noReset', value: true, expectedResult: 'passed'},
  {name: 'noReset', value: false, expectedResult: 'passed'},
  {name: 'noReset', value: null, expectedResult: 'passed'},
  {name: 'fullReset', value: true, expectedResult: 'passed'},
  {name: 'fullReset', value: false, expectedResult: 'passed'},
  {name: 'fullReset', value: null, expectedResult: 'passed'},
  {name: 'eventTimings', value: true, expectedResult: 'passed'},
  {name: 'eventTimings', value: false, expectedResult: 'passed'},
  {name: 'eventTimings', value: null, expectedResult: 'passed'},
  {name: 'enablePerformanceLogging', value: true, expectedResult: 'passed'},
  {name: 'enablePerformanceLogging', value: false, expectedResult: 'passed'},
  {name: 'enablePerformanceLogging', value: null, expectedResult: 'passed'},
  {name: 'printPageSourceOnFindFailure', value: true, expectedResult: 'passed'},
  {name: 'printPageSourceOnFindFailure', value: false, expectedResult: 'passed'},
  {name: 'printPageSourceOnFindFailure', value: null, expectedResult: 'passed'},
  {name: 'calendarFormat', value: '"gregorian"', expectedResult: 'passed'},
  {name: 'calendarFormat', value: '"abc"', expectedResult: 'passed'},
  {name: 'calendarFormat', value: null, expectedResult: 'passed'},
  // eslint-disable-next-line max-len
  {name: 'bundleId', value: '"com.example.apple-samplecode.UIKitCatalog"', expectedResult: 'passed'},
  {name: 'bundleId', value: '"abc"', expectedResult: 'failed'},
  {name: 'bundleId', value: null, expectedResult: 'passed'},
  {name: 'udid', value: null, expectedResult: 'passed'},
  {name: 'udid', value: '"ABC"', expectedResult: 'failed'},
  {name: 'launchTimeout', value: 20000, expectedResult: 'passed'},
  {name: 'locationServicesEnabled', value: true, expectedResult: 'passed'},
  {name: 'locationServicesEnabled', value: false, expectedResult: 'passed'},
  {name: 'locationServicesEnabled', value: null, expectedResult: 'passed'},
  {name: 'locationServicesAuthorized', value: true, expectedResult: 'passed'},
  {name: 'locationServicesAuthorized', value: false, expectedResult: 'passed'},
  {name: 'locationServicesAuthorized', value: null, expectedResult: 'passed'},
  {name: 'autoAcceptAlerts', value: true, expectedResult: 'passed'},
  {name: 'autoAcceptAlerts', value: false, expectedResult: 'passed'},
  {name: 'autoDismissAlerts', value: true, expectedResult: 'passed'},
  {name: 'autoDismissAlerts', value: false, expectedResult: 'passed'},
  {name: 'autoDismissAlerts', value: null, expectedResult: 'passed'},
  {name: 'nativeInstrumentsLib', value: true, expectedResult: 'passed'},
  {name: 'nativeInstrumentsLib', value: false, expectedResult: 'passed'},
  {name: 'nativeInstrumentsLib', value: null, expectedResult: 'passed'},
  {name: 'keepKeyChains', value: true, expectedResult: 'passed'},
  {name: 'keepKeyChains', value: false, expectedResult: 'passed'},
  {name: 'keepKeyChains', value: null, expectedResult: 'passed'},
  {name: 'interKeyDelay', value: 100, expectedResult: 'passed'},
  {name: 'interKeyDelay', value: '100', expectedResult: 'passed'},
  {name: 'showIOSLog', value: true, expectedResult: 'passed'},
  {name: 'showIOSLog', value: false, expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: '"oneByOne"', expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: '"grouped"', expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: '"setValue"', expectedResult: 'passed'},
  {name: 'screenshotWaitTimeout', value: 5, expectedResult: 'passed'},
  {name: 'screenshotWaitTimeout', value: 5.5, expectedResult: 'passed'},
  {name: 'waitForAppScript', value: '"true"', expectedResult: 'passed'},
  {name: 'waitForAppScript', value: '"true;"', expectedResult: 'passed'},
  {name: 'waitForAppScript', value: '"xyz"', expectedResult: 'passed'},
  {name: 'webviewConnectRetries', value: 12, expectedResult: 'passed'},
  {name: 'webviewConnectRetries', value: null, expectedResult: 'passed'},
  {name: 'appName', value: '"UICatalog"', expectedResult: 'passed'},
  {name: 'appName', value: 123, expectedResult: 'failed'},
  {name: 'enableAsyncExecuteFromHttps', value: true, expectedResult: 'passed'},
  {name: 'enableAsyncExecuteFromHttps', value: false, expectedResult: 'passed'},
  {name: 'reduceMotion', value: true, expectedResult: 'passed'},
  {name: 'reduceMotion', value: false, expectedResult: 'passed'},
  {name: 'reduceMotion', value: null, expectedResult: 'passed'}]

export const listOfMultipleiOSDesiredCaps = [
  // WebDriverAgent capabilities
  {
    description: 'XCUITest xcodeOrgId = JWL241K123',
    desiredCaps: {'automationName': 'XCUITest', 'xcodeOrgId': 'JWL241K123'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest xcodeSigningId = iPhone Developer',
    desiredCaps: {'automationName': 'XCUITest', 'xcodeSigningId': 'iPhone Developer'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest xcodeConfigFile = /path/to/myconfig.xcconfig',
    desiredCaps: {'automationName': 'XCUITest', 'xcodeConfigFile': '/path/to/myconfig.xcconfig'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest updatedWDABundleId = io.appium.WebDriverAgentRunner',
    // eslint-disable-next-line max-len
    desiredCaps: {'automationName': 'XCUITest', 'updatedWDABundleId': 'io.appium.WebDriverAgentRunner'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest keychainPath = /path/to/MyPrivateKey.p12',
    desiredCaps: {'automationName': 'XCUITest', 'keychainPath': '/path/to/MyPrivateKey.p12'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest keychainPassword = super awesome password',
    desiredCaps: {'automationName': 'XCUITest', 'keychainPassword': 'super awesome password'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest derivedDataPath = /path/t',
    desiredCaps: {'automationName': 'XCUITest', 'derivedDataPath': '/path/to'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest webDriverAgentUrl = http://localhost:8100',
    desiredCaps: {'automationName': 'XCUITest', 'webDriverAgentUrl': 'http://localhost:8100'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useNewWDA = true',
    desiredCaps: {'automationName': 'XCUITest', 'useNewWDA': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useNewWDA = false',
    desiredCaps: {'automationName': 'XCUITest', 'useNewWDA': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaLaunchTimeout = 30000',
    desiredCaps: {'automationName': 'XCUITest', 'wdaLaunchTimeout': 30000},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaConnectionTimeout = 1000',
    desiredCaps: {'automationName': 'XCUITest', 'wdaConnectionTimeout': 1000},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaStartupRetries = 4',
    desiredCaps: {'automationName': 'XCUITest', 'wdaStartupRetries': 4},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaStartupRetryInterval = 20000',
    desiredCaps: {'automationName': 'XCUITest', 'wdaStartupRetryInterval': 20000},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaLocalPort = 8100',
    desiredCaps: {'automationName': 'XCUITest', 'wdaLocalPort': 8100},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaBaseUrl = http://192.168.1.100',
    desiredCaps: {'automationName': 'XCUITest', 'wdaBaseUrl': 'http://192.168.1.100'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest showXcodeLog = true',
    desiredCaps: {'automationName': 'XCUITest', 'showXcodeLog': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest showXcodeLog = false',
    desiredCaps: {'automationName': 'XCUITest', 'showXcodeLog': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest iosInstallPause = 8000',
    desiredCaps: {'automationName': 'XCUITest', 'iosInstallPause': 8000},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest usePrebuiltWDA = true',
    desiredCaps: {'automationName': 'XCUITest', 'usePrebuiltWDA': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest usePrebuiltWDA = false',
    desiredCaps: {'automationName': 'XCUITest', 'usePrebuiltWDA': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useCarthageSsl = true',
    desiredCaps: {'automationName': 'XCUITest', 'useCarthageSsl': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useCarthageSsl = false',
    desiredCaps: {'automationName': 'XCUITest', 'useCarthageSsl': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest shouldUseSingletonTestManager = true',
    desiredCaps: {'automationName': 'XCUITest', 'shouldUseSingletonTestManager': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest shouldUseSingletonTestManager = false',
    desiredCaps: {'automationName': 'XCUITest', 'shouldUseSingletonTestManager': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useXctestrunFile = true',
    desiredCaps: {'automationName': 'XCUITest', 'useXctestrunFile': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useXctestrunFile = false',
    desiredCaps: {'automationName': 'XCUITest', 'useXctestrunFile': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useSimpleBuildTest = true',
    desiredCaps: {'automationName': 'XCUITest', 'useSimpleBuildTest': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useSimpleBuildTest = false',
    desiredCaps: {'automationName': 'XCUITest', 'useSimpleBuildTest': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest wdaEventloopIdleDelay = 5',
    desiredCaps: {'automationName': 'XCUITest', 'wdaEventloopIdleDelay': 5},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest processArguments = null',
    desiredCaps: {'automationName': 'XCUITest', 'processArguments': null},
    expectedResult: 'passed'
  },
  // General appium-xcuitest-driver capabilities
  {
    description: 'XCUITest resetOnSessionStartOnly = true',
    desiredCaps: {'automationName': 'XCUITest', 'resetOnSessionStartOnly': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest resetOnSessionStartOnly = false',
    desiredCaps: {'automationName': 'XCUITest', 'resetOnSessionStartOnly': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest commandTimeouts = 1200',
    desiredCaps: {'automationName': 'XCUITest', 'commandTimeouts': 1200},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest maxTypingFrequency = 5',
    desiredCaps: {'automationName': 'XCUITest', 'maxTypingFrequency': 5},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest simpleIsVisibleCheck = true',
    desiredCaps: {'automationName': 'XCUITest', 'simpleIsVisibleCheck': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest simpleIsVisibleCheck = false',
    desiredCaps: {'automationName': 'XCUITest', 'simpleIsVisibleCheck': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest startIWDP = true',
    desiredCaps: {'automationName': 'XCUITest', 'startIWDP': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest startIWDP = false',
    desiredCaps: {'automationName': 'XCUITest', 'startIWDP': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest webkitDebugProxyPort = 1200',
    desiredCaps: {'automationName': 'XCUITest', 'webkitDebugProxyPort': 1200},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest absoluteWebLocations = true',
    desiredCaps: {'automationName': 'XCUITest', 'absoluteWebLocations': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest absoluteWebLocations = false',
    desiredCaps: {'automationName': 'XCUITest', 'absoluteWebLocations': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useJSONSource = true',
    desiredCaps: {'automationName': 'XCUITest', 'useJSONSource': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest useJSONSource = false',
    desiredCaps: {'automationName': 'XCUITest', 'useJSONSource': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest realDeviceScreenshotter = idevicescreenshot',
    desiredCaps: {'automationName': 'XCUITest', 'realDeviceScreenshotter': 'idevicescreenshot'},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest mjpegServerPort = 1200',
    desiredCaps: {'automationName': 'XCUITest', 'mjpegServerPort': 1200},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest waitForQuiescence = true',
    desiredCaps: {'automationName': 'XCUITest', 'waitForQuiescence': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest waitForQuiescence = false',
    desiredCaps: {'automationName': 'XCUITest', 'waitForQuiescence': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest screenshotQuality = true',
    desiredCaps: {'automationName': 'XCUITest', 'screenshotQuality': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest screenshotQuality = false',
    desiredCaps: {'automationName': 'XCUITest', 'screenshotQuality': false},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest skipLogCapture = true',
    desiredCaps: {'automationName': 'XCUITest', 'skipLogCapture': true},
    expectedResult: 'passed'
  },
  {
    description: 'XCUITest skipLogCapture = false',
    desiredCaps: {'automationName': 'XCUITest', 'skipLogCapture': false},
    expectedResult: 'passed'
  },
  {
    description: 'set Permissions',
    desiredCaps: {'permissions': '{"com.apple.mobilecal": {"calendar": "YES"}}'},
    expectedResult: 'passed'
  }]

export const listOfSingleAndroidDesiredCaps = [
  {name: 'appActivity', value: '"io.appium.android.apis.ApiDemos"', expectedResult: 'passed'},
  {name: 'appActivity', value: '"io.appium.android."', expectedResult: 'failed'},
  {name: 'appActivity', value: null, expectedResult: 'passed'},
  {name: 'appWaitActivity', value: '"SplashActivity"', expectedResult: 'failed'},
  {name: 'appWaitActivity', value: null, expectedResult: 'passed'},
  {name: 'appWaitPackage', value: '"com.android.settings"', expectedResult: 'passed'},
  {name: 'appWaitPackage', value: '"ABC"', expectedResult: 'passed'},
  {name: 'appWaitPackage', value: null, expectedResult: 'passed'},
  {name: 'allowTestPackages', value: true, expectedResult: 'passed'},
  {name: 'allowTestPackages', value: false, expectedResult: 'passed'},
  {name: 'allowTestPackages', value: '"yes"', expectedResult: 'failed'},
  {name: 'androidInstallTimeout', value: 10, expectedResult: 'passed'},
  {name: 'androidInstallPath', value: '"/sdcard/Downloads/"', expectedResult: 'passed'},
  {name: 'androidInstallPath', value: '"/123/456/"', expectedResult: 'passed'},
  {name: 'androidInstallPath', value: null, expectedResult: 'passed'},
  {name: 'deviceOrientation', value: '"portrait"', expectedResult: 'passed'},
  {name: 'deviceOrientation', value: '"landscape"', expectedResult: 'passed'},
  {name: 'deviceOrientation', value: '"landpor"', expectedResult: 'failed'},
  {name: 'captureScreenshots', value: true, expectedResult: 'passed'},
  {name: 'captureScreenshots', value: false, expectedResult: 'passed'},
  {name: 'captureScreenshots', value: null, expectedResult: 'passed'},
  {name: 'newCommandTimeout', value: 60, expectedResult: 'passed'},
  {name: 'useKeystore', value: true, expectedResult: 'passed'},
  {name: 'useKeystore', value: false, expectedResult: 'passed'},
  {name: 'useKeystore', value: null, expectedResult: 'passed'},
  {name: 'deviceReadyTimeout', value: 5, expectedResult: 'passed'},
  {name: 'androidDeviceReadyTimeout', value: 30, expectedResult: 'passed'},
  {name: 'skipDeviceInitialization', value: true, expectedResult: 'passed'},
  {name: 'skipDeviceInitialization', value: false, expectedResult: 'passed'},
  {name: 'skipDeviceInitialization', value: null, expectedResult: 'passed'},
  {name: 'disableAndroidWatchers', value: true, expectedResult: 'passed'},
  {name: 'disableAndroidWatchers', value: false, expectedResult: 'passed'},
  {name: 'autoGrantPermissions', value: true, expectedResult: 'passed'},
  {name: 'autoGrantPermissions', value: false, expectedResult: 'passed'},
  {name: 'enablePerformanceLogging', value: true, expectedResult: 'passed'},
  {name: 'enablePerformanceLogging', value: false, expectedResult: 'passed'},
  {name: 'enablePerformanceLogging', value: null, expectedResult: 'passed'},
  {name: 'printPageSourceOnFindFailure', value: true, expectedResult: 'passed'},
  {name: 'printPageSourceOnFindFailure', value: false, expectedResult: 'passed'},
  {name: 'printPageSourceOnFindFailure', value: null, expectedResult: 'passed'},
  {name: 'autoGrantPermissions', value: null, expectedResult: 'passed'},
  {name: 'gpsEnabled', value: true, expectedResult: 'passed'},
  {name: 'gpsEnabled', value: false, expectedResult: 'passed'},
  {name: 'gpsEnabled', value: null, expectedResult: 'passed'},
  {name: 'isHeadless', value: true, expectedResult: 'passed'},
  {name: 'isHeadless', value: false, expectedResult: 'passed'},
  {name: 'isHeadless', value: null, expectedResult: 'passed'},
  {name: 'dontStopAppOnReset', value: true, expectedResult: 'passed'},
  {name: 'autoLaunch', value: true, expectedResult: 'passed'},
  {name: 'autoLaunch', value: false, expectedResult: 'failed'},
  {name: 'uninstallOtherPackages', value: '"*"', expectedResult: 'passed'},
  {name: 'automationName', value: '"Espresso"', expectedResult: 'passed'},
  {name: 'automationName', value: '"UIAutomator"', expectedResult: 'passed'},
  {name: 'automationName', value: '"Selendroid"', expectedResult: 'passed'},
  {name: 'automationName', value: '"YouIEngine"', expectedResult: 'passed'},
  {name: 'automationName', value: '"Appium"', expectedResult: 'passed'},
  {name: 'localeScript', value: '"Latn"', expectedResult: 'passed'}]

export const listOfMultipleAndroidDesiredCaps = [
  {
    description: 'appWaitDuration',
    desiredCaps: {'appWaitDuration': '1000', 'appWaitActivity': 'SplashActivity'},
    expectedResult: 'failed'
  },
  {
    description: 'UIAutomator2 otherApps',
    desiredCaps: {'automationName': 'UIAutomator2', 'otherApps': 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/hybrid-app-debug.apk'},
    expectedResult: 'passed'
  },
  {
    description: 'uiautomator2ServerLaunchTimeout = 1000',
    desiredCaps: {'automationName': 'UIAutomator2', 'otheuiautomator2ServerLaunchTimeoutrApps': '1000'}, // eslint-disable-line max-len
    expectedResult: 'passed'
  },
  {
    description: 'uiautomator2ServerLaunchTimeout = null',
    desiredCaps: {'automationName': 'UIAutomator2', 'otheuiautomator2ServerLaunchTimeoutrApps': null}, // eslint-disable-line max-len
    expectedResult: 'passed'
  },
  {
    description: 'uiautomator2ServerInstallTimeout = 1000',
    desiredCaps: {'automationName': 'UIAutomator2', 'uiautomator2ServerInstallTimeout': '1000'},
    expectedResult: 'passed'
  },
  {
    description: 'uiautomator2ServerInstallTimeout = null',
    desiredCaps: {'automationName': 'UIAutomator2', 'uiautomator2ServerInstallTimeout': null},
    expectedResult: 'passed'
  },
  {
    description: 'skipServerInstallation = true',
    desiredCaps: {'automationName': 'UIAutomator2', 'skipServerInstallation': true},
    expectedResult: 'passed'
  },
  {
    description: 'skipServerInstallation = 123',
    desiredCaps: {'automationName': 'UIAutomator2', 'skipServerInstallation': '123'},
    expectedResult: 'passed'
  }]
