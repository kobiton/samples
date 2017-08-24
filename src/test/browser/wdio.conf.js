import base from '../../framework/config/wdio-conf'

import config from '../../framework/config/test'

exports.config = {
  ...base.config,
  maxInstances: config.manual.maxBrowserInstances,
  seleniumArgs: {
    drivers: {
      chrome: {
        version: 2.28,
        baseURL: 'https://chromedriver.storage.googleapis.com'
      }
    }
  },
  seleniumInstallArgs: {
    drivers: {
      chrome: {
        version: 2.28,
        baseURL: 'https://chromedriver.storage.googleapis.com'
      }
    }
  },
  logLevel: 'error',
  specs: [
    'build/test/browser/manual/test-manual.js',
    'build/test/browser/settings/test-*.js']
}

