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
    default: 'mocha-junit-reporter',
    describe: 'Test reporters',
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
    default: 2,
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
  .options('udid', {
    alias: 'deviceUDID',
    demand: false,
    default: null,
    describe: 'Specific device UUID to run test',
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
    default: 'all',
    describe: 'Group of mobile device',
    type: 'string'
  })
  .options('screenshots', {
    alias: 'captureScreenshots',
    demand: false,
    default: false,
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
  .help()

export function help() {
  return yargs.showHelp()
}

export function parse() {
  return yargs.argv
}
