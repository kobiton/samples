import moment from 'moment'
import faker from 'faker'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'https://www.mailinator.com/login.jsp',
  emailInput: '//input[@type="text" and contains(@id,"email")]',
  passwordInput: '//input[@type="password" and contains(@id,"password")]'
}
const networkErrorMessages = ["//div[contains(.,'ERR_INTERNET_DISCONNECTED')]",
  "//div[contains(.,'ERR_TIMED_OUT')]",
  "//p[contains(.,'not connected to the Internet')]",
  "//div[contains(.,'ERR_ADDRESS_UNREACHABLE')]",
  "//div[contains(.,'HTTP Status 403')]"]

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
      const isNetworkErr = await this._isBrowserContainAny(networkErrorMessages)
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

  async _isBrowserContainAny(errorMessages) {
    let isContain = false
    for (let i in errorMessages) {
      // eslint-disable-next-line babel/no-await-in-loop
      isContain = await this._browser.isVisible(errorMessages[i])
      if (isContain) {
        break
      }
    }
    return isContain
  }
}

