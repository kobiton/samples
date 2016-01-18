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
      .sleep(15000)
      .click()
      .sleep(15000)
      .waitForElementById('errormsg_0_Email')
      .sleep(15000)
      .text()

    assert.equal(text, 'Please enter your email.')

    const title = await driver
      .title()

    assert.equal(title, 'Gmail')

    const getEmailAttribute = await driver
    .waitForElementById('Email')
    .sleep(15000)
    .clear()
    .sleep(15000)
    .getAttribute('class')
    .sleep(15000)
  })

  it('should not accept invalid email', async () => {
    const text = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sleep(15000)
      .sendKeys('invalid_email@where.about')
      .waitForElementById('next')
      .sleep(15000)
      .click()
      .sleep(15000)
      .waitForElementById('errormsg_0_Email')
      .text()
    assert.equal(text, `Sorry, Google doesn't recognize that email. Create an account using that address?`)
  })

  it('should accept valid credentials', async () => {
    const url = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sleep(15000)
      .sendKeys('krypton.portal')
      .waitForElementById('next')
      .click()
      .sleep(15000)
      .waitForElementById('Passwd')
      .sendKeys('Admin@123456789')
      .sleep(15000)
      .waitForElementById('signIn')
      .click()
      .sleep(15000)
      .url()
    assert.equal(true, url.includes('https://mail.google.com'))
  })
})
