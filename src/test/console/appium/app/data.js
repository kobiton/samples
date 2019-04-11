export const listOfDesiredCaps = [
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
  {name: 'locale', value: '"fr_CA', expectedResult: 'passed'},
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
  {name: 'launchTimeout', value: 'Three thousand', expectedResult: 'passed'},
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
  {name: 'webDriverAgentUrl', value: 'jfjfjf', expectedResult: 'passed'},
  {name: 'useNewWDA', value: true, expectedResult: 'passed'},
  {name: 'useNewWDA', value: false, expectedResult: 'passed'},
  {name: 'useNewWDA', value: null, expectedResult: 'passed'},
  {name: 'wdaLaunchTimeout', value: 30000, expectedResult: 'passed'},
  {name: 'wdaLaunchTimeout', value: null, expectedResult: 'passed'},
  {name: 'wdaConnectionTimeout', value: 180000, expectedResult: 'passed'},
  {name: 'wdaConnectionTimeout', value: null, expectedResult: 'passed'},
  {name: 'wdaStartupRetries', value: 2, expectedResult: 'passed'},
  {name: 'wdaStartupRetries', value: null, expectedResult: 'passed'},
  {name: 'wdaStartupRetries', value: '"Three"', expectedResult: 'failed'},
  {name: 'wdaStartupRetryInterval', value: 20000, expectedResult: 'passed'},
  {name: 'wdaStartupRetryInterval', value: null, expectedResult: 'passed'},
  {name: 'wdaStartupRetryInterval', value: '"ten"', expectedResult: 'failed'},
  {name: 'wdaLocalPort', value: 8100, expectedResult: 'passed'},
  {name: 'wdaLocalPort', value: null, expectedResult: 'passed'},
  {name: 'wdaLocalPort', value: '"8100"', expectedResult: 'passed'},
  {name: 'showXcodeLog', value: true, expectedResult: 'passed'},
  {name: 'showXcodeLog', value: false, expectedResult: 'passed'},
  {name: 'showXcodeLog', value: null, expectedResult: 'passed'},
  {name: 'iosInstallPause', value: 8000, expectedResult: 'passed'},
  {name: 'iosInstallPause', value: '"8000"', expectedResult: 'failed'},
  {name: 'iosInstallPause', value: null, expectedResult: 'passed'},
  {name: 'usePrebuiltWDA', value: false, expectedResult: 'passed'},
  {name: 'usePrebuiltWDA', value: true, expectedResult: 'passed'},
  {name: 'usePrebuiltWDA', value: null, expectedResult: 'passed'},
  {name: 'useCarthageSsl', value: false, expectedResult: 'passed'},
  {name: 'useCarthageSsl', value: true, expectedResult: 'passed'},
  {name: 'useCarthageSsl', value: null, expectedResult: 'passed'},
  {name: 'shouldUseSingletonTestManager', value: false, expectedResult: 'passed'},
  {name: 'shouldUseSingletonTestManager', value: true, expectedResult: 'passed'},
  {name: 'shouldUseSingletonTestManager', value: null, expectedResult: 'passed'},
  {name: 'useXctestrunFile', value: false, expectedResult: 'passed'},
  {name: 'useXctestrunFile', value: true, expectedResult: 'passed'},
  {name: 'useXctestrunFile', value: null, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: false, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: true, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: null, expectedResult: 'passed'},
  {name: 'useSimpleBuildTest', value: '"true"', expectedResult: 'failed'},
  {name: 'wdaEventloopIdleDelay', value: 5, expectedResult: 'passed'},
  {name: 'wdaEventloopIdleDelay', value: 'five', expectedResult: 'failed'},
  {name: 'wdaEventloopIdleDelay', value: null, expectedResult: 'passed'},
  {name: 'processArguments', value: null, expectedResult: 'passed'},
  // eslint-disable-next-line max-len
  {name: 'processArguments', value: '{args : ["a"], env : {a:b, c:d}}', expectedResult: 'failed'},
  // General appium-xcuitest-driver capabilities
  {name: 'resetOnSessionStartOnly', value: false, expectedResult: 'passed'},
  {name: 'resetOnSessionStartOnly', value: null, expectedResult: 'passed'},
  {name: 'resetOnSessionStartOnly', value: true, expectedResult: 'passed'},
  {name: 'commandTimeouts', value: 120000, expectedResult: 'passed'},
  {name: 'commandTimeouts', value: null, expectedResult: 'passed'},
  {name: 'commandTimeouts', value: '"120000"', expectedResult: 'passed'},
  {name: 'maxTypingFrequency', value: null, expectedResult: 'passed'},
  {name: 'maxTypingFrequency', value: 30, expectedResult: 'passed'},
  {name: 'simpleIsVisibleCheck', value: null, expectedResult: 'passed'},
  {name: 'simpleIsVisibleCheck', value: true, expectedResult: 'passed'},
  {name: 'simpleIsVisibleCheck', value: false, expectedResult: 'passed'},
  {name: 'startIWDP', value: null, expectedResult: 'passed'},
  {name: 'startIWDP', value: true, expectedResult: 'passed'},
  {name: 'startIWDP', value: false, expectedResult: 'passed'},
  {name: 'startIWDP', value: '"1.0"', expectedResult: 'failed'},
  {name: 'webkitDebugProxyPort', value: 12021, expectedResult: 'passed'},
  {name: 'webkitDebugProxyPort', value: null, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: true, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: false, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: null, expectedResult: 'passed'},
  {name: 'absoluteWebLocations', value: '"xyz"', expectedResult: 'failed'},
  {name: 'useJSONSource', value: true, expectedResult: 'passed'},
  {name: 'useJSONSource', value: false, expectedResult: 'passed'},
  {name: 'useJSONSource', value: null, expectedResult: 'passed'},
  {name: 'realDeviceScreenshotter', value: 'idevicescreenshot', expectedResult: 'passed'},
  {name: 'realDeviceScreenshotter', value: null, expectedResult: 'passed'},
  {name: 'mjpegServerPort', value: 12000, expectedResult: 'passed'},
  {name: 'mjpegServerPort', value: null, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: false, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: true, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: null, expectedResult: 'passed'},
  {name: 'waitForQuiescence', value: '"null"', expectedResult: 'failed'},
  {name: 'screenshotQuality', value: false, expectedResult: 'passed'},
  {name: 'screenshotQuality', value: true, expectedResult: 'passed'},
  {name: 'screenshotQuality', value: null, expectedResult: 'passed'},
  {name: 'skipLogCapture', value: true, expectedResult: 'passed'},
  {name: 'skipLogCapture', value: false, expectedResult: 'passed'},
  {name: 'skipLogCapture', value: null, expectedResult: 'passed'}]

  /**
   * Note: Error capabilities:
   * startIWDP: true
   * useSimpleBuildTest: true
   * useXctestrunFile: null
   * useXctestrunFile: false
   */
