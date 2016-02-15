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
    port: 4723
  }
}

exports.remote = {
  caps1: {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.4.4',
    deviceName: 'Galaxy Grand Prime'
  },
  caps2: {
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
