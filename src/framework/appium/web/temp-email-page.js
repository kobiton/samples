import moment from 'moment'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

const elements = {
  url: 'https://tempail.com/en/temp-email/',
  copyButton: '//a[@class="kopyala-link"]/em',
  refreshButton: '//a[@class="yenile-link"]/em',
  qrCodeButton: '//a[@class="kare-link"]/em',
  deleteButton: '//a[@class="yoket-link"]/em'
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
        const copyButton = await this._browser.$(elements.copyButton)
        await copyButton.waitForExist(this._timeout)
        await copyButton.click()

        const refreshButton = await this._browser.$(elements.refreshButton)
        await refreshButton.click()

        const qrCodeButton = await this._browser.$(elements.qrCodeButton)
        await qrCodeButton.click()

        const deleteButton = await this._browser.$(elements.deleteButton)
        await deleteButton.click()

        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.deleteSession()
    }
  }
}
