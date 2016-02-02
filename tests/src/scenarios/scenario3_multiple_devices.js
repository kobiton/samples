import {assert} from 'chai'
import {gmail} from '../config'


///
///
///
/// NOTE to Khanh: this test is wrong. It uses 2 different drivers connecting
/// to 2 different servers. That's unrealistic: won't happen. Either connect
/// to local or remote server, but not both.
/// What this test should do is connect to the same server with different caps
/// so that it can test both devices at the same time.
///
///
///
///
describe('Scenario - Run multiple tests on multiple devices with the same account', function() {
  const GMAIL_URL = 'https://mail.google.com'
  let driver1
  let driver2

  before(async() => {
    driver1 = await createDriver()
    await driver1.deleteAllCookies()
    driver2 = await createDriver1()
    await driver2.deleteAllCookies()
  })

  after(async() => {
    if (driver1 != null) {
      await driver1.quit()
    }
    if (driver2 != null) {
      await driver2.quit()
    }
  })

  it('should not accept empty and invalid email', async() => {
      await * [
        (async() => {
          const text = await driver1
            .get(GMAIL_URL)
            .waitForElementById('next')
            .sleep(2000)
            .click()
            .sleep(2000)
            .waitForElementById('errormsg_0_Email')
            .sleep(2000)
            .text()
          assert.equal(text, 'Please enter your email.')
        })(), (async() => {
          const text = await driver2
            .get(GMAIL_URL)
            .waitForElementById('Email')
            .sendKeys('invalid_email@where.about')
            .waitForElementById('next')
            .click()
            .sleep(2000)
            .waitForElementById('errormsg_0_Email')
            .text()
          assert.equal(text, `Sorry, Google doesn\'t recognize that email.`)
        })()
      ]
    }
  )
})
