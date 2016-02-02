describe('Simple test', () => {
  it('should search Google', (cb) => {
    const wd = require('wd')
    const assert = require('chai').assert

    const username = 'kobiton'
    const apikey = 'e1b66526-6719-44a7-bad9-b5709e3c050b'
    const desiredCaps = {
      browserName: 'chrome',
      platformName: 'Android',
      platformVersion: '4.4.2',
      deviceName: 'Nexus 5 (KitKat)'
    }
    const browser = wd.promiseChainRemote(`https://${username}:${apikey}@api-test.kobiton.com`)

    browser
      .init(desiredCaps)
      .then(() => browser.get('https://www.google.com'))
      // TODO: search KMS Technology, assert first link is www.kms-technology.com
      .fin(() => browser.quit())
      .done(cb)
  })
})
