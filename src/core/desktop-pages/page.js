import {desktopApp} from '../setup'
import {killKobitonApp} from '../exec'
import {debug} from '@kobiton/core-util'
import {cleanUpDesktopResourceData} from '../desktop-util'

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
      await cleanUpDesktopResourceData()
      await killKobitonApp()
    }
    catch (err) {}
  }

  async startApplication() {
    await this.cleanUpEnvironment()
    await desktopApp.start()
    this.webContents.on('did-finish-load', () => {
      debug.log('desktop-page:startApplication', 'load successfully')
    })
    // Display main process log
    const logs = await this.client.getMainProcessLogs()
    let restart = false
    for (const log of logs) {
      debug.log('desktop-page:', log)
      if (log.includes('Cannot find module')) {
        debug.error('desktop-page:startApplication ', log)
        restart = true
        break
      }
    }
    if (restart) return await this.restartApplication()

    await this.client.waitUntilWindowLoaded()
  }

  async restartApplication() {
    await desktopApp.restart()
    // Display main process log
    let logs = await this.client.getMainProcessLogs()
    for (const log of logs) {
      debug.log('desktop-page:log ' + log)
      if (log.includes('Cannot find module')) {
        debug.error('desktop-page:restartApplication ', log)
        throw new Error(log)
      }
    }
    // Display render log
    logs = await this.client.getRenderProcessLogs()
    for (const log of logs) {
      debug.log('desktop-page:Message ', log.message)
      debug.log('desktop-page:Source ', log.source)
      debug.log('desktop-page:Level ', log.level)
    }
  }

  async stopApplication() {
    if (!desktopApp || !desktopApp.isRunning()) return
    await desktopApp.stop()
  }

  isAppRunning() {
    return desktopApp.isRunning()
  }
}
