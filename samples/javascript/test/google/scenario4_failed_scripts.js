import {assert} from 'chai'
var account = require('../helpers/config')

describe('Scenario - Run the failed tests', () => {
  const GMAIL_URL = 'https://mail.google.com'
  let driver

  before(async() => {
    driver = await createDriver()
    await driver.deleteAllCookies()
  })

  after(async() => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should not accept empty email and invalid email', async() => {
    const getEmptyMsg = await driver
      .get(GMAIL_URL)
      .waitForElementById('next')
      .sleep(1000)
      .click()
      .sleep(1000)
      .waitForElementById('errormsg_0_Email')
      .sleep(1000)
      .text()
    assert.equal(getEmptyMsg, 'Please enter your email.')

    const getWrongAccountMsg = await driver
      .waitForElementById('Email')
      .sendKeys('invalid_email@where.about')
      .waitForElementById('next')
      .click()
      .sleep(1000)
      .waitForElementById('errormsg_0_Email')
      .text()
    assert.equal(getWrongAccountMsg, `Sorry, Google doesn't recognize that email. Create an account using that address?`)
  })

  it('should accept valid credential', async() => {
    const url = await driver
      .get(GMAIL_URL)
      .waitForElementById('Email')
      .sendKeys(account.gmailAccount1.gmail)
      .waitForElementById('next')
      .click()
      .sleep(2000)
      .waitForElementById('Passwd')
      .sendKeys(account.gmailAccount1.password)
      .waitForElementById('signIn')
      .click()
      .sleep(10000)
      .url()
    assert.include(url, 'https://wrong_url.com')
  })
})
