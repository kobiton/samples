import config from '../../framework/config/test'

const base = require('../../framework/config/wdio.conf.desktop')
const fileTest = config.typeOfTest ? `${config.typeOfTest}` : 'test-*'
exports.config = {
  ...base.config,
  logLevel: 'verbose',
  specs: [`build/test/desktop/**/${fileTest}.js`]
}
