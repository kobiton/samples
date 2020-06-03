exports.config = {
  user: process.env.KOBITON_USERNAME,
  key: process.env.KOBITON_API_KEY,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000
    },
  sync: false,
  logLevel: 'silent',
  specs: [
    './test/**/*.js'
  ],  
  capabilities: [{
    sessionName:        'Android web test',
    sessionDescription: 'This is an example for Android web',
    deviceOrientation:  'portrait',
    captureScreenshots: true,
    browserName:        'chrome',
    deviceGroup:        'KOBITON',
    deviceName:         '*',
    platformVersion:    '*',
    platformName:       'Android'
  }],
  deprecationWarnings: true,
  bail: 0,
  baseUrl: 'https://portal.kobiton.com',
  hostname: 'api.kobiton.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  reporters: ['spec'],
  port: 443,
  maxInstances: 1,
}
