import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'

export async function launch(server, desiredCapabilities, searchTerms) {
  let driver
  try {
    driver = await createDriver(server, desiredCapabilities)
    await BPromise.each(searchTerms, (search) => {
      return driver
        .get('https://www.google.com')
        .sleep(5000)
        .waitForElementById('lst-ib', 10000)
        .sleep(3000)
        .sendKeys(search)
        .sleep(3000)
        .waitForElementByXPath("//button[@aria-label='Google Search']", 10000)
        .click()
        .sleep(3000)
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='All']")
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='Images']")
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='News']")
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='All']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='News']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='Images']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='All']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='News']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='Images']", 10000)
        .click()
    })
  }
  finally {
    await quitDriver(driver)
  }
}
