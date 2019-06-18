import faker from 'faker'

export const desiredCapabilities = {
  getPortrait: (cap) => ({...cap, deviceOrientation: 'portrait'}),
  getLandscape: (cap) => ({...cap, deviceOrientation: 'landscape'}),
  getNotCaptureScreenshots: (cap) => ({...cap, captureScreenshots: false}),
  getMixedOrSubstringDeviceName: (cap) => ({...cap, deviceName: cap.deviceName.slice(0, -3)}),
  getMixedOrSubstringPlatformVersion: (cap) => {
    return {...cap, platformVersion: cap.platformVersion.slice(0, -1)}
  },
  getSessionNameAndDescription: (cap) => {
    return {
      ...cap,
      sessionName: faker.random.words(20).slice(0, 80),
      sessionDescription: faker.random.words(100).slice(0, 500)
    }
  },
  getNewCommandTimeout: (cap) => ({...cap, newCommandTimeout: 60})
}

export const listOfSingleAndroidDesiredCaps = [
  {name: null, value: null, expectedResult: 'passed'},
  {name: 'udid', value: null, expectedResult: 'passed'},
  {name: 'udid', value: '"ABC"', expectedResult: 'failed'},
  {name: 'deviceOrientation', value: '"portrait"', expectedResult: 'passed'},
  {name: 'deviceOrientation', value: '"landscape"', expectedResult: 'passed'},
  {name: 'deviceOrientation', value: '"landpor"', expectedResult: 'failed'},
  {name: 'captureScreenshots', value: true, expectedResult: 'passed'},
  {name: 'captureScreenshots', value: false, expectedResult: 'passed'},
  {name: 'captureScreenshots', value: null, expectedResult: 'passed'},
  {name: 'newCommandTimeout', value: 60, expectedResult: 'passed'},
  {name: 'language', value: '"fr"', expectedResult: 'failed'},
  {name: 'autoWebview', value: true, expectedResult: 'failed'},
  {name: 'autoWebview', value: false, expectedResult: 'passed'},
  {name: 'autoWebview', value: null, expectedResult: 'passed'},
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
  {name: 'browserName', value: '"firefox"', expectedResult: 'failed'},
  {name: 'browserName', value: '"chromebeta"', expectedResult: 'failed'},
  {name: 'browserName', value: '"chrome"', expectedResult: 'passed'},
  {name: 'automationName', value: '"appium"', expectedResult: 'passed'},
  {name: 'automationName', value: '"APPIUM"', expectedResult: 'passed'},
  {name: 'automationName', value: '"ApPium"', expectedResult: 'passed'},
  {name: 'automationName', value: '"Appium"', expectedResult: 'passed'},
  {name: 'automationName', value: '"Espresso"', expectedResult: 'passed'},
  {name: 'automationName', value: '"UIAutomator"', expectedResult: 'passed'},
  {name: 'automationName', value: '"Selendroid"', expectedResult: 'passed'},
  {name: 'automationName', value: '"YouIEngine"', expectedResult: 'passed'},
  {name: 'deviceReadyTimeout', value: 5, expectedResult: 'passed'},
  {name: 'androidDeviceReadyTimeout', value: 30, expectedResult: 'passed'},
  {name: 'avdLaunchTimeout', value: 30000, expectedResult: 'passed'},
  {name: 'unicodeKeyboard', value: true, expectedResult: 'passed'},
  {name: 'unicodeKeyboard', value: false, expectedResult: 'passed'},
  {name: 'unicodeKeyboard', value: null, expectedResult: 'passed'},
  {name: 'resetKeyboard', value: true, expectedResult: 'passed'},
  {name: 'resetKeyboard', value: false, expectedResult: 'passed'},
  {name: 'resetKeyboard', value: null, expectedResult: 'passed'},
  {name: 'ignoreUnimportantViews', value: true, expectedResult: 'passed'},
  {name: 'ignoreUnimportantViews', value: false, expectedResult: 'passed'},
  {name: 'ignoreUnimportantViews', value: null, expectedResult: 'passed'},
  {name: 'disableAndroidWatchers', value: true, expectedResult: 'passed'},
  {name: 'disableAndroidWatchers', value: false, expectedResult: 'passed'},
  {name: 'disableAndroidWatchers', value: null, expectedResult: 'passed'},
  {name: 'autoGrantPermissions', value: true, expectedResult: 'passed'},
  {name: 'autoGrantPermissions', value: false, expectedResult: 'passed'},
  {name: 'autoGrantPermissions', value: null, expectedResult: 'passed'},
  {name: 'gpsEnabled', value: true, expectedResult: 'passed'},
  {name: 'gpsEnabled', value: false, expectedResult: 'passed'},
  {name: 'gpsEnabled', value: null, expectedResult: 'passed'},
  {name: 'isHeadless', value: true, expectedResult: 'passed'},
  {name: 'isHeadless', value: false, expectedResult: 'passed'},
  {name: 'isHeadless', value: null, expectedResult: 'passed'},
  {name: 'skipDeviceInitialization', value: true, expectedResult: 'passed'},
  {name: 'skipDeviceInitialization', value: false, expectedResult: 'passed'},
  {name: 'skipDeviceInitialization', value: null, expectedResult: 'passed'},
  {name: 'unlockType', value: '"pin"', expectedResult: 'passed'},
  {name: 'unlockType', value: '"password"', expectedResult: 'passed'},
  {name: 'unlockType', value: '"pattern"', expectedResult: 'passed'},
  {name: 'unlockType', value: '"fingerprint"', expectedResult: 'passed'},
  {name: 'unlockType', value: true, expectedResult: 'failed'}]

