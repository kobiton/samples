import moment from 'moment'
import faker from 'faker'

const elements = {
  url: 'http://passwordsgenerator.net/',
  symBols: '//input[@id="Symbols"]',
  numbers: '//input[@id="Numbers"]',
  lowercase: '//input[@id="Lowercase"]',
  uppercase: '//input[@id="Uppercase"]',
  noAmb: '//input[@id="NoAmb"]',
  client: '//input[@id="Client"]',
  autoSelect: '//input[@id="AutoSelect"]',
  saveSettings: '//input[@id="SaveSettings"]',
  generateButton: '//div[@id="sec_btn"]/div[contains(.,"Generate Password")]',
  finalPasswordInput: '//input[@id="final_pass"]'
}

export default class PasswordGeneratorPage {
  constructor(browser, timeout, desiredCapabilities) {
    this._browser = browser
    this._timeout = timeout
    this._desiredCapabilities = desiredCapabilities
  }

  async executeTest(expectedDurationInMinutes) {
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
      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .waitForExist(elements.symBols, this._timeout)
          .click(elements.symBols)
          .waitForExist(elements.numbers, this._timeout)
          .click(elements.numbers)
          .waitForExist(elements.lowercase, this._timeout)
          .click(elements.lowercase)
          .waitForExist(elements.uppercase, this._timeout)
          .click(elements.uppercase)
          .waitForExist(elements.noAmb, this._timeout)
          .click(elements.noAmb)
          .waitForExist(elements.client, this._timeout)
          .click(elements.client)
          .waitForExist(elements.autoSelect, this._timeout)
          .click(elements.autoSelect)
          .waitForExist(elements.saveSettings, this._timeout)
          .click(elements.saveSettings)
          .waitForExist(elements.generateButton, this._timeout)
          .click(elements.generateButton)
          .waitForExist(elements.finalPasswordInput, this._timeout)
          .setValue(elements.finalPasswordInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      await this._browser.end()
    }
  }
}
