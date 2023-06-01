import 'babel-polyfill'
import 'colors'
import BPromise from 'bluebird'
import wd from 'wd'
import configs from '../configs'

const host = process.env.HOST || configs.webdriverKobitonServerConfig.host
const protocol = process.env.PROTOCOL || configs.webdriverKobitonServerConfig.protocol
const port = process.env.PORT || configs.webdriverKobitonServerConfig.port
const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY

//copy webdriverKobitonServerConfig and desiredCaps from automation settings of desired device in portal
const webdriverKobitonServerConfig = {
  protocol,
  host,
  port,
  auth: `${username}:${apiKey}`
}

const desiredCaps = configs.desiredCapsAndroidWeb

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

    for (let i = 0; i < 99999; i++) {
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
