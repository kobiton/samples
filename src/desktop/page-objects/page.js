import {desktopApp} from '../../helpers/setup'
import {killKobitonApp} from '../../helpers/exec'
import {debug} from '@kobiton/core-util'

const defaultElements = {
  spinner: 'div.spinner-wrapper'
}

export default class Page {
  constructor(elements = {}) {
    this._elements = {...defaultElements, ...elements}
  }

  get elements() {
    return this._elements
  }

  get client() {
    return desktopApp.client
  }

  get webContents() {
    return desktopApp.webContents
  }

  async cleanUpEnvironment() {
    try {
      await killKobitonApp()
    }
    catch (err) {}
  }

  async startApplication() {
    await this.cleanUpEnvironment()
    await desktopApp.start()
    this.webContents.on('did-finish-load', () => {
      debug.log('startApplication', 'load successfully')
    })
    //Display main process log
    this.client.getMainProcessLogs().then(function (logs) {
      for (const log of logs) {
        debug.log('desktop-page:log ' + log)
      }
      //Display render log
      this.client.getRenderProcessLogs().then(function (logs) {
        for (const log of logs) {
          debug.log('desktop-page:Message ', log.message)
          debug.log('desktop-page:Source ', log.source)
          debug.log('desktop-page:Level ', log.level)
        }
      })
    })
    await this.client.waitUntilWindowLoaded()
  }

  async stopApplication() {
    if (!desktopApp || !desktopApp.isRunning()) return
    await desktopApp.stop()
  }
}
