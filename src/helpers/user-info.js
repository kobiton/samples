const accountLocal = {
  portalUrl: 'http://localhost:3000/',
  apiUrl: 'http://localhost:3000/',
  hubUrl: 'localhost:3000',
  emailOrUsername: 'tester',
  password: '123456'
}
const accountTest = {
  portalUrl: 'https://portal-test.kobiton.com',
  apiUrl: 'https://api-test.kobiton.com/',
  hubUrl: 'api-test.kobiton.com',
  emailOrUsername: 'api_test1',
  password: 'mario8x@123'
}
const accountStaging = {
  portalUrl: 'https://portal-staging.kobiton.com',
  apiUrl: 'https://api-staging.kobiton.com/',
  hubUrl: 'api-staging.kobiton.com',
  emailOrUsername: 'staging_test1',
  password: 'mario8x@123'
}
const accountProduction = {
  portalUrl: 'https://portal.kobiton.com',
  apiUrl: 'https://api.kobiton.com/',
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
