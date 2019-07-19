import moment from 'moment'
import faker from 'faker'
import config from '../../config/test'
import {debug} from '@kobiton/core-util'

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
        const word = faker.lorem.word()

        const symBols = await this._browser.$(elements.symBols)
        await symBols.waitForExist(this._timeout)
        await symBols.waitForDisplayed(this._timeout)
        await symBols.waitForEnabled(this._timeout)
        await symBols.click()

        const numbers = await this._browser.$(elements.numbers)
        await numbers.click()

        const lowercase = await this._browser.$(elements.lowercase)
        await lowercase.click()

        const noAmb = await this._browser.$(elements.noAmb)
        await noAmb.click()

        const client = await this._browser.$(elements.client)
        await client.click()

        const autoSelect = await this._browser.$(elements.autoSelect)
        await autoSelect.click()

        const saveSettings = await this._browser.$(elements.saveSettings)
        await saveSettings.click()

        const generateButton = await this._browser.$(elements.generateButton)
        await generateButton.click()

        const finalPasswordInput = await this._browser.$(elements.finalPasswordInput)
        await finalPasswordInput.clearValue(word)
        await finalPasswordInput.setValue(word)
        
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    finally {
      this._driver && await this._browser.deleteSession()
    }
  }
}
