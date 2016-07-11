const appUrl = 'https://s3.amazonaws.com/kobiton/nightly/'
const accountLocal = {
  portalUrl: 'http://localhost:3000/',
  apiUrl: 'http://localhost:3000/',
  appOSXUrl: `${appUrl}kobiton-osx-test.dmg`,
  appWin32Url: `${appUrl}kobiton-win32-test.exe`,
  appWin64Url: `${appUrl}kobiton-win64-test.exe`,
  hubUrl: 'localhost:3000',
  emailOrUsername: 'tester',
  password: '123456'
}
const accountTest = {
  portalUrl: 'https://portal-test.kobiton.com',
  apiUrl: 'https://api-test.kobiton.com/',
  appOSXUrl: `${appUrl}kobiton-osx-test.dmg`,
  appWin32Url: `${appUrl}kobiton-win32-test.exe`,
  appWin64Url: `${appUrl}kobiton-win64-test.exe`,
  hubUrl: 'api-test.kobiton.com',
  emailOrUsername: 'api_test4',
  password: 'mario8x@123'
}
const accountStaging = {
  portalUrl: 'https://portal-staging.kobiton.com',
  apiUrl: 'https://api-staging.kobiton.com/',
  appOSXUrl: `${appUrl}kobiton-osx-staging.dmg`,
  appWin32Url: `${appUrl}kobiton-win32-staging.exe`,
  appWin64Url: `${appUrl}kobiton-win64-staging.exe`,
  hubUrl: 'api-staging.kobiton.com',
  emailOrUsername: 'staging_test1',
  password: 'mario8x@123'
}
const accountProduction = {
  portalUrl: 'https://portal.kobiton.com',
  apiUrl: 'https://api.kobiton.com/',
  appOSXUrl: `${appUrl}kobiton-osx.dmg`,
  appWin32Url: `${appUrl}kobiton-win32.exe`,
  appWin64Url: `${appUrl}kobiton-win64.exe`,
  hubUrl: 'api.kobiton.com',
  emailOrUsername: 'production_test1',
  password: 'mario8x@123'
}

export function getAccount() {
  switch (global._mocha.env) {
    case 'staging':
      return accountStaging
    case 'production':
      return accountProduction
    case 'test':
      return accountTest
    default :
      return accountLocal
  }
}
