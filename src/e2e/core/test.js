import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'

export async function launch(server, desiredCapabilities, searchTerms) {
  let driver
  const sleepingTime = 1000
  const testUrl = 'http://demoqa.com/'
  try {
    driver = await createDriver(server, desiredCapabilities)
    await BPromise.each(searchTerms, (search) => {
      return driver
       .get(testUrl)
       .sleep(sleepingTime)
       .get(`${testUrl}about-us/`)
       .sleep(sleepingTime)
       .get(`${testUrl}services/`)
       .sleep(sleepingTime)
       .get(`${testUrl}draggable/`)
       .sleep(sleepingTime)
       .get(`${testUrl}droppable/`)
       .sleep(sleepingTime)
       .get(`${testUrl}resizable/`)
       .sleep(sleepingTime)
       .get(`${testUrl}selectable/`)
       .sleep(sleepingTime)
       .get(`${testUrl}sortable/`)
       .sleep(sleepingTime)
       .get(`${testUrl}accordion/`)
       .sleep(sleepingTime)
       .get(`${testUrl}autocomplete/`)
       .sleep(sleepingTime)
       .get(`${testUrl}datepicker/`)
       .sleep(sleepingTime)
       .get(`${testUrl}menu/`)
       .sleep(sleepingTime)
       .get(`${testUrl}slider/`)
       .sleep(sleepingTime)
       .get(`${testUrl}tooltip/`)
       .sleep(sleepingTime)
       .get(`${testUrl}frames-and-windows/`)
       .sleep(sleepingTime)
       .get(`${testUrl}tabs/`)
       .sleep(sleepingTime)
       .get(`${testUrl}blog/`)
       .sleep(sleepingTime)
       .get(`${testUrl}registration/`)
       .sleep(sleepingTime)
       .get(`${testUrl}contact/`)
       .sleep(sleepingTime)
       .elementByXPath("//input[@name='your-name']")
       .sendKeys(search)
       .elementByXPath("//input[@name='your-email']")
       .sendKeys(search)
       .elementByXPath("//input[@name='your-subject']")
       .sendKeys(search)
       .elementByXPath("//textarea[@name='your-message']")
       .sendKeys(search)
       .elementByXPath("//input[@value='Send']")
       .click()
    })
  }
  finally {
    await quitDriver(driver)
  }
}
