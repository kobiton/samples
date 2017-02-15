import DemoQAPage from './demo-qa-page'
import GiveTourPage from './give-tour-page'
import KobitonPage from './kobiton-page'
import MailinatorPage from './mailinator-page'
import NewTourPage from './newtour-page'
import PasswordGeneratorPage from './password-generator-page'
import TempEmailPage from './temp-email-page'

const pages = [
  DemoQAPage,
  GiveTourPage,
  KobitonPage,
  MailinatorPage,
  NewTourPage,
  PasswordGeneratorPage,
  TempEmailPage
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
