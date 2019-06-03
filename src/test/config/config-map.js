export default {
  // Browser test
  'wdio.conf.js': './build/framework/config/mocha-conf.js',
  'wdio-mobile.conf.js': './build/test/config/mocha-delay.js',

  // Console test
  'test-1device-5sessions-15minutes.js': './build/framework/config/mocha-conf.js',
  'test-2devices-5sessions-15minutes.js': './build/framework/config/mocha-conf.js',
  'test-multiple-desired-caps.js': './build/test/config/mocha-delay.js',
  'test-jsonwired-api.js': './build/test/config/mocha-delay.js',
  'test-jsonwired-api-localhost.js': './build/test/config/mocha-delay.js',
  'test-web-session-daily.js': './build/test/config/mocha-delay.js',
  'test-multiple-devices-parallel.js': './build/test/config/mocha-delay.js',
  'test-android-web-desired-caps.js': './build/test/config/mocha-delay.js',
  'test-ios-web-desired-caps.js': './build/test/config/mocha-delay.js',
  'test-android-app-desired-caps.js': './build/test/config/mocha-delay.js',
  'test-ios-app-desired-caps.js': './build/test/config/mocha-delay.js',
  'test-web-with-chromebeta.js': './build/test/config/mocha-delay.js',
  'test-app.js': './build/test/config/mocha-delay.js',
  'test-app-localhost.js': './build/test/config/mocha-delay.js'
}
