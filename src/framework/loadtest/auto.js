import wd from 'wd'
import {debug} from '@kobiton/core-util'
import config from '../config/test'
import {EventEmitter} from 'events'

export default class Auto extends EventEmitter {
  constructor(deviceInfo) {
    super()
    this._ns = `auto-session-${deviceInfo.udid}`
    this._deviceInfo = deviceInfo
  }

  async launch() {
    const browserName = this._deviceInfo.platformName === 'Android' ? 'chrome' : 'safari'
    const desiredCaps = {
      sessionName: 'Simulate automation test session',
      sessionDescription: 'This is an example escription',
      deviceOrientation: 'portrait',
      captureScreenshots: true,
      deviceGroup: 'ORGANIZATION',
      browserName,
      deviceName: this._deviceInfo.deviceName,
      platformName: this._deviceInfo.platformName,
      udid: this._deviceInfo.udid
    }

    const kobitonServerConfig = {
      protocol: 'https',
      host: config.autoTestHostname,
      auth: `${config.username1}:${config.apiKey}`
    }

    let driver

    debug.log('Kobiton server', kobitonServerConfig)
    driver = wd.promiseChainRemote(kobitonServerConfig)
    driver.on('status', (info) => {
      debug.log(`${this._ns} status:`, info)
    })
    driver.on('command', (meth, path, data) => {
      debug.log(`${this._ns} command:`, `${meth || ''} ${path || ''} ${data || ''}`)
    })
    driver.on('http', (meth, path, data) => {
      debug.log(`${this._ns} http:`, ` > ${meth || ''} ${path || ''} ${data || ''}`)
    })

    try {
      await driver.init(desiredCaps)

      try {
        await driver
          .get('https://www.google.com')
          .waitForElementByName('q')
          .sendKeys('Kobiton')
          .sleep(3000)
          .waitForElementByName('btnG')
          .click()
      }
      catch (err) {
        if (err.data) {
          debug.error(this._ns, `errors during running test: ${err.data}`)
        }
      }
      finally {
        if (driver && driver.sessionID) {
          await driver.quit()
        }
      }
    }
    catch (err) {
      if (err.data) {
        debug.error(this._ns, `errors during init test: ${err.data}`)
      }
       this.emit('wd-failed')
    }
  }
}
