import {assert} from 'chai'
import {gmail} from '../config'

describe('Scenario - Run the failed tests', () => {
  const GMAIL_URL = 'https://mail.google.com'
  let driver

  beforeEach(async () => {
    driver = await createDriver()
    await driver.deleteAllCookies()
  })

  afterEach(async () => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should not accept empty email and invalid email', async () => {
    const getEmptyMsg = await driver
      .get(GMAIL_URL)
      .waitForElementById('next')
      .sleep(1000)
      .click()
      .sleep(2000)
      .waitForElementById('errormsg_0_Email')
      .sleep(2000)
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
    assert.equal(getWrongAccountMsg, 'Wrong message')
  })

  it('should accept valid credential', async () => {
    const url = await driver
      .get(GMAIL_URL)
      .waitForElementById('Email')
      .sendKeys(gmail.email)
      .waitForElementById('next')
      .click()
      .sleep(2000)
      .waitForElementById('Passwd')
      .sendKeys(gmail.password)
      .waitForElementById('signIn')
      .click()
      .sleep(10000)
      .url()
    assert.include(url, 'https://wrong_url.com')
  })
})
