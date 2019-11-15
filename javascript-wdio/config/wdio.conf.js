exports.config = {
  user: process.env.KOBITON_USERNAME_1,
  key: process.env.KOBITON_API_KEY,
  runner: 'local',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
},
  sync: false,
  logLevel: 'silent',
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
  beforeTest: () => {
    const chai = require('chai');
    const chaiWebdriver = require('chai-webdriverio').default;
    chai.use(chaiWebdriver(browser));
    global.assert = chai.assert;
  }
};
