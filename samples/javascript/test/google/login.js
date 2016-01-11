import {assert} from 'chai'

describe('Google Login', () => {
  const GOOGLE_URL = 'https://mail.google.com'
  let driver

  before(async () => {
    driver = await global.createDriver()
    await driver.deleteAllCookies()
  })

  after(async () => {
    if(driver!=null)
    await driver.quit()
  })

  it('should not accept empty email', async () => {
    const text = await driver
      .get(GOOGLE_URL)
      .waitForElementById('next')
      .click()
      .sleep(1000)
      .waitForElementById('errormsg_0_Email')
      .text()

    assert.equal(text, 'Please enter your email.')
  })

  it('should not accept invalid email', async () => {
    const text = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sendKeys('invalid_email@where.about')
      .waitForElementById('next')
      .click()
      .sleep(1000)
      .waitForElementById('errormsg_0_Email')
      .text()

    assert.equal(text,
      `Sorry, Google doesn't recognize that email. Create an account using that address?`)
  })

  it('should accept valid credentials', async () => {
    const url = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sendKeys('krypton.portal')
      .waitForElementById('next')
      .click()
      .waitForElementById('Passwd')
      .sendKeys('Admin@123456789')
      .waitForElementById('signIn')
      .click()
      .sleep(5000)
      .url()

    assert.equal(url, 'https://myaccount.google.com/?pli=1')
  })
})
