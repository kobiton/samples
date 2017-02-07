import config from '../../../framework/config/test'

const base = require('../../../framework/config/wdio-conf')
exports.config = {
  ...base.config,
  maxInstances: config.manual.maxBrowserInstances,
  logLevel: 'error',
  specs: ['build/test/browser/manual/test-manual.js']
}
