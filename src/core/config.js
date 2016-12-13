import jsonfile from 'jsonfile'

const _config = {
  portalUrl: _removeSlash(process.env.KOBITON_PORTAL_URL || 'https://portal-test.kobiton.com'),
  apiUrl: _removeSlash(process.env.KOBITON_API_URL || 'https://api-test.kobiton.com/') + '/',
  appOSXUrl: process.env.KOBITON_DESKTOP_APP_URL || 'https://s3.amazonaws.com/kobiton/nightly/kobiton-osx-test.dmg',
  hub: {
    host: process.env.KOBITON_HUB_HOSTNAME || 'api-test.kobiton.com',
    port: process.env.KOBITON_HUB_PORT || 80
  },
  emailOrUsername: process.env.KOBITON_USERNAME_1 || 'api_test4',
  password: process.env.KOBITON_PASSWORD_1 || 'mario8x@123',
  emailOrUsername2: process.env.KOBITON_USERNAME_2 || 'tester',
  password2: process.env.KOBITON_PASSWORD_2 || '123456',
  runDurationLoop: process.env.RUN_LONG_DURATION_LOOP || 20,
  shortRunLoop: process.env.RUN_SHORT_DURATION_LOOP || 1000,
  expectedDurationInMinutes: process.env.EXPECTED_DURATION_IN_MINUTES || 20, // minutes
  filterDevice: process.env.KOBITON_CAP_DEVICE_NAME,
  deviceOrientation: process.env.KOBITON_DEVICE_ORIENTATION || 'portrait',
  deviceUDID: process.env.KOBITON_DEVICE_UDID,
  deviceGroup: process.env.KOBITON_DEVICE_GROUP || 'all',
  // Num of browsers will be run, each of browser is a device
  numOfManualDevices: process.env.KOBITON_DEVICES_NUMBER || 1,
  // Num of browser instances which initilized each of run
  maxBrowserInstances: process.env.KOBITON_MAX_BROWSER_INSTANCES || 10
}

export function getConfig() {
  const fileConfig = process.env.KOBITON_CONFIG_FILE
  const configuration = fileConfig ? jsonfile.readFileSync(fileConfig) : _config
  return configuration
}

function _removeSlash(text) {
  return text.replace(/\/$/, '')
}
