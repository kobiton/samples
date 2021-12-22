import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const deviceName = process.env.KOBITON_DEVICE_NAME || 'iPhone*'

const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for iOS web', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  browserName:        'safari', 
  deviceGroup:        'KOBITON', 
  deviceName:         deviceName,
  platformName:       'iOS',
  platformVersion:    '*'
}

let driver

if (!username || !apiKey) {
  console.log('Error: Environment variables KOBITON_USERNAME and KOBITON_API_KEY are required to execute script')
  process.exit(1)
}

describe('iOS Web sample', () => {

  before(async () => {
    driver = wd.promiseChainRemote(kobitonServerConfig)

    driver.on('status', (info) => {
      console.log(info.cyan)
    })
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })

    try {
      await driver.init(desiredCaps)
    }
    catch (err) {
      if (err.data) {
        console.error(`init driver: ${err.data}`)
      }
    throw err
    }
  })

  it('should return the title that contains Kobiton', async () => {
    await driver.get('https://www.google.com')
    .waitForElementByName('q')
    .sendKeys('Kobiton')
    .sleep(3000)
    //This will click on the first button in the drop down menu. As Apple/Safari does not allow for a .submit within the search bar
    driver.findElementByXpath(".//*[@class='sbic sb43']").click();
    let msg = await driver.title()
    assert.include(msg, 'Kobiton')
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
