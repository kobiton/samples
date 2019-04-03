const yargs = require('yargs')
  .usage('npm test -- [options]')
  .options('t', {
    alias: 'task',
    demand: false,
    default: null,
    describe: 'Name of the task to be executed',
    type: 'string'
  })
  .options('i', {
    alias: 'input',
    demand: false,
    default: '/build',
    describe: 'Path to either folder or file of tests',
    type: 'string'
  })
  .options('r', {
    alias: 'reporter',
    demand: false,
    default: null,
    describe: 'Test reporters',
    type: 'string'
  })
  .options('type', {
    alias: 'typeOfTest',
    demand: false,
    default: null,
    describe: 'type of testing',
    type: 'string'
  })
  .options('tsLoopAmount', {
    alias: 'longTestSuiteIterationAmount',
    demand: false,
    default: 1,
    describe: 'test suite iteration amount',
    type: 'number'
  })
  .options('duration', {
    alias: 'mobileTestDuration',
    demand: false,
    default: 1,
    describe: 'Expected duration (minutes)',
    type: 'number'
  })
  .options('platformName', {
    alias: 'platformName',
    demand: false,
    default: null,
    describe: 'Specific name of platform',
    type: 'string'
  })
  .options('platformVersion', {
    alias: 'devicePlatformVersion',
    demand: false,
    default: null,
    describe: 'Specific version platform of device',
    type: 'string'
  })
  .options('name', {
    alias: 'deviceName',
    demand: false,
    default: null,
    describe: 'Specify name of device to run test',
    type: 'string'
  })
  .options('orientation', {
    alias: 'deviceOrientation',
    demand: false,
    default: 'portrait',
    describe: 'Orientation of mobile device',
    type: 'string'
  })
  .options('group', {
    alias: 'deviceGroup',
    demand: false,
    default: 'cloud',
    describe: 'Group of mobile device',
    type: 'string'
  })
  .options('screenshots', {
    alias: 'captureScreenshots',
    demand: false,
    default: true,
    describe: 'capture screenshot of device',
    type: 'boolean'
  })
  .options('numbers', {
    alias: 'deviceNumbers',
    demand: false,
    default: 1000, // default is get all online devices of group
    describe: 'number of mobile devices',
    type: 'number'
  })
  .options('arrayUDID', {
    alias: 'arrayUDID',
    demand: false,
    default: null,
    describe: 'Array UDID of specific devices to test',
    type: 'string'
  })
  .options('quality', {
    alias: 'screenQuality',
    demand: false,
    default: 'Medium',
    describe: 'Screen quality of manual test',
    type: 'string'
  })
  .options('maxBrowser', {
    alias: 'maxBrowserInstances',
    demand: false,
    default: 1,
    describe: 'max of browser instances',
    type: 'number'
  })
  .options('numberOfBrowser', {
    alias: 'numberOfBrowser',
    demand: false,
    default: 1,
    describe: 'number of browser you want to open',
    type: 'number'
  })
  .options('browserName', {
    alias: 'browserName',
    demand: false,
    default: 'chrome',
    describe: 'Name of browser you want to launch',
    type: 'string'
  })
  .options('maxDevices', {
    alias: 'maxDevices',
    demand: false,
    default: 1,
    describe: 'Total devices that you want to launch',
    type: 'number'
  })
  .options('logs', {
    alias: 'pushLogs',
    demand: false,
    default: false,
    describe: 'whether we push logs to server',
    type: 'boolean'
  })
  .options('busyDeviceRetryInterval', {
    alias: 'onDeviceBusyRetryInterval',
    demand: false,
    default: 600,
    describe: 'interval in seconds',
    type: 'number'
  })
  .options('busyDeviceRetry', {
    alias: 'onBusyDeviceRetryTimes',
    demand: false,
    default: 3,
    describe: 'interval in seconds',
    type: 'number'
  })
  .options('concurrentDevices', {
    alias: 'healthCheckConcurrentDevices',
    demand: false,
    default: 1,
    describe: 'Max concurrent device at a time',
    type: 'number'
  })
  .options('automationName', {
    alias: 'automationName',
    demand: false,
    default: 'Appium',
    describe: 'the automation name to launch automaton session',
    type: 'string'
  })
  .options('onlineDeviceOnly', {
    alias: 'onlineDeviceOnly',
    demand: false,
    default: true,
    describe: 'flag to get device is online or not',
    type: 'boolean'
  })
  .help()

export function help() {
  return yargs.showHelp()
}

export function parse() {
  return yargs.argv
}
