import {assert} from 'chai'
import {gmail} from '../config'

describe('Scenario - Run tests with long timeout duration', () => {
  const GMAIL_URL = 'https://mail.google.com'
  let driver

  before(async () => {
    driver = await createDriver()
    await driver.deleteAllCookies()
  })

  after(async () => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should not accept empty email and invalid email', async () => {
    const getEmptyMsg = await driver
      .get(GMAIL_URL)
      .waitForElementById('next')
      .sleep(10000)
      .click()
      .sleep(10000)
      .waitForElementById('errormsg_0_Email')
      .sleep(10000)
      .text()
    assert.equal(getEmptyMsg, 'Please enter your email.')

    const getWrongAccountMsg = await driver
      .waitForElementById('Email')
      .sendKeys('invalid_email@where.about')
      .sleep(10000)
      .waitForElementById('next')
      .click()
      .sleep(10000)
      .waitForElementById('errormsg_0_Email')
      .text()
    assert.equal(getWrongAccountMsg, `Sorry, Google doesn\'t recognize that email.`)
  })

  it('should accept valid credential', async () => {
    const url = await driver
      .get(GMAIL_URL)
      .waitForElementById('Email')
      .sendKeys(gmail.email)
      .sleep(10000)
      .waitForElementById('next')
      .click()
      .sleep(10000)
      .waitForElementById('Passwd')
      .sendKeys(gmail.password)
      .waitForElementById('signIn')
      .click()
      .sleep(15000)
      .url()
    assert.include(url, 'https://mail.google.com')
  })
})
