require('colors')
const wd = require('wd')
const {assert} = require('chai')

const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_API_KEY
const appId = process.env.KOBITON_APP_ID

const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  sessionName: 'Apps Repo Demo',
  sessionDescription: 'This is an example to demostrate Android apps repo',
  platformName: 'android',
  deviceName: 'Galaxy'
}

let driver, sessionId

describe('Android App sample', () => {
  before((done) => {
    desiredCaps.app = `kobiton-store:${appId}`

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

    driver.init(desiredCaps)
      .then((data) => {
        sessionId = data[1].kobitonSessionId
        done()
      })
      .catch((err) => {
        if (err.data) {
          console.error(`init driver: ${err.data}`)
        }
      })
  })

  it('should open the app', (done) => {
    done()
  })

  after((done) => {
    if (driver != null) {
      driver.quit()
        .then(() => {
          done()
          console.log(`Complete session ${sessionId}`)
        })
    }
  })
})
