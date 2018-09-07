import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const deviceName = process.env.KOBITON_DEVICE_NAME || 'Galaxy*'

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
  deviceName:         deviceName,
  platformName:       'Android',
  app: 'https://appium.github.io/appium/assets/ApiDemos-debug.apk',
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos'
}

let driver

if (!username || !apiKey) {
  console.log('Error: Environment variables KOBITON_USERNAME and KOBITON_API_KEY are required to execute script')
  process.exit(1)
}

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
        assert.equal(text.toLocaleLowerCase(), 'api demos')
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
