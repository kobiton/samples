import moment from 'moment'
import faker from 'faker'
import {debug} from '@kobiton/core-util'
import config from '../../config/test'

const elements = {
  url: 'https://the-internet.herokuapp.com/login',
  usernameInput: '//input[@name="username"]',
  passwordInput: '//input[@name="password"]',
  loginButton: '//form[@name="login"]'
}

export default class HerokuPage {
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
      debug.log(`${config.portalUrl}/sessions/${sessionInfo.kobitonSessionId}`)
      
      // https://w3c.github.io/webdriver/#dfn-set-timeouts
      // https://webdriver.io/docs/api/webdriver.html#settimeouts
      await this._browser.setTimeouts(this._timeout)

      do {
        const word = faker.lorem.word()
        await this._browser.url(elements.url)
        await this._browser.getUrl()

        const usernameInput = await this._browser.$(elements.usernameInput)
        await usernameInput.waitForExist(this._timeout)
        await usernameInput.clearValue()
        await usernameInput.setValue(word)

        const passwordInput = await this._browser.$(elements.usernameInput)
        await passwordInput.waitForExist(this._timeout)
        await passwordInput.clearValue()
        await passwordInput.setValue(word)

        await this._browser.$(elements.loginButton).click()
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.deleteSession()
    }
  }
}
