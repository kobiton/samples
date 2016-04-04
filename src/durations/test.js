import setup from '../helpers/setup'

exports.launch = async (server, desiredCapabilities, searchTerms) => {
  let driver
  try {
    driver = await setup.createDriver(server, desiredCapabilities)
    for (let search of searchTerms) {
      await driver // eslint-disable-line babel/no-await-in-loop
        .get('https://www.google.com')
        .sleep(5000)
        .waitForElementByName('q', 10000)
        .sleep(3000)
        .sendKeys(search)
        .sleep(3000)
        .waitForElementByName('btnG', 10000)
        .click()
        .sleep(3000)
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='All']")
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='Images']")
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='Videos']")
        .hasElementByXPath("//div[@id='hdtb-msb']//*[text()='News']")
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='News']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='Videos']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='Images']", 10000)
        .click()
        .sleep(3000)
        .waitForElementByXPath("//div[@id='hdtb-msb']//*[text()='All']", 10000)
        .click()
    }
  }
  finally {
    await setup.quitDriver(driver)
  }
}
