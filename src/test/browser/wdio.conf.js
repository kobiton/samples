import config from '../../framework/config/test'

const base = require('../../framework/config/wdio-conf')
const fileTest = config.typeOfTest ? `${config.typeOfTest}` : 'test-*'
const chromeDriver = {
  chrome: {
    version: 2.33,
    baseURL: 'https://chromedriver.storage.googleapis.com'
  }
}
const firefoxDriver = {
  firefox: {
    version: '0.19.1',
    baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
  }
}
let driver

if (config.browser.browserName === 'chrome') {
  driver = chromeDriver
}
else {
  driver = firefoxDriver
}

exports.config = {
  ...base.config,
  maxInstances: config.browser.maxBrowserInstances,
  seleniumArgs: {
    drivers: driver
  },
  seleniumInstallArgs: {
    drivers: driver
  },
  logLevel: 'error',
  specs: [`build/test/browser/**/${fileTest}.js`]
}
