
const _config = {
  portalUrl: _removeSlash(process.env.KOBITON_PORTAL_URL || 'https://portal-test.kobiton.com/') + '/',
  apiUrl: _removeSlash(process.env.KOBITON_API_URL || 'https://api-test.kobiton.com/') + '/',
  appOSXUrl: process.env.KOBITON_DESKTOP_APP_URL || 'https://s3.amazonaws.com/kobiton/nightly/kobiton-osx-test.dmg',
  hubHostName: process.env.KOBITON_HUB_HOSTNAME || 'api-test.kobiton.com',
  emailOrUsername: process.env.KOBITON_USERNAME_1 || 'api_test4',
  password: process.env.KOBITON_PASSWORD_1 || 'mario8x@123',
  emailOrUsername2: process.env.KOBITON_USERNAME_2 || 'tester',
  password2: process.env.KOBITON_PASSWORD_2 || '123456',
  hubPort: process.env.KOBITON_HUB_PORT || 80,
  runDurationLoop: process.env.RUN_LONG_DURATION_LOOP || 10,
  shortRunLoop: process.env.RUN_SHORT_DURATION_LOOP || 1000,
  expectedDurationInHours: process.env.EXPECTED_DURATION_IN_HOURS || 5, // hours
  filterDevice: process.env.KOBITON_CAP_DEVICE_NAME,
  deviceUDID: process.env.KOBITON_DEVICE_UDID,
  deviceGroup: process.env.KOBITON_DEVICE_GROUP || 'all'
}
export function getConfig() {
  return _config
}

function _removeSlash(text) {
  return text.replace(/\/$/, '')
}
