import BPromise from 'bluebird'
import {createDriver, quitDriver} from '../../core/setup'
import PortalLoginPage from '../../core/portal-pages/login'
import SessionDetailPage from '../../core/portal-pages/session-detail'
import DesktopLoginPage from '../../core/desktop-pages/login'
import DesktopDevicesPage from '../../core/desktop-pages/devices'
import * as portalApi from '../../core/portal-api'
import initEnv from '../../core/init-environment'
import {debug} from '@kobiton/core-util'
import uuid from 'node-uuid'

export default class E2E {
  constructor({username, password}) {
    this._defaultTimeout = 70000
    this._account = {username, password}
    // expected and actual outcome
    this._actual = {}
    // Web portal pages
    this._portalLoginPage = new PortalLoginPage()
    this._sessionDetailPage = new SessionDetailPage()
    //Desktop application
    this._desktopLoginPage = new DesktopLoginPage()
    this._desktopDevicesPage = new DesktopDevicesPage()
  }

  /**
   * Public functions for desktop app
   */
  async startDesktop() {
    await this._desktopLoginPage.startApplication()
    this._desktopDevicesPage = await this._desktopLoginPage.login(this._account)
  }

  async stopDesktop() {
    await this._desktopLoginPage.stopApplication()
  }

  async activateAllDevices() {
    await this._desktopDevicesPage.activateAllDevices()
  }

  async deactivateAllDevices() {
    await this._desktopDevicesPage.deactivateAllDevices()
  }

  /**
   * Make sure the plugged devices are activated
   **/
  async ensureAllDevicesAvaillable() {
    debug.log('e2e:ensureAllDevicesAvaillable ', 'start')
    const running = await this._desktopLoginPage.isAppRunning()
    if (!running) {
      await this.startDesktop()
    }

    const loggedIn = await this._desktopLoginPage.isLoggedIn()
    if (!loggedIn) {
      this._desktopDevicesPage = await this._desktopLoginPage.login(this._account)
      await this._desktopDevicesPage.waitForAllDevicesInitializingDone()
      await this._desktopDevicesPage.activateAllDevices()
    }

    const foundActivateButton = await this._desktopDevicesPage.hasTopActivateButton()
    if (foundActivateButton) {
      await this._desktopDevicesPage.activateAllDevices()
    }
  }

  /**
   * Public functions for portal web
   */
  loginPortal() {
    this._portalLoginPage.open()

    if (!this._portalLoginPage.isLoggedIn()) {
      debug.log('e2e: loginPortal', 'login account' + this._account)
      this._portalLoginPage.login(this._account)
    }
  }

  getHeaderDescription(sessionId) {
    this._sessionDetailPage.open(sessionId)
    return this._sessionDetailPage.getHeaderDescription()
  }

  getMetaData(sessionId) {
    this._sessionDetailPage.open(sessionId)
    return this._sessionDetailPage.getMetaData()
  }

  waitForSessionEnd() {
    this._portalLoginPage.pause(this._defaultTimeout)
  }

  isDisplayedScreenShot() {
    return this._sessionDetailPage.isDisplayedScreenShot()
  }

  isDisplayedNoScreenShot() {
    return this._sessionDetailPage.isDisplayedNoScreenShot()
  }

  /**
   * Public functions for portal api
   */
  async getFirstFoundActivatedCap() {
    const onlineDevices = await this.getOnlineDevices()
    const activatedDevices = await this._desktopDevicesPage.getListActivatedDevices()

    let cap = null
    if (activatedDevices.length > 0) {
      for (const device of onlineDevices) {
        const foundDevice = activatedDevices.find((activatedDevice) => {
          return device.deviceName === activatedDevice.deviceName
        })
        if (foundDevice) {
          cap = device
          break;
        }
      }
    }
    debug.log('e2e:getFirstFoundActivatedCap ', cap)
    if (cap) return {...cap, deviceOrientation: 'potrait', captureScreenshots: true}
  }

  async getOnlineDevices() {
    const userInfo = await portalApi.getUserInfo()
    return await portalApi.getOnlineDevices(userInfo.token)
  }

  async getSession(sessionid) {
    debug.log('e2e:getSession ', sessionid)
    const userInfo = await portalApi.getUserInfo()
    return await portalApi.getSession({token: userInfo.token, sessionid})
  }

  async _getSessionId(kSessionId) {
    const env = await initEnv()
    const sessions = await portalApi.getSessions({token: env.userInfo.token, page: 1, size: 5})
    const foundSession = sessions.find((session) => {
      return session.executionData.desired.kSessionId === kSessionId
    })
    return foundSession.id
  }

  /**
   * Private functions for e2e tests
   */
  async _runDummyAppiumTest(driver) {
    await driver
    .get('https://www.google.com')
    .sleep(5000)
    .waitForElementById('lst-ib', 10000)
    .sleep(3000)
    .sendKeys('Test')
  }

  /**
   * Run an Appium test script with complete status and return the newly created Session ID
   */
  async executeSuccessfulAutoTestSession(cap) {
    const kSessionId = uuid.v1()
    const env = await initEnv()
    const driver = await createDriver(env.kobitonServer, {...cap, kSessionId})
    try {
      await this._runDummyAppiumTest(driver)
    }
    catch (err) {
      debug.error('e2e: executeSuccessfulAutoTestSession', err)
    }
    finally {
      await quitDriver(driver)
    }
    return this._getSessionId(kSessionId)
  }

  /**
   * Run an Appium test script with timeout status and return the newly created Session ID
   */
  async executeTimeoutAutoTestSession(cap) {
    const kSessionId = uuid.v1()
    this._defaultTimeout = (cap.newCommandTimeout | 70) * 1000
    const env = await initEnv()
    const driver = await createDriver(env.kobitonServer, {...cap, kSessionId})
    await this._runDummyAppiumTest(driver)
    // wait for tracker process do its jobs
    await BPromise.delay(this._defaultTimeout)
    return this._getSessionId(kSessionId)
  }

  /**
   * Run an Appium test script with in progress status and return the newly created Session ID
   **/
  async executeInprogressAutoTestSession(cap) {
    const kSessionId = uuid.v1()
    const env = await initEnv()
    const driver = await createDriver(env.kobitonServer, {...cap, kSessionId})
    await this._runDummyAppiumTest(driver)
    const sessionId = await this._getSessionId(kSessionId)
    return {
      sessionId,
      endTest: async () => {
        await quitDriver(driver)
      }
    }
  }

  /**
   * Run an Appium test script with error status and return the newly created Session ID
   */
  async executeErrorAutoTestSession(cap) {
    const kSessionId = uuid.v1()
    const env = await initEnv()
    const driver = await createDriver(env.kobitonServer, {...cap, kSessionId})
    await this._runDummyAppiumTest(driver)
    await this.stopDesktop()
    return this._getSessionId(kSessionId)
  }
}
