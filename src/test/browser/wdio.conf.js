import base from '../../framework/config/wdio-conf'

exports.config = {
  ...base.config,
  specs: [
    'build/test/browser/test-*.js'
  ]
}
