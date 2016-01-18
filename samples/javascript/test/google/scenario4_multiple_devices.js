import {assert} from 'chai'

describe('Google Login', () => {
  const GOOGLE_URL = 'https://mail.google.com'
  let driver
  let driver2

  before(async () => {
    driver = await global.createDriver()
    await driver.deleteAllCookies()
    driver2 = await global.createDriver2()
    await driver2.deleteAllCookies()
  })

  after(async () => {
    if(driver!=null){
      await driver.quit()
    }
    if(driver2!=null){
      await driver2.quit()
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
        const text = await driver2
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
