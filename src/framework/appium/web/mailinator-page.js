import moment from 'moment'
import faker from 'faker'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'https://www.mailinator.com/login.jsp',
  emailInput: '//input[@type="text" and contains(@id,"email")]',
  passwordInput: '//input[@type="password" and contains(@id,"password")]',
  errorMessage1: '//div[contains(.,"ERR_INTERNET_DISCONNECTED")]',
  errorMessage2: '//div[contains(.,"ERR_TIMED_OUT")]',
  erorrMessage3: '//div[contains(.,"not connected to the Internet")]',
  errorMessage4: '//div[contains(.,"HTTP Status 403")]'
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
      await this._browser
        .init()
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
    catch (err) {
      debug.error('auto_web', err)

      const isNetworkErr = this._isBrowserContainAny([
        elements.errorMessage1,
        elements.errorMessage2,
        elements.errorMessage3,
        elements.errorMessage4
      ])

      if (isNetworkErr) {
        throw new Error('There is an issue network on this device')
      }
      else {
        throw err
      }
    }
    finally {
      await this._browser.end()
    }
  }

  _isBrowserContainAny(elements) {
    let isContain = false
    for (const ele in elements) {
      isContain = this._browser.isVisible(ele)
      if (isContain) {
        break
      }
    }
    return isContain
  }
}