export const listOfMultipleAndroidDesiredCaps = [
  {
    description: 'UIAutomator2 with android < 5',
    desiredCaps: {'platformVersion': '4*', 'automationName': 'UIAutomator2', 'deviceName': '*'},
    expectedResult: 'failed'
  },
  {
    description: 'UIAutomator2 with android = 5',
    desiredCaps: {'platformVersion': '5*', 'automationName': 'UIAutomator2', 'deviceName': '*'},
    expectedResult: 'passed'
  },
  {
    description: 'resetKeyboard with unicodeKeyboard',
    desiredCaps: {'resetKeyboard': true, 'unicodeKeyboard': true},
    expectedResult: 'passed'
  }]

export const listOfiOSDesiredCaps = [
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
  {name: 'nativeWebTap', value: true, expectedResult: 'passed'},
  {name: 'nativeWebTap', value: false, expectedResult: 'passed'},
  {name: 'nativeWebTap', value: null, expectedResult: 'passed'},
  {name: 'safariInitialUrl', value: '"https://www.github.com"', expectedResult: 'passed'},
  {name: 'safariInitialUrl', value: null, expectedResult: 'passed'},
  {name: 'safariAllowPopups', value: true, expectedResult: 'passed'},
  {name: 'safariAllowPopups', value: false, expectedResult: 'passed'},
  {name: 'safariAllowPopups', value: null, expectedResult: 'passed'},
  {name: 'safariIgnoreFraudWarning', value: true, expectedResult: 'passed'},
  {name: 'safariIgnoreFraudWarning', value: false, expectedResult: 'passed'},
  {name: 'safariIgnoreFraudWarning', value: null, expectedResult: 'passed'},
  {name: 'safariOpenLinksInBackground', value: true, expectedResult: 'passed'},
  {name: 'safariOpenLinksInBackground', value: false, expectedResult: 'passed'},
  {name: 'safariOpenLinksInBackground', value: null, expectedResult: 'passed'},
  {name: 'keepKeyChains', value: true, expectedResult: 'passed'},
  {name: 'keepKeyChains', value: false, expectedResult: 'passed'},
  {name: 'keepKeyChains', value: null, expectedResult: 'passed'},
  {name: 'localizableStringsDir', value: null, expectedResult: 'passed'},
  {name: 'interKeyDelay', value: 100, expectedResult: 'passed'},
  {name: 'interKeyDelay', value: '100', expectedResult: 'passed'},
  {name: 'showIOSLog', value: true, expectedResult: 'passed'},
  {name: 'showIOSLog', value: false, expectedResult: 'passed'},
  {name: 'showIOSLog', value: null, expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: '"oneByOne"', expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: '"grouped"', expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: '"setValue"', expectedResult: 'passed'},
  {name: 'sendKeyStrategy', value: null, expectedResult: 'passed'},
  {name: 'screenshotWaitTimeout', value: 5, expectedResult: 'passed'},
  {name: 'screenshotWaitTimeout', value: 5.5, expectedResult: 'passed'},
  {name: 'webviewConnectRetries', value: 12, expectedResult: 'passed'},
  {name: 'webviewConnectRetries', value: null, expectedResult: 'passed'},
  {name: 'webkitResponseTimeout', value: 10000, expectedResult: 'passed'},
  {name: 'webkitResponseTimeout', value: null, expectedResult: 'passed'},
  {name: 'enableAsyncExecuteFromHttps', value: true, expectedResult: 'passed'},
  {name: 'enableAsyncExecuteFromHttps', value: false, expectedResult: 'passed'},
  {name: 'skipLogCapture', value: true, expectedResult: 'passed'},
  {name: 'skipLogCapture', value: false, expectedResult: 'passed'},
  {name: 'skipLogCapture', value: null, expectedResult: 'passed'},
  {name: 'webkitDebugProxyPort', value: 12021, expectedResult: 'passed'},
  {name: 'webkitDebugProxyPort', value: null, expectedResult: 'passed'},
  {name: 'nativeInstrumentsLib', value: true, expectedResult: 'passed'},
  {name: 'nativeInstrumentsLib', value: false, expectedResult: 'passed'},
  {name: 'nativeInstrumentsLib', value: null, expectedResult: 'passed'},

  // WebDriverAgent Desired Capabilities
  {name: 'xcodeOrgId', value: '"iPhone Developer"', expectedResult: 'passed'},
  {name: 'xcodeOrgId', value: null, expectedResult: 'passed'},
  {name: 'xcodeSigningId', value: '"iPhone Developer"', expectedResult: 'passed'},
  {name: 'xcodeSigningId', value: null, expectedResult: 'passed'},
  {name: 'xcodeConfigFile', value: '"iPhone Developer"', expectedResult: 'passed'},
  {name: 'xcodeConfigFile', value: null, expectedResult: 'passed'},
  // eslint-disable-next-line max-len
  {name: 'updatedWDABundleId', value: '"io.appium.WebDriverAgentRunner"', expectedResult: 'passed'},
  {name: 'updatedWDABundleId', value: null, expectedResult: 'passed'},
  {name: 'keychainPath', value: '"/path/to/MyPrivateKey.p12"', expectedResult: 'passed'},
  {name: 'keychainPath', value: null, expectedResult: 'passed'},
  {name: 'derivedDataPath', value: '"/path/to/MyData"', expectedResult: 'passed'},
  {name: 'derivedDataPath', value: null, expectedResult: 'passed'},
  {name: 'preventWDAAttachments', value: true, expectedResult: 'passed'},
  {name: 'preventWDAAttachments', value: false, expectedResult: 'passed'},
  {name: 'preventWDAAttachments', value: null, expectedResult: 'passed'},
  {name: 'webDriverAgentUrl', value: null, expectedResult: 'passed'},
  {name: 'webDriverAgentUrl', value: '"invalidate"', expectedResult: 'passed'},
  {name: 'useNewWDA', value: true, expectedResult: 'passed'},
  {name: 'useNewWDA', value: false, expectedResult: 'passed'},
  {name: 'useNewWDA', value: null, expectedResult: 'passed'},
  {name: 'wdaLaunchTimeout', value: 30000, expectedResult: 'passed'},
  {name: 'wdaLaunchTimeout', value: null, expectedResult: 'passed'},
  {name: 'wdaConnectionTimeout', value: 180000, expectedResult: 'passed'},
  {name: 'wdaConnectionTimeout', value: null, expectedResult: 'passed'},
  {name: 'resetOnSessionStartOnly', value: false, expectedResult: 'passed'},
  {name: 'resetOnSessionStartOnly', value: null, expectedResult: 'passed'},
  {name: 'resetOnSessionStartOnly', value: true, expectedResult: 'passed'},
  {name: 'commandTimeouts', value: 120000, expectedResult: 'passed'},
  {name: 'commandTimeouts', value: null, expectedResult: 'passed'},
  {name: 'commandTimeouts', value: '"120000"', expectedResult: 'passed'},
  {name: 'wdaStartupRetries', value: 2, expectedResult: 'passed'},
  {name: 'wdaStartupRetries', value: null, expectedResult: 'passed'},
  {name: 'wdaStartupRetryInterval', value: 20000, expectedResult: 'passed'},
  {name: 'wdaStartupRetryInterval', value: null, expectedResult: 'passed'},
  {name: 'connectHardwareKeyboard', value: true, expectedResult: 'passed'},
  {name: 'connectHardwareKeyboard', value: null, expectedResult: 'passed'},
  {name: 'connectHardwareKeyboard', value: false, expectedResult: 'passed'},
  {name: 'maxTypingFrequency', value: null, expectedResult: 'passed'},
  {name: 'maxTypingFrequency', value: 30, expectedResult: 'passed'},
  {name: 'simpleIsVisibleCheck', value: null, expectedResult: 'passed'},
  {name: 'simpleIsVisibleCheck', value: true, expectedResult: 'passed'},
  {name: 'simpleIsVisibleCheck', value: false, expectedResult: 'passed'},
  {name: 'useCarthageSsl', value: false, expectedResult: 'passed'},
  {name: 'useCarthageSsl', value: true, expectedResult: 'passed'},
  {name: 'useCarthageSsl', value: null, expectedResult: 'passed'},
  {name: 'shouldUseSingletonTestManager', value: false, expectedResult: 'passed'},
  {name: 'shouldUseSingletonTestManager', value: true, expectedResult: 'passed'},
  {name: 'shouldUseSingletonTestManager', value: null, expectedResult: 'passed'},
  {name: 'startIWDP', value: null, expectedResult: 'passed'},
  {name: 'startIWDP', value: true, expectedResult: 'passed'},
  {name: 'startIWDP', value: false, expectedResult: 'passed'},
  {name: 'startIWDP', value: '"1.0"', expectedResult: 'failed'},
  {name: 'calendarAccessAuthorized', value: true, expectedResult: 'passed'},
  {name: 'calendarAccessAuthorized', value: false, expectedResult: 'passed'},
  {name: 'calendarAccessAuthorized', value: null, expectedResult: 'passed'},
  {name: 'isHeadless', value: true, expectedResult: 'passed'},
  {name: 'isHeadless', value: false, expectedResult: 'passed'},
  {name: 'isHeadless', value: null, expectedResult: 'passed'},
  {name: 'webkitDebugProxyPort', value: 12021, expectedResult: 'passed'},
  {name: 'webkitDebugProxyPort', value: null, expectedResult: 'passed'},
  {name: 'useXctestrunFile', value: false, expectedResult: 'passed'},
  {name: 'useXctestrunFile', value: true, expectedResult: 'passed'},
  {name: 'useXctestrunFile', value: null, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: true, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: false, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: null, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: '"xyz"', expectedResult: 'failed'},
  {name: 'useJSONSource', value: true, expectedResult: 'passed'},
  {name: 'useJSONSource', value: false, expectedResult: 'passed'},
  {name: 'useJSONSource', value: null, expectedResult: 'passed'},
  {name: 'shutdownOtherSimulators', value: true, expectedResult: 'passed'},
  {name: 'shutdownOtherSimulators', value: false, expectedResult: 'passed'},
  {name: 'shutdownOtherSimulators', value: null, expectedResult: 'passed'},
  {name: 'keychainsExcludePatterns', value: true, expectedResult: 'false'},
  {name: 'keychainsExcludePatterns', value: false, expectedResult: 'false'},
  {name: 'keychainsExcludePatterns', value: null, expectedResult: 'passed'},
  {name: 'keychainsExcludePatterns', value: '"key"', expectedResult: 'passed'},
  {name: 'realDeviceScreenshotter', value: '"idevicescreenshot"', expectedResult: 'passed'},
  {name: 'realDeviceScreenshotter', value: null, expectedResult: 'passed'},
  {name: 'mjpegServerPort', value: 12000, expectedResult: 'passed'},
  {name: 'mjpegServerPort', value: null, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: false, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: true, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: null, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: '"null"', expectedResult: 'failed'},
  {name: 'reduceMotion', value: true, expectedResult: 'passed'},
  {name: 'reduceMotion', value: false, expectedResult: 'passed'},
  {name: 'reduceMotion', value: null, expectedResult: 'passed'},
  {name: 'permissions', value: null, expectedResult: 'passed'},
  {name: 'screenshotQuality', value: false, expectedResult: 'passed'},
  {name: 'screenshotQuality', value: true, expectedResult: 'passed'},
  {name: 'screenshotQuality', value: null, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: false, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: true, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: null, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: '"true"', expectedResult: 'failed'},
  {name: 'wdaEventloopIdleDelay', value: 5, expectedResult: 'passed'},
  {name: 'wdaEventloopIdleDelay', value: null, expectedResult: 'passed'},
  {name: 'showXcodeLog', value: true, expectedResult: 'passed'},
  {name: 'showXcodeLog', value: false, expectedResult: 'passed'},
  {name: 'showXcodeLog', value: null, expectedResult: 'passed'},
  {name: 'usePrebuiltWDA', value: false, expectedResult: 'passed'},
  {name: 'usePrebuiltWDA', value: true, expectedResult: 'passed'},
  {name: 'usePrebuiltWDA', value: null, expectedResult: 'passed'},
  {name: 'processArguments', value: null, expectedResult: 'passed'},
  {name: 'wdaLocalPort', value: 8100, expectedResult: 'passed'},
  {name: 'wdaLocalPort', value: null, expectedResult: 'passed'},
  {name: 'wdaLocalPort', value: '"8100"', expectedResult: 'passed'}
]

  /**
   * Note: Error iOS web capabilities:
   * startIWDP: true
   * useXctestrunFile: null
   * useXctestrunFile: false
   * useSimpleBuildTest: true
   */