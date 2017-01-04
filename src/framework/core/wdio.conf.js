import 'babel-polyfill'
import config from './config'
import createMochaConfig from './mocha-conf'
import moment from 'moment'

const reportFolder = `reports/browser/${moment().format('YYYY-MM-DD-HH-mm')}`

let mochaOptions = createMochaConfig()
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
  baseUrl: config.portalUrl,
  waitforTimeout: moment.duration(30, 'seconds').seconds(),
  connectionRetryTimeout: moment.duration(90, 'seconds').seconds(),
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['dot', 'junit', 'json'],
  mochaOpts: mochaOptions,
  reporterOptions: {
    compilers: ['js:babel-core/register'],
    outputDir: reportFolder
  }
}
