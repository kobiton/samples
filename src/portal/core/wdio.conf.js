import 'babel-polyfill'
import moment from 'moment'
import {getAccount} from '../../core/user-info'

global._mocha = {}
const env = process.env.NODE_ENV || 'test'
global._mocha.env = env
const account = getAccount()
const reportFolder = `reports/portal/${env}/${moment().format('YYYY-MM-DD-HH-mm')}`

exports.config = {
  specs: [
    'build/portal/test-*-page.js',
    'build/portal/responsive/test-*-page.js'
  ],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome'
    }
  ],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: reportFolder,
  baseUrl: account.portalUrl,
  waitforTimeout: 15000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['dot', 'json'],
  mochaOpts: {
    ui: 'bdd',
    timeout: moment.duration(6, 'hours').as('milliseconds')
  },
  reporterOptions: {
    compilers: ['js:babel-core/register'],
    outputDir: reportFolder
  }
}
