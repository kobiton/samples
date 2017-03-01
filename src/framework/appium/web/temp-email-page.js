import moment from 'moment'

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
      await this._browser
        .init()
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
      await this._browser.end()
    }
  }
}
