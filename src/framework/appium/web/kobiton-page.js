import moment from 'moment'
import faker from 'faker'

const elements = {
  url: 'https://portal-test.kobiton.com/login',
  emailOrUsernameTextInput: 'input[name="emailOrUsername"]'
}

export default class WdioKobitonPageTest {
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
          .waitForExist(elements.emailOrUsernameTextInput, this._timeout)
          .setValue(elements.emailOrUsernameTextInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    catch (err) {
      throw new Error(`duration: ${duration} - ${JSON.stringify(err)}`)
    }
    finally {
      await this._browser.end()
    }
  }
}
