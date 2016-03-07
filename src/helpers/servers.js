exports.local = {
  host: 'localhost',
  port: 4723
}
exports.remote_test = {
  protocol: 'http',
  host: 'api-test.kobiton.com',
  auth: 'ktest3:951ae0da-4b8f-454d-b6bc-15a293626b76',
  port: 80
}
exports.remote_staging = {
  protocol: 'http',
  host: 'api-staging.kobiton.com',
  auth: 'ktest2:8cde8879-9643-494a-8e79-007be03c7dd0',
  port: 80
}
exports.remote_production = {
  protocol: 'http',
  host: 'api.kobiton.com',
  port: 80,
  auth: 'ktest1:794699db-2a0c-4f4b-b70d-f4ef48457502'
}
exports.saucelab = {
  host: 'ondemand.saucelabs.com',
  auth: 'khanhdo:38183591-ffbe-434f-abef-f97dd0aa8e22',
  port: 80
}
let env_remote = 'test'
exports.init = (env) => {
  env_remote
}
exports.remote = () => {
  let remote
  switch (env_remote) {
    case 'local':
      remote = exports.local
      break;
    case 'staging':
      remote = exports.remote_staging
      break;
    case 'production':
      remote = exports.remote_production
      break;
    case 'saucelab' :
      remote = exports.saucelab
      break;
    default :
      remote = exports.remote_test
  }
  return remote;
}
