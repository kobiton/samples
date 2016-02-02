exports.gmail = {
  email: '<email>',
  password: '<password>'
}

exports.local = {
  caps: {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.4.4',
    deviceName: 'Galaxy Grand Prime'
  },
  server: {
    host: 'localhost',
    port: 3000,
    auth: `<username>:<apikey>`
  }
}

exports.remote = {
  caps: {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.1.2',
    deviceName: 'Galaxy Win'
  },
  server: {
    protocol: 'https',
    host: 'api-test.kobiton.com',
    port: 443,
    auth: `<username>:<apikey>`
  }
}
