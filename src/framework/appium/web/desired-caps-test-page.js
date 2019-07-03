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
      await this._browser.init()
      const sessionInfo = await this._browser.session()
      debug.log(`${config.portalUrl}/sessions/${sessionInfo.value.kobitonSessionId}`)

      if (sessionInfo.value.platform === 'iOS') {
        await this._browser.timeouts({'type': 'page load', 'ms': this._timeout})
        await this._browser.timeouts({'type': 'implicit', 'ms': this._timeout})
      }
      else {
        await this._browser.timeouts({
          'pageLoad': this._timeout,
          'implicit': this._timeout
        })
      }

      await this._browser
        .url(elements.url)
        .getUrl()

      const word = faker.lorem.word()
      await this._browser // eslint-disable-line babel/no-await-in-loop
        .waitForExist(elements.emailInput, this._timeout)
        .waitForVisible(elements.emailInput, this._timeout)
        .setValue(elements.emailInput, word)
        .setValue(elements.passwordInput, word)
        .end()
    }
    catch (err) {
      debug.log('DesiredCapsTestPage:executeTest', err.message)
      this._driver && await this._browser.end()
      return err.message
    }
    finally {
      return new Error('Have an error during running the test session')
    }
    return null
  }

}
