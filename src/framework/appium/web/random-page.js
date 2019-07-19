// import DemoQAPage from './demo-qa-page'
import GiveTourPage from './give-tour-page'
import MailinatorPage from './mailinator-page'
import NewTourPage from './newtour-page'
import PasswordGeneratorPage from './password-generator-page'
import TempEmailPage from './temp-email-page'
import KatalonDemoCuraPage from './katalon-demo-cura-herokuapp-page'
import HerokuPage from './the-internet-herokuapp-page'

const pages = [
  GiveTourPage,
  MailinatorPage,
  NewTourPage,
  PasswordGeneratorPage,
  TempEmailPage,
  KatalonDemoCuraPage,
  HerokuPage
]

// This test is to make sure that the test won't be cached on the devices
export default class RandomPage {
  constructor(browser, timeout) {
    this._browser = browser
    this._timeout = timeout
  }

  async executeTest(durationInMinutes) {
    const id = Math.floor(Math.random() * pages.length)
    const pageTest = new (pages[id])(this._browser, this._timeout)
    return await pageTest.executeTest(durationInMinutes)
  }

}
