import 'babel-polyfill'
import 'colors'
import BPromise from 'bluebird'
import wd from 'wd'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY

//copy webdriverKobitonServerConfig and desiredCaps from automation settings of desired device in portal
const webdriverKobitonServerConfig = {
  // protocol,
  // host,
  // port,
  // auth
  protocol: 'https',
  host: 'api-test.kobiton.com',
  auth: `${username}:${apiKey}`
}

 //const desiredCaps = configs.desiredCapsiOSWebLoop
const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: '',
  deviceOrientation:  'portrait',
  noReset:            true,
  fullReset:          false,
  captureScreenshots: true,
  browserName:        'safari',
  // The given team is used for finding devices and the created session will be visible for all members within the team.
  groupId:            1100, // Group: Kobiton GROUP
  deviceGroup:        'ORGANIZATION',
  // For deviceName, platformVersion Kobiton supports wildcard
  // character *, with 3 formats: *text, text* and *text*
  // If there is no *, Kobiton will match the exact text provided
  deviceName:         'iPad mini 3G (Cellular)',
  // The tag is used for finding devices and the user can input only one tag. 
  // For example, the data value will be inputted: tagName="TagName1"
  tagName:            '',
  platformVersion:    '12.5.4',
  platformName:       'iOS',
  udid: '502b2e68125c326405bd70ba72101df5c4c666d7'
} 

const testUrl = 'https://the-internet.herokuapp.com/login'
let driver

describe('Automation Test on iOS web', () => {

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
    const duration = 86400000 //24 hrs
    
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
