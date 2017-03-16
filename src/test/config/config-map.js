export default {
  // Browser test
  'wdio.conf.js': './build/framework/config/mocha-conf.js',
  'wdio-mobile.conf.js': './build/test/config/mocha-delay.js',

  // Console test
  'test-1device-5sessions-15minutes.js': './build/framework/config/mocha-conf.js',
  'test-2devices-5sessions-15minutes.js': './build/framework/config/mocha-conf.js',
  'test-multiple-desired-caps.js': './build/test/config/mocha-delay.js',
  'test-jsonwired-api.js': './build/test/config/mocha-delay.js',
  'test-web-session-daily.js': './build/test/config/mocha-delay.js',
  'test-multiple-devices-parallel.js': './build/test/config/mocha-delay.js',
  'test-device-android-hybrid-app.js': './build/test/config/mocha-delay.js',
  'test-device-android-native-app.js': './build/test/config/mocha-delay.js',
  'test-device-ios-hybrid-app.js': './build/test/config/mocha-delay.js',
  'test-device-ios-native-app.js': './build/test/config/mocha-delay.js'
}