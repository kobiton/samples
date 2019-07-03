import moment from 'moment'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'https://tempail.com/en/temp-email/',
  copyButton: '//div[@class="menu-dikey"]/a[@class="kopyala-link"]/em',
  refreshButton: '//div[@class="menu-dikey"]/a[@class="yenile-link"]/em',
  qrCodeButton: '//div[@class="menu-dikey"]/a[@class="kare-link"]/em',
  deleteButton: '//div[@class="menu-dikey"]/a[@class="yoket-link"]/em'
}

export default class TempEmailPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
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
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .waitForExist(elements.copyButton, this._timeout)
          .click(elements.copyButton)
          .waitForExist(elements.refreshButton, this._timeout)
          .click(elements.refreshButton)
          .waitForExist(elements.qrCodeButton, this._timeout)
          .click(elements.qrCodeButton)
          .waitForExist(elements.deleteButton, this._timeout)
          .click(elements.deleteButton)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.end()
    }
  }
}
