import moment from 'moment'
import faker from 'faker'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'https://www.mailinator.com/manyauth/login.jsp',
  emailInput: '//input[@id="many_login_email"]',
  passwordInput: '//input[@id="many_login_password"]'
}
const networkErrorMessages = [
  "//div[contains(.,'ERR_INTERNET_DISCONNECTED')]",
  "//div[contains(.,'ERR_TIMED_OUT')]",
  "//*[contains(.,'is not connected')]",
  "//div[contains(.,'ERR_ADDRESS_UNREACHABLE')]",
  "//div[contains(.,'HTTP Status 403')]"
]

export default class MailinatorPage {
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
      debug.error('auto_web', err)
      const isNetworkErr = await this._isBrowserContainAny(networkErrorMessages)
      if (isNetworkErr) {
        throw new Error('There is no Internet connection on this device')
      }
      // Error message when element email can't be found within timeout
      else if (err.toString().includes('still not existing')) {
        //load page takes more than 30 milliseconds.
        throw new Error('Poor network connectivity on this device')
      }
      else {
        throw new Error(err)
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
