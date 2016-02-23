import {assert} from 'chai'
let data = require('../data/search_google')

describe('Scenario - Google Search', () => {
  let driver

  beforeEach(async() => {
    driver = await createDriver()
  })

  afterEach(async() => {
    if (driver != null) {
      await driver.quit()
      .sleep(5000)
    }
  })

  it('should search Google with short duration', async() => {
    for (let search of data.shortData) {
      let getMsg = await driver // eslint-disable-line babel/no-await-in-loop
        .get('https://www.google.com')
        .waitForElementByName('q').sendKeys(search)
        .waitForElementByName('btnG').click()
        .sleep(3000)
        .title()
      assert.include(getMsg, search)
    }
  })

  it('should search Google with long duration', async() => {
    for (let search of data.longData) {
      let getMsg = await driver // eslint-disable-line babel/no-await-in-loop
        .get('https://www.google.com')
        .waitForElementByName('q').sendKeys(search)
        .waitForElementByName('btnG').click()
        .sleep(3000)
        .title()
      assert.include(getMsg, search)
    }
  })
})
