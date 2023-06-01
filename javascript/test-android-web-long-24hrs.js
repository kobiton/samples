import 'babel-polyfill'
import 'colors'
import BPromise from 'bluebird'
import wd from 'wd'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY

//copy webdriverKobitonServerConfig and desiredCaps from automation settings of desired device in portal
var webdriverKobitonServerConfig = {
  protocol: 'https',
  host: 'api-staging.kobiton.com',
  auth: `${username}:${apiKey}`
}
var udid = "8AJY0LFEM"
var desiredCaps = {
  sessionName:        '[LR] Android Web - ' + udid,
  sessionDescription: '',
  deviceOrientation:  'portrait',
  noReset:            true,
  fullReset:          false,
  captureScreenshots: true,
  networkActivity:    false,
  browserName:        'chrome',
  // The given team is used for finding devices and the created session will be visible for all members within the team.
  udid: udid,
  autoWebview: true
} 

const testUrl = 'https://the-internet.herokuapp.com/login'
let driver

describe('Automation Test on Android web', () => {

  before(async () => {
    console.log(`webdriverKobitonServerConfig: ${JSON.stringify(webdriverKobitonServerConfig)}`)
    driver = wd.promiseChainRemote(webdriverKobitonServerConfig)
    driver.on('status', (info) => {console.log(info.cyan)})
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })
    try {
      await driver.init(desiredCaps)
      .setPageLoadTimeout(120000)
      .setImplicitWaitTimeout(120000)
    }
    catch (err) {
      console.error(`init driver: ${err}`)
      if (err.data) {
        console.error(`init driver: ${err.data}`)
      }
    throw err
    }
  })

  it('should return error when we input wrong password', async () => {
    try {
      await driver
      .get(`${testUrl}`)
      .sleep(5000)
      
      await BPromise.delay(6000)
    } catch (error) {}

    const start = new Date().getTime()
    let end = 0
    const duration = 86400000
    let runtime = 0

    do {
      end = new Date().getTime()
      runtime = end - start
      try {
        await driver
        .waitForElementById('username')
        .sleep(500)
        .clear()
        .sleep(500)
        .sendKeys('foo')
        .sleep(500)

        await driver
        .waitForElementById('password')
        .sleep(500)
        .clear()
        .sleep(500)
        .sendKeys('SuperSecretPassword!')
        .sleep(500)

        await driver
        .waitForElementByXPath("//form[@name='login']")
        .sleep(500)
        .submit()
        .sleep(500)

        await BPromise.delay(1000)
      } catch (error) {
      }

    }
    while (runtime < duration)
  })

  after(async () => {
    if (driver != null) {
    try {
      await driver.quit()
    }
    catch (err) {
      console.error(`quit driver: ${err}`)
    }
  }
  })
})
