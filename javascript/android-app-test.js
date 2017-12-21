import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'

const username = 'your Kobiton username'
const apiKey = 'your Kobiton api key'

const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for Android app', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  deviceGroup:        'KOBITON', 
  deviceName:         'Galaxy Note3',
  platformName:       'Android',
  app: 'https://appium.github.io/appium/assets/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos'
}

let driver

describe('Android App sample', () => {

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

  it('should show the app label', async () => {
    await driver.elementByClassName("android.widget.TextView")
      .text().then(function(text) {
        assert.equal(text, 'API Demos')
      })
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
