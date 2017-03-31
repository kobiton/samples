import moment from 'moment'
import faker from 'faker'

const elements = {
  url: 'https://www.mailinator.com/login.jsp',
  emailInput: '//input[@id="loginEmail"]',
  passwordInput: '//input[@id="loginPassword"]'
}

export default class MailinatorPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      try {
        await this._browser
          .init()
      }
      catch (e) {
        throw new Error('Init browser failed.' + e.message)
      }
      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .url(elements.url)
          .waitForExist(elements.emailInput, this._timeout)
          .setValue(elements.emailInput, word)
          .waitForExist(elements.passwordInput, this._timeout)
          .setValue(elements.passwordInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      await this._browser.end()
    }
  }
}
