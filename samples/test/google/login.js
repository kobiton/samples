import {assert} from 'chai'

describe('Google Login', () => {
  const GOOGLE_URL = 'https://accounts.google.com/ServiceLogin?sacu=1&amp;scc=1&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;hl=en&amp;service=mail#identifier'
  let driver

  before(async () => {
    driver = await global.createDriver()
    await driver.deleteAllCookies()
  })

  after(async () => {
    await driver.quit()
  })

  it('should not accept empty email', async () => {
    const text = await driver
      .get(GOOGLE_URL)
      .waitForElementByName('signIn', 5000)
      .click()
      .waitForElementById('errormsg_0_Email', 5000)
      .text()

    assert.equal(text, 'Please enter your email.')
  })

  it('should not accept invalid email', async () => {
    const text = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email', 5000)
      .sendKeys('invalid_email@where.about')
      .waitForElementByName('signIn', 5000)
      .click()
      .waitForElementById('errormsg_0_Email', 5000)
      .text()

    assert.equal(text, `Sorry, Google doesn't recognize that email. Create an account using that address?`)
  })

  it('should accept valid credentials', async () => {
    const url = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email', 5000)
      .sendKeys('krypton.portal')
      .waitForElementByName('signIn', 5000)
      .click()
      .waitForElementById('Passwd', 5000)
      .sendKeys('Admin@123456')
      .waitForElementById('signIn', 5000)
      .click()
      .url()

    assert.equal(url, 'https://myaccount.google.com/?pli=1')
  })
})
