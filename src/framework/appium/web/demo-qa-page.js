import moment from 'moment'
import faker from 'faker'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'http://demoqa.com/contact/',
  nameInput: '//input[@name="your-name"]',
  emailInput: '//input[@name="your-email"]',
  subjectInput: '//input[@name="your-subject"]',
  messageInput: '//textarea[@name="your-message"]'
}

export default class DemoQAPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
    this._desiredCapabilities = desiredCapabilities
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
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
      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .waitForExist(elements.nameInput, this._timeout)
          .setValue(elements.nameInput, word)
          .waitForExist(elements.emailInput, this._timeout)
          .setValue(elements.emailInput, word)
          .waitForExist(elements.subjectInput, this._timeout)
          .setValue(elements.subjectInput, word)
          .waitForExist(elements.messageInput, this._timeout)
          .setValue(elements.messageInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.end()
    }
  }
}
