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
    default: 2,
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
  .options('deviceName', {
    alias: 'deviceName',
    demand: false,
    default: null,
    describe: 'Specify device name to run test',
    type: 'string'
  })
  .options('deviceUDID', {
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
  .options('captureScreenshots', {
    alias: 'captureScreenshots',
    demand: false,
    default: false,
    describe: 'capture screenshot of device',
    type: 'boolean'
  })
  .options('deviceNumbers', {
    alias: 'deviceNumbers',
    demand: false,
    default: 1,
    describe: 'number of mobile devices',
    type: 'number'
  })
  .options('screenQuality', {
    alias: 'screenQuality',
    demand: false,
    default: 'Medium',
    describe: 'Screen quality of manual test',
    type: 'string'
  })
  .options('maxBrowserInstances', {
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
