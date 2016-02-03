describe('Google Search', () => {
  it('should search Google', (cb) => {
    const wd = require('wd')
    const assert = require('chai').assert

    const serverConfig = {
      protocol: 'https',
      host: 'api-test.kobiton.com',
      port: 443,
      auth: `'tester01':bfa52857-a0ee-4412-b634-e25fcdfaf6e8`
    }
    const desiredCaps = {
      deviceName: 'Nexus 6',
      browserName: 'chrome',
      platformName: 'Android',
      platformVersion: '4.4.2'
    }

    const browser = wd.promiseChainRemote(serverConfig)
    browser
      .init(desiredCaps)
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys('KMS Technology')
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title().then((text) => assert.include(text, 'KMS Technology'))
      .fin(() => browser.quit())
      .done(cb)
  })
})
