const yargs = require('yargs')
  .usage('npm test -- [options]')
  .options('i', {
    alias: 'input',
    demand: false,
    default: './build/',
    describe: 'Path to either folder or file of tests',
    type: 'string'
  })
  .options('r', {
    alias: 'reporter',
    demand: false,
    default: 'mochawesome',
    describe: 'Test reporters',
    type: 'string'
  })
  .options('tsLoopAmount', {
    alias: 'longTestSuiteIterationAmount',
    demand: false,
    default: 10,
    describe: 'test suite iteration amount',
    type: 'number'
  })
  .options('duration', {
    alias: 'mobileTestDuration',
    demand: false,
    default: 5,
    describe: 'Expected duration (hours)',
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
  .help()

export function help() {
  return yargs.showHelp()
}

export function parse() {
  return yargs.argv
}
