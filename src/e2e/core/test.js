import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'

export async function launch(server, desiredCapabilities, searchTerms) {
  let driver
  const timeout = 30000

  try {
    driver = await createDriver(server, desiredCapabilities)
    await BPromise.each(searchTerms, (search) => {
      return driver
       .get('https://www.wikipedia.org/')
       .waitForElementById('searchInput', timeout)
       .sendKeys(search)
       .elementByXPath("//button/i[contains(@class,'search-icon')]")
       .click()
       .waitForElementByName('search', timeout)
    })
  }
  finally {
    await quitDriver(driver)
  }
}
