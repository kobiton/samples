
const _account = {
  portalUrl: process.env.KOBITON_PORTAL_URL || 'https://portal-test.kobiton.com', // We don't need to handle slash for this case
  apiUrl: _removeSlash(process.env.KOBITON_API_URL || 'https://api-test.kobiton.com/') + '/',
  appOSXUrl: process.env.KOBITON_DESKTOP_APP_URL || 'https://s3.amazonaws.com/kobiton/nightly/kobiton-osx-test.dmg',
  hubHostName: process.env.KOBITON_HUB_HOSTNAME || 'api-test.kobiton.com',
  emailOrUsername: process.env.USERNAME_1 || 'api_test4',
  password: process.env.PASSWORD_1 || 'mario8x@123',
  emailOrUsername2: process.env.USERNAME_2 || 'tester',
  password2: process.env.PASSWORD_2 || '123456',
  hubPort: process.env.HUB_PORT || 80
}
export function getAccount() {
  return _account
}

function _removeSlash(text) {
  return text.replace(/\/$/, '')
}
