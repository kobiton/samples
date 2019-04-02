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

export const listOfSingleDesiredCaps = [
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
  {name: 'newCommandTimeout', value: '"Sixty"', expectedResult: 'passed'},
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
  {name: 'deviceReadyTimeout', value: '"five"', expectedResult: 'passed'},
  {name: 'androidDeviceReadyTimeout', value: 30, expectedResult: 'passed'},
  {name: 'androidDeviceReadyTimeout', value: '"thirty"', expectedResult: 'passed'},
  {name: 'avdLaunchTimeout', value: 30000, expectedResult: 'passed'},
  {name: 'avdLaunchTimeout', value: '"thirty thousand"', expectedResult: 'passed'},
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

export const listOfMultipleDesiredCaps = [
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
