import moment from 'moment'
import faker from 'faker'

const elements = {
  url: 'https://www.mailinator.com/manyauth/login.jsp',
  emailInput: '//input[@id="many_login_email"]',
  passwordInput: '//input[@id="many_login_password"]'
}

export default class DesiredCapsTestPage {
  constructor(browser, timeout, desiredCapabilities) {
    this._browser = browser
    this._timeout = timeout
    this._desiredCapabilities = desiredCapabilities
  }

  async executeTest(expectedDurationInSeconds) {
    let duration = 0
    const startedAt = moment.utc()
    
    try {
      await this._browser
        .init()

      if (this._desiredCapabilities.platformName === 'iOS') {
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

      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .waitForExist(elements.emailInput, this._timeout)
          .waitForVisible(elements.emailInput, this._timeout)
          .setValue(elements.emailInput, word)
          .setValue(elements.passwordInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'seconds')
      } while (duration < expectedDurationInSeconds)
    }
    catch (err) {
      return err.message
    }
    finally {
      await this._browser.end()
    }
    return null
  }

}
