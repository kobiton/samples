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
    protocol: 'http',
    host: 'api-test.kobiton.com',
    port: 80,
     auth: '<username>:<apikey>'
  }
}
