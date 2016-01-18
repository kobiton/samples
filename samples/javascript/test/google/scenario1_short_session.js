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
      .sleep(1000)
      .click()
      .sleep(1000)
      .waitForElementById('errormsg_0_Email')
      .sleep(1000)
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
    assert.equal(text, `Sorry, Google doesn't recognize that email. Create an account using that address?`)
  })

  it('should accept valid credentials', async () => {
    const url = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sendKeys('krypton.portal')
      .waitForElementById('next')
      .click()
      .sleep(2000)
      .waitForElementById('Passwd')
      .sendKeys('Admin@1234567')
      .waitForElementById('signIn')
      .click()
      .sleep(10000)
      .url()
    assert.equal(true, url.includes('https://mail.google.com'))
  })
})
