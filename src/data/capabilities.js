exports.capabilities = {
  existingcap: {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '6.0.1',
    deviceName: 'Nexus 5'
  },
  nonexistingcap: {
    browserName: 'chrome',
    platformName: 'Android',
    platformVersion: '4.4.4',
    deviceName: 'Galaxy Grand Prime123'
  },
  server: {
    protocol: 'http',
    host: 'new-api-test.kobiton.com',
    port: 80,
    auth: 'quangxnguyen:8575b8cd-c6ec-4808-a9b3-171f56f33721'
  }
}
