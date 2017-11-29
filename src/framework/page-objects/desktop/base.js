import BPromise from 'bluebird'
import {executeCommand} from '../../util/exec'
import {Application} from 'spectron'

export const desktopApp = initDesktop()

function initDesktop(options = {}) {
  options.path = '/Applications/Kobiton.app/Contents/MacOS/Kobiton'
  options.startTimeout = 30000
  options.waitTimeout = 60000
  return new Application(options)
}

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
    let username = await executeCommand('whoami')
    username = username.trim()
    const resouceFiles = [
      `/Users/${username}/Library/Application Support/Kobiton/user.data`,
      `/Users/${username}/Library/Application Support/Kobiton/settings.data`,
      `/Users/${username}/Library/Application Support/Kobiton/logs/*`,
      `/Users/${username}/Library/Application Support/Kobiton/Local Storage`,
      `/Users/${username}/Library/Application Support/Kobiton/kobies`,
      `/Users/${username}/Library/Application Support/Kobiton/GPUCache`,
      `/Users/${username}/Library/Application Support/Kobiton/Cache`,
      `/Users/${username}/Library/Application Support/Kobiton/Cookies`,
      `/Users/${username}/Library/Application Support/Kobiton/Cookies-journal`,
      `/Users/${username}/Library/Application Support/Kobiton/profile/`
    ]

    resouceFiles.map((f) => {
      return executeCommand(`rm -rf "${f}"`)
    })
    await BPromise.all(resouceFiles)
  }

  async uninstallPackages() {
    let username = await executeCommand('whoami')
    username = username.trim()
    const packages = [
      `rm -rf /Users/${username}/isign`,
      'brew uninstall --ignore-dependencies git',
      'brew uninstall --ignore-dependencies openssl',
      'brew uninstall --force python',
      'brew uninstall ios-deploy',
      'brew uninstall carthage',
      'brew uninstall --ignore-dependencies libplist',
      'brew uninstall --ignore-dependencies usbmuxd',
      'brew uninstall graphicsmagick',
      'brew uninstall libimobiledevice',
      'brew uninstall ideviceinstaller',
      'brew uninstall ffmpeg',
      'brew uninstall carthage'
    ]
    packages.map((p) => {
      return executeCommand(p)
    })

    await BPromise.all(packages)
  }

  async killKobitonProcesses() {
    const cmds = [
      'killall Kobiton',
      'killall "Kobiton Helper"',
      'killall adb',
      'killall chromedriver'
    ]
    await cmds.map((cmd) => {
      executeCommand(cmd)
    })
  }

  async startApplication() {
    await this.killKobitonProcesses()
    await desktopApp.start()
    await this.client.waitUntilWindowLoaded()
    await this.client.getMainProcessLogs()
    await this.client.getRenderProcessLogs()
  }

  async restartApplication() {
    await desktopApp.restart()
    await this.client.waitUntilWindowLoaded()
    await this.client.getMainProcessLogs()
    await this.client.getRenderProcessLogs()
  }

  async stopApplication() {
    if (!desktopApp || !desktopApp.isRunning()) return
    await desktopApp.stop()
  }

  isAppRunning() {
    return desktopApp.isRunning()
  }

  getWindowCount() {
    return desktopApp.client.getWindowCount()
  }

}
