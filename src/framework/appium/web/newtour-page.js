import moment from 'moment'
import faker from 'faker'

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
      await this._browser
        .init()
        .url(elements.url)
      do {
        const word = faker.lorem.word()
        await this._browser // eslint-disable-line babel/no-await-in-loop
          .waitForExist(elements.addressInput, this._timeout)
          .setValue(elements.nameInput, word)
        const endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDurationInMinutes)
    }
    catch (err) {
      throw err
    }
    finally {
      await this._browser.end()
    }
  }
}
