import exec from '../helpers/exec'
import initEnv from '../helpers/init-environment'
import {debug} from '@kobiton/core-util'
import setup from '../helpers/setup'
import portal from '../helpers/portal-api'
import moment from 'moment'
import {assert} from 'chai'
import BPromise from 'bluebird'

describe('Verify the session\'s duration', () => {

  let onlineDevices
  let server
  let env
  let cap
  const config = {
    newCommandTimeout: 60,
    trackerTimeout: 60
  }

  before(async () => {
    env = await initEnv()
    server = env.kobitonServer
    onlineDevices = env.onlineDevices
    assert.isAtLeast(onlineDevices.length, 1, 'Expected 1 online device')
    cap = {...onlineDevices[0], newCommandTimeout: config.newCommandTimeout}
  })

  it('should have ended date when a test command is timeout', async () => {
    await _run(_makeTimeoutTest)
  })

  it('should have ended date when test script is interrupted', async () => {
    await _run(_makeFailureTest)
  })

  it('should have ended date when test script run successfully', async () => {
    await _run(_makeSuccessTest)
  })

  it('should have ended date when adb process is killed', async () => {
    await _run(_makeAdbCrashedTest)
  })

/*
* Private functions
*/
  function _getSessions() {
    return portal.getSessions(
     {token: env.userInfo.token, page: 1, size: onlineDevices.length})
  }

  function _getSession(id) {
    return portal.getSession({token: env.userInfo.token, sessionid: id})
  }

  function _convertMillisecond(seconds) {
    return moment.duration(seconds, 'seconds').as('millisecond')
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

  async function _makeFailureTest({driver, search}) {
    try {
      await driver
     .get('https://www.google.com')
     .waitForElementById('invalid-element', 1000)
    }
    catch (err) {}
    finally {
      await setup.quitDriver(driver)
    }
  }

  async function _makeTimeoutTest({driver, search}) {
    const timeout = _convertMillisecond(config.newCommandTimeout + config.trackerTimeout + 10)
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
    }
    finally {
      // wait for tracker process do its jobs
      await BPromise.delay(timeout)
    }
  }

  async function _makeAdbCrashedTest({driver, search}) {
    const timeout = _convertMillisecond(config.trackerTimeout)
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
   }
   finally {
     // kill adb process then wait for tracker process do its job
     await exec.killAdbProcess()
     await BPromise.delay(timeout)
   }
  }

  async function _run(launchTest) {
    const actual = {
      id: '0',
      createdAt: null,
      endedAt: null,
      duration: null,
      endState: null,
      udid: null,
      deviceName: null
    }
    const expected = {
      createdAt: moment(),
      endedAt: null,
      duration: null
    }
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
    expected.endedAt = moment()
    expected.duration = expected.endedAt.diff(expected.createdAt, 'seconds')
    const session = await _getSession(actual.id)
    actual.endedAt = session.endedAt
    actual.duration = moment(actual.endedAt).diff(moment(actual.createdAt), 'seconds')
    debug.log('test-session-duration', `created: ${actual.createdAt} endedAt: ${actual.endedAt}`)
    debug.log('test-session-duration', `:${actual.duration}s <= ${expected.duration}s`)
    assert.isNotNull(actual.endedAt)
    assert.isAtLeast(expected.duration, actual.duration, 'duration must less than expected')
  }
})
