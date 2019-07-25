import faker from 'faker'
import {debug} from '@kobiton/core-util'
import config from '../../config/test'

const elements = {
  url: 'https://www.mailinator.com/manyauth/login.jsp',
  emailInput: '//input[@id="many_login_email"]',
  passwordInput: '//input[@id="many_login_password"]'
}

export default class DesiredCapsTestPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest() {
    try {
      let sessionInfo
      const word = faker.lorem.word()

      sessionInfo = await this._browser.getSession()
      debug.log(`${config.portalUrl}/sessions/${sessionInfo.kobitonSessionId}`)

      // https://w3c.github.io/webdriver/#dfn-set-timeouts
      // https://webdriver.io/docs/api/webdriver.html#settimeouts
      await this._browser.setTimeouts(this._timeout)

      await this._browser.url(elements.url)
      await this._browser.getUrl()

      const emailInput = await this._browser.$(elements.emailInput)
      await emailInput.waitForExist(this._timeout)
      await emailInput.waitForDisplayed(this._timeout)
      await emailInput.waitForEnabled(this._timeout)
      await emailInput.clearValue()
      await emailInput.setValue(word)

      const passwordInput = await this._browser.$(elements.passwordInput)
      await passwordInput.clearValue()
      await passwordInput.setValue(word)

      await this._browser.deleteSession()
    }
    catch (err) {
      debug.log('DesiredCapsTestPage:executeTest', err.message)
      this._browser && await await this._browser.deleteSession()
      return err.message
    }
    return null
  }

}
