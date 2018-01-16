import moment from 'moment'
import faker from 'faker'

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
      await this._browser
        .init()
        .url(elements.url)
      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .waitForExist(elements.emailInput, this._timeout)
          .setValue(elements.emailInput, word)
          .waitForExist(elements.passwordInput, this._timeout)
          .setValue(elements.passwordInput, word)
          .waitForExist(elements.rememberMeCheckbox, this._timeout)
          .click(elements.rememberMeCheckbox)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      await this._browser.end()
    }
  }
}