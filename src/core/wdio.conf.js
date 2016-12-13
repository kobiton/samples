import 'babel-polyfill'
import moment from 'moment'
import {getConfig} from './config'

global._mocha = {}
const env = process.env.NODE_ENV || 'test'
global._mocha.env = env
const config = getConfig()
const reportFolder = `reports/portal/${env}/${moment().format('YYYY-MM-DD-HH-mm')}`

exports.config = {
  // The maximum of browsers could display each of time to run test
  maxInstances: config.maxBrowserInstances,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome'
  }],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: 'reports/screenshot',
  baseUrl: config.portalUrl,
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['dot', 'junit', 'json'],
  mochaOpts: {
    ui: 'bdd',
    timeout: moment.duration(6, 'hours').as('milliseconds')
  },
  reporterOptions: {
    compilers: ['js:babel-core/register'],
    outputDir: reportFolder
  }
}
