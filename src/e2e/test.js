import {assert} from 'chai'
import DesktopLoginPage from '../desktop/page-objects/login'
import PortalLoginPage from '../portal/page-objects/login'
import {getAccount} from '../helpers/user-info'
import * as portal from '../helpers/portal-api'
import {debug} from '@kobiton/core-util'
import initEnv from '../helpers/init-environment'
import {actual} from './_data'
import * as setup from '../helpers/setup'

describe('full e2e suite', () => {
  let desktopLoginPage
  let loginPage
  let sessionsPage
  const account = getAccount()
  let env
  let server
  let onlineDevices
  let cap
  const config = {
    newCommandTimeout: 60, //seconds
    trackerTimeout: 60 //seconds
  }

  describe('verify test orientation', () => {
    before(async function async() {
      //start desktop application
      desktopLoginPage = new DesktopLoginPage()
      await desktopLoginPage.startApplication()
      const devicesPage = await desktopLoginPage.login(account.emailOrUsername, account.password)
      await devicesPage.waitForNameExist()
      await devicesPage.activateDevice()
      //init environment
      env = await initEnv()
      onlineDevices = env.onlineDevices
      server = env.kobitonServer
      assert.isAtLeast(onlineDevices.length, 1, 'Expected 1 online device')
      cap = {...onlineDevices[0], newCommandTimeout: config.newCommandTimeout}
    })

    after(async function async() {
      await desktopLoginPage.stopApplication()
    })

    it('should run a test script with portrait capability', async function async() {
      debug.log('e2e:', 'run test script')
      await _run(_makeSuccessTest)
    })

    it('should login successfully', () => {
      //start portal application
      debug.log('e2e:', 'run test portal')
      loginPage = new PortalLoginPage()
      loginPage.open()
      sessionsPage = loginPage.login({username: account.emailOrUsername, password: account.password})//eslint-disable-line
      assert.isTrue(sessionsPage.checkLoginStatus())
    })

    // it('should scroll to the bottom', () => {
    //   assert.isTrue(sessionsPage.loadMoreSessionsBtn.isExisting())
    //   const loadMoreLocation = sessionsPage.loadMoreSessionsLbl.getLocation()
    //   sessionsPage.loadMoreSessionsLbl.scroll(loadMoreLocation.x, loadMoreLocation.y)
    //   sessionsPage.loadMoreSessionsBtn.click()
    //   assert.isTrue(sessionsPage.loadMoreSessionsBtn.isVisible())
    //   assert.isTrue(sessionsPage.loadMoreSessionsLbl.isVisible())
    // })

  })

  /**
   *  Private functions
   */
  function _getSessions() {
    return portal.getSessions(
      {token: env.userInfo.token, page: 1, size: onlineDevices.length})
  }

  async function _makeSuccessTest({driver, search}) {
    try {
      await driver
        .get('https://www.google.com')
        .sleep(5000)
        .waitForElementById('lst-ib', 10000)
        .sleep(3000)
        .sendKeys(search)
        .sleep(3000)
        .waitForElementByXPath("//button[@aria-label='Google Search']", 10000)
        .click()
    }
    catch (err) {
      debug.error('test-session-duration', err)
      throw err
    }
    finally {
      await setup.quitDriver(driver)
    }
  }

  function _checkPortalResult(id) {
    debug.log('sessionid: ', id)
  }

  async function _run(launchTest) {
    const driver = await setup.createDriver(server, cap)
    // get id of the running session match with device
    const sessions = await _getSessions()
    const matchedSession = sessions.find((session) => {
      return !session.endedAt && session.executionData.actual.deviceName === cap.deviceName
    })
    if (matchedSession) {
      actual.id = matchedSession.id
      actual.createdAt = matchedSession.createdAt
    }
    await launchTest({driver, search: 'Test'})
    _checkPortalResult(actual.id)
  }

})
