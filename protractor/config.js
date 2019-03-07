const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const {androidWebCapability, iOSWebCapability} = require('./capability')

const suite = process.argv[3].slice(8)
let capability

if (suite === 'androidWeb'){
  capability = androidWebCapability
} else if (suite === 'iOSWeb'){
  capability = iOSWebCapability
}

exports.config = {
  framework: 'jasmine',
  seleniumAddress: `https://${username}:${apiKey}@api.kobiton.com/wd/hub`,
  suites: {
    androidWeb: 'android_web_test.js',
    iOSWeb :'ios_web_test.js'
  },
  capabilities: capability,
  jasmineNodeOpts: {defaultTimeoutInterval: 200000},
  allScriptsTimeout: 200000,
  onPrepare: function() {
    browser.resetUrl = 'about:blank'
  }
}
