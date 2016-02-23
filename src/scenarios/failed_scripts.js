import {assert} from 'chai'

describe('Scenario - Run the failed tests', () => {
  const GMAIL_URL = 'https://mail.google.com'
  let driver

  beforeEach(async () => {
    driver = await createDriver()
  })

  afterEach(async () => {
    if (driver != null) {
      await driver.quit()
    }
  })

  it('should throw error after verifying message', async () => {
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

  it('should throw error after verifying title', async () => {
    const url = await driver
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys('Kobiton.com')
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title()
    assert.include(url, 'Wrong title')
  })

  it('should search Google sucessfully after two failed test cases', async () => {
    const url = await driver
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys('Kobiton.com')
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .url()
    assert.include(url, 'Kobiton.com')
  })
})
