import config from '../../framework/config/test'

let base = require('../../framework/config/wdio-conf')
const fileTest = config.typeOfTest ? `${config.typeOfTest}` : 'test-*'
base.config.maxInstances = ''
base.config.capabilities = {}
exports.config = {
  ...base.config,
  logLevel: 'verbose',
  specs: [`build/test/desktop/**/${fileTest}.js`]
}
