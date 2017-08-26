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
  .options('platform', {
    alias: 'devicePlatform',
    demand: false,
    default: null,
    describe: 'Specific device for mobile',
    type: 'string'
  })
  .options('name', {
    alias: 'deviceName',
    demand: false,
    default: null,
    describe: 'Specify device name to run test',
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
  .options('indexBegin', {
    alias: 'indexBegin',
    demand: false,
    default: -1,
    describe: 'index begin to get device in a sorted array device',
    type: 'number'
  })
  .options('indexFinish', {
    alias: 'indexFinish',
    demand: false,
    default: 1000,
    describe: 'index finish to get device in a sorted array device',
    type: 'number'
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
  .help()

export function help() {
  return yargs.showHelp()
}

export function parse() {
  return yargs.argv
}
