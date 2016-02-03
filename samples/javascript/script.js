const wd = require('wd')
const assert = require('chai').assert

const username = 'tester01'
const apikey = 'bfa52857-a0ee-4412-b634-e25fcdfaf6e8'

const serverConfig = {
  desiredCaps: {
    browserName: 'chrome',
    platformName: 'Android',
    deviceName: 'Galaxy Grand Prime'
  },
  serverLocal: {
    host: 'localhost',
    port: 4723
  },
  serverKobiton: {
    protocol: 'https',
    host: 'api-test.kobiton.com',
    port: 443,
    auth: `${username}:${apikey}`
  }
}

describe('Google Search', () => {
  it('should search Google', (cb) => {
    const browser = wd.promiseChainRemote(serverConfig.serverKobiton)

    browser
      .init(serverConfig.desiredCaps)
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys('KMS Technology')
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title().then((text) => {
          assert.include(text, 'KMS Technology')
      })
      .fin(() => browser.quit())
      .done(cb)
  })
})
