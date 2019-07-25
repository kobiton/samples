import moment from 'moment'
import faker from 'faker'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'http://newtours.demoaut.com/mercuryregister.php',
  addressInput: '//input[@name="address1"]'
}

export default class NewTourPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      let sessionInfo
      let kobitonSessionId
      
      sessionInfo = await this._browser.getSession()
      kobitonSessionId = sessionInfo.kobitonSessionId
      debug.log(`${config.portalUrl}/sessions/${kobitonSessionId}`)

      // https://w3c.github.io/webdriver/#dfn-set-timeouts
      // https://webdriver.io/docs/api/webdriver.html#settimeouts
      await this._browser.setTimeouts(this._timeout)

      await this._browser.url(elements.url)
      await this._browser.getUrl()
      
      do {
        const word = faker.lorem.word()

        const addressInput = await this._browser.$(elements.addressInput)
        await addressInput.waitForExist(this._timeout)
        await addressInput.waitForDisplayed(this._timeout)
        await addressInput.waitForEnabled(this._timeout)
        await addressInput.clearValue()
        await addressInput.setValue(word)

        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._browser && await this._browser.deleteSession()
    }
  }
}
