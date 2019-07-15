import moment from 'moment'
import faker from 'faker'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'http://newtours.demoaut.com/mercuryregister.php',
  addressInput: '//input[@name="address1"]'
}

export default class NewTourPage {
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

      if (sessionInfo.value.platformName === 'iOS') {
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
          .waitForExist(elements.addressInput, this._timeout)
          .setValue(elements.addressInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.end()
    }
  }
}
