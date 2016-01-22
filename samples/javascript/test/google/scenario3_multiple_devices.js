import {assert} from 'chai'

var account = require('../helpers/config')
const GMAIL_URL = 'https://mail.google.com'

describe('Scenario - Run multiple tests on multiple devices with the same account', function() {
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
            assert.equal(text, `Sorry, Google doesn't recognize that email. Create an account using that address?`)
          })()
        ]
      }
    )
})
