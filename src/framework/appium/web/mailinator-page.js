import moment from 'moment'
import faker from 'faker'
import {debug} from '@kobiton/core-util'
import config from '../../config/test'

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
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest(expectedDurationInSeconds) {
    let duration = 0
    const startedAt = moment.utc()

    try {
      let sessionInfo
      let kobitonSessionId
      
      sessionInfo = await this._browser.getSession()
      kobitonSessionId = sessionInfo.kobitonSessionId
      debug.log(`${config.portalUrl}/sessions/${kobitonSessionId}`)

      // https://w3c.github.io/webdriver/#dfn-set-timeouts
      // https://webdriver.io/docs/api/webdriver.html#settimeouts
      await this._browser.setTimeouts(this._timeout)

      await this._browser.url(elements.url)
      await this._browser.getUrl()

      do {
        const word = faker.lorem.word()

        const emailInput = await this._browser.$(elements.emailInput)
        await emailInput.waitForExist(this._timeout)
        await emailInput.waitForDisplayed(this._timeout)
        await emailInput.waitForEnabled(this._timeout)
        await emailInput.clearValue()
        await emailInput.setValue(word)

        const passwordInput = await this._browser.$(elements.passwordInput)
        await passwordInput.clearValue()
        await passwordInput.setValue(word)

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
      this._driver && await this._browser.deleteSession()
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
