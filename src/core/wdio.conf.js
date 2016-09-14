import 'babel-polyfill'
import moment from 'moment'
import {getConfig} from './config'

global._mocha = {}
const env = process.env.NODE_ENV || 'test'
global._mocha.env = env
const account = getConfig()
const reportFolder = `reports/portal/${env}/${moment().format('YYYY-MM-DD-HH-mm')}`

exports.config = {
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome'
  }],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: 'reports/screenshot',
  baseUrl: account.portalUrl,
  waitforTimeout: 30000,
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
