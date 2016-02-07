describe('Google Search', function() {
  it('should search Google', function(cb) {
    const wd = require('wd')
    const assert = require('chai').assert

    const serverConfig = {
      host: 'api-test.kobiton.com',
      auth: 'kobiton:3ff04ea4-3b72-4aaa-906f-68a443181c5b',
      port: 80
    }

    const desiredCaps = {
      deviceName: 'Nexus 6P',
      browserName: 'chrome',
      platformName: 'Android',
      platformVersion: '6.0.1'
    }

    const browser = wd.promiseChainRemote(serverConfig)
    browser
      .init(desiredCaps)
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys('Kobiton.com')
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title().then(function(text) { assert.include(text, 'Kobiton.com') })
      .fin(function() { browser.quit() })
      .sleep(3000)
      .done(cb)
  })
})
