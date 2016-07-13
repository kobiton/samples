import {debug} from '@kobiton/core-util'

const base = require('../../core/wdio.conf')

exports.config = {...base.config, specs: [
  'build/portal/functionality/test-*-page.js',
  'build/portal/responsive/test-*-page.js'
]
}

debug.log('wdio.conf:portal', exports.config)
