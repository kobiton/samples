const base = require('../../framework/core/wdio.conf')

exports.config = {
  ...base.config,
  specs: [
    'build/test/browser/test-*.js'
  ]
}
