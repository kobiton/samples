import config from '../../framework/config/test'

const base = require('../../framework/config/wdio-conf')
const fileTest = config.typeOfTest ? `${config.typeOfTest}` : 'test-*'
exports.config = {
  ...base.config,
  maxInstances: config.browser.maxBrowserInstances,
  seleniumArgs: {
    drivers: {
      chrome: {
        version: 2.33,
        baseURL: 'https://chromedriver.storage.googleapis.com'
      }
    }
  },
  seleniumInstallArgs: {
    drivers: {
      chrome: {
        version: 2.33,
        baseURL: 'https://chromedriver.storage.googleapis.com'
      }
    }
  },
  logLevel: 'error',
  specs: [`build/test/browser/**/${fileTest}.js`]
}
