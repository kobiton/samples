import {assert} from 'chai'

describe('Google Login', () => {
  const GOOGLE_URL = 'https://mail.google.com'
  let driver
  let driver3

  before(async () => {
    driver = await global.createDriver()
    await driver.deleteAllCookies()
    driver3 = await global.createDriver3()
    await driver3.deleteAllCookies()
  })

  after(async () => {
    if(driver!=null){
      await driver.quit()
    }
    if(driver3!=null){
      await driver3.quit()
    }
  })

  it('should not accept invalid email', async () => {
    await* [
      (async () => {
        const text = await driver
          .get(GOOGLE_URL)
          .waitForElementById('next')
          .sleep(10000)
          .click()
          .sleep(10000)
          .waitForElementById('errormsg_0_Email')
          .sleep(10000)
          .text()

        assert.equal(text, 'Please enter your email.')
      })(),
      (async () => {
        const text = await driver3
        .get(GOOGLE_URL)
        .waitForElementById('Email')
        .sendKeys('invalid_email@where.about')
        .waitForElementById('next')
        .click()
        .sleep(20000)
        .waitForElementById('errormsg_0_Email')
        .text()
        assert.equal(text, `Sorry, Google doesn't recognize that email. Create an account using that address?`)
      })()
    ]
  }

)
})
