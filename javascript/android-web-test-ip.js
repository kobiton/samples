import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const deviceUdid = process.env.KOBITON_DEVICE_UDID

if (!username || !apiKey || !deviceUdid) {
  console.log('Error: Environment variables KOBITON_USERNAME, KOBITON_API_KEY or KOBITON_DEVICE_UDID are required to execute script')
  process.exit(1)
}

const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for Android web', 
  browserName:        'chrome', 
  udid:               deviceUdid                   
}

let driver

describe('Android Web sample', () => {
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
      .keys(wd.SPECIAL_KEYS.Enter)
    
    let msg = await driver.title()
    assert.include(msg, 'Kobiton - Google Search')
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
