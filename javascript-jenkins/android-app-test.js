import 'babel-polyfill'
import 'colors'
import wd from 'wd'

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const deviceName = process.env.KOBITON_DEVICE_NAME || 'Galaxy*'
const appId = process.env.KOBITON_APP_ID

const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  sessionName: 'Automation test session - App',
  sessionDescription: 'This is an example for Android app',
  deviceOrientation: 'portrait',
  captureScreenshots: true,
  deviceName: deviceName,
  platformName: 'Android',
  app: appId,
}

let driver

if (!username || !apiKey || !appId) {
  console.log('Error: Environment variables KOBITON_USERNAME, KOBITON_API_KEY and KOBITON_APP_ID are required to execute script.')
  process.exit(1)
}

describe('Android App sample', () => {
  before(async () => {
    driver = wd.promiseChainRemote(kobitonServerConfig)

    driver.on('status', (info) => console.log(info.cyan))
    driver.on('command', (meth, path, data) => console.log(' > ' + meth.yellow, path.grey, data || ''))
    driver.on('http', (meth, path, data) => console.log(' > ' + meth.magenta, path, (data || '').grey))

    try {
      const data = await driver.init(desiredCaps)
      const sessionId = data[1].kobitonSessionId;
      console.log(`Session ID used for the next step: ${sessionId}.`)
    } catch (err) {
      if (err.data) {
        console.error(`init driver: ${err.data}`)
      }
      throw err
    }
  })

  it('should open the app', (done) => {
    done()
  })

  after(async () => {
    if (driver != null) {
      try {
        await driver.quit()
      } catch (err) {
        console.error(`quit driver: ${err}`)
      }
    }
  })
})
