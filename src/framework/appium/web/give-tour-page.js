import moment from 'moment'
import faker from 'faker'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'http://givetour.com/Account/Login',
  emailInput: '//input[@name="UserName"]',
  passwordInput: '//input[@name="Password"]',
  rememberMeCheckbox: '//input[@name="rememberme"]'
}

export default class GiveTourPage {
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

        const emailInput = await this._browser.$(elements.emailInput)
        await emailInput.waitForExist(this._timeout)
        await emailInput.waitForDisplayed(this._timeout)
        await emailInput.waitForEnabled(this._timeout)
        await emailInput.clearValue()
        await emailInput.setValue(word)

        const passwordInput = await this._browser.$(elements.passwordInput)
        await passwordInput.clearValue()
        await passwordInput.setValue(word)

        const rememberMeCheckbox = await this._browser.$(elements.rememberMeCheckbox)
        await rememberMeCheckbox.click()
        await passwordInput.setValue(word)

        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.deleteSession()
    }
  }
}
