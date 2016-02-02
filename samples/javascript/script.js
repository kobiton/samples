describe('Simple test', () => {

  // TODO: rewrite not using async/await: use the style most testers would use

  it('should search Google', async () => {

    const wd = require('wd')
    const assert = require('chai').assert

    const driver = wd.promiseChainRemote({
      protocol: 'https',
      host: 'api-test.kobiton.com',
      port: 443,
      auth: 'kobiton:e1b66526-6719-44a7-bad9-b5709e3c050b'
    })

    await driver.init({
      browserName: 'browser',
      platformName: 'Android',
      platformVersion: '4.4.2',
      deviceName: 'Nexus 5 (KitKat)'
    })

    await driver
      .get('https://www.google.com')
      // TODO: search KMS Technology
      // TODO: click search button
      // TODO: get first link and assert its www.kms-technology.com

    await driver.quit()
  })
})
