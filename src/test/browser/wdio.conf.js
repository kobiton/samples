import config from '../../framework/config/test'

const base = require('../../framework/config/wdio-conf')
const fileTest = config.typeOfTest ? `${config.typeOfTest}` : 'test-*'
const chromeDriver = {
  chrome: {
    version: 2.36,
    baseURL: 'https://chromedriver.storage.googleapis.com'
  }
}
const firefoxDriver = {
  firefox: {
    version: '0.19.1',
    baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
  }
}
const safariDriver = {
  safari: {
    version: '2.48',
    baseURL: 'https://selenium-release.storage.googleapis.com'
  }
}
let driver
  
if (config.browser.browserName === 'safari') {
  driver = safariDriver
}
else if (config.browser.browserName === 'firefox') {
  driver = firefoxDriver
}
else {
  driver = chromeDriver
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
