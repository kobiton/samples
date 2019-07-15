import moment from 'moment'
import faker from 'faker'
import {debug} from '@kobiton/core-util'
import config from '../../config/test'

const elements = {
  url: 'https://katalon-demo-cura.herokuapp.com/',
  makeAppointmentButton: '//a[@id="btn-make-appointment"]',
  usernameInput: '//input[@name="username"]',
  passwordInput: '//input[@name="password"]',
  LoginButton: '//button[@id="btn-login"]'
}

export default class KatalonDemoCuraPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest(expectedDurationInMinutes) {
    let duration = 0
    const startedAt = moment.utc()
    try {
      const allowW3C = config.allowW3C || true
      let sessionInfo
      if (allowW3C) {
        sessionInfo = await this._browser
      }
      else {
        await this._browser.init()
        sessionInfo = await this._browser.session()
      }
      
      debug.log(`${config.portalUrl}/sessions/${sessionInfo.value.kobitonSessionId}`)

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

      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .url(elements.url)
          .waitForExist(elements.makeAppointmentButton, this._timeout)
          .click(elements.makeAppointmentButton)
          .waitForExist(elements.usernameInput, this._timeout)
          .setValue(elements.usernameInput, word)
          .waitForExist(elements.passwordInput, this._timeout)
          .setValue(elements.passwordInput, word)
          .click(elements.LoginButton)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.end()
    }
  }
}
