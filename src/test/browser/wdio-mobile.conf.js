const base = require('../../framework/config/wdio-conf')

exports.config = {
  ...base.config,
  specs: [
    'build/test/browser/test-manual-one-device.js'
  ]
}
