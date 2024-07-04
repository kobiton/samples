import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const deviceUdid = process.env.KOBITON_DEVICE_UDID
const protocol = 'https'
const host = 'api-test-green.kobiton.com'

if (!username || !apiKey || !deviceUdid) {
  console.log('Error: Environment variables KOBITON_USERNAME, KOBITON_API_KEY or KOBITON_DEVICE_UDID are required to execute script')
  process.exit(1)
}

const kobitonServerConfig = {protocol, host, auth: `${username}:${apiKey}`}

const desiredCaps = {
  sessionName: 'Dat Automation test session obfuscated',
  sessionDescription: 'Dat automation test',
  udid: deviceUdid,
  noReset: true,
  fullReset: false,
  browserName: 'chrome',
  autoWebview: 'true',
}

let driver

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
    await driver.settings()

    await driver.updateSettings({'kobiton:privateMode': true})
    await driver.settings()

    await driver.get('https://kobiton.com')
    await sleep(2000)
    await driver.title()

    await driver.updateSettings({'kobiton:privateMode': false})
    await driver.settings()

    await driver.get('https://www.youtube.com')
    await sleep(2000)
    await driver.title()

    await driver.updateSettings({'kobiton:privateMode': false})
    await driver.settings()

    await driver.get('https://www.google.com')
    await sleep(2000)
    await driver.title()

    await driver.updateSettings({'kobiton:privateMode': true})

    await driver.get('https://kobiton.com')
    await sleep(2000)
    await driver.title()

    await driver.updateSettings({'kobiton:privateMode': true})

    await driver.get('https://www.youtube.com')
    await sleep(2000)
    await driver.title()

    await driver.updateSettings({'kobiton:privateMode': false})

    await driver.get('https://www.google.com')
    await sleep(2000)
    await driver.title()

    await driver.updateSettings({'kobiton:privateMode': true})

    await driver.get('https://kobiton.com')
    await sleep(2000)
    await driver.title()

    await driver.get('https://www.youtube.com')
    await sleep(2000)
    await driver.title()
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
