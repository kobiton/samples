import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
import E2E from './core/e2e'
import {desiredCapabilities} from './core/data'
import {getAccount} from '../core/user-info'
import moment from 'moment'

describe('verify full e2e', () => {
  const {emailOrUsername: username, password} = getAccount()
  const e2e = new E2E({username, password})
  let cap
  const completeScenarios = {
    'portrait': desiredCapabilities.getPortrait,
    'landscape': desiredCapabilities.getLandscape,
    'no capture screen shot': desiredCapabilities.getNotCaptureScreenshots,
    'mixed or substring devicename': desiredCapabilities.getMixedOrSubstringDeviceName,
    'mixed or substring platform version': desiredCapabilities.getMixedOrSubstringPlatformVersion,
    'new command timeout': desiredCapabilities.getNewCommandTimeout
  }

  before('start desktop', async function async() {
    await e2e.startDesktop()
  })

  after('stop desktop', async function async() {
    await e2e.stopDesktop()
  })

  /**
   * Make a test complete then verify the actual outcome on portal
   */
  describe('verify test run with complete status', () => {
    let cap
    let sessionId
    let desiredCap
    let session
    let expectedSessionInfor

    before(async function async() {
      await e2e.ensureAllDevicesAvaillable()
      cap = await e2e.getFirstFoundActivatedCap()
      assert.isNotNull(cap, 'cap is not null')
    })

    Object.keys(completeScenarios).forEach((key) => {
      it(`should create a test complete session with ${key} cap when run a appium test`,
        async function async() {
          sessionId = null
          const getCap = completeScenarios[key]
          desiredCap = getCap(cap)
          debug.log('e2e: completeScenarios', desiredCap)
          // run dummy appium test
          const startedAt = moment.utc()
          sessionId = await e2e.executeSuccessfulAutoTestSession(desiredCap)
          const endedAt = moment.utc()
          expectedSessionInfor = {
            startedAt,
            endedAt,
            duration: endedAt.diff(startedAt, 'seconds')
          }
          // verify test result
          assert.isNotNull(sessionId, 'sessionId is not null')
          session = await e2e.getSession(sessionId)
          assert.equal('COMPLETE', session.endState)
        })

      it(`should display test complete session with ${key} cap on portal after run an appium test`,
        () => {
          _verifyResultOnPortalPage({sessionId, session, desiredCap, expectedSessionInfor})
        })
    })
  })

  /**
   * Make a test timeout then verify the actual outcome on portal
   */
  describe('verify test run with timeout status', () => {
    let sessionId
    let desiredCap
    let session
    let expectedSessionInfor

    before(async function async() {
      await e2e.ensureAllDevicesAvaillable()
      desiredCap = await e2e.getFirstFoundActivatedCap()
      assert.isNotNull(cap, 'cap is not null')
    })

    it('should create a timeout test after run a timeout appium test', async function async() {
      sessionId = null
      // run dummy appium test
      const startedAt = moment.utc()
      sessionId = await e2e.executeTimeoutAutoTestSession(desiredCap)
      const endedAt = moment.utc()
      expectedSessionInfor = {
        startedAt,
        endedAt,
        duration: endedAt.diff(startedAt, 'seconds')
      }
      // verify test result
      assert.isNotNull(sessionId, 'sessionId is not null')
      session = await e2e.getSession(sessionId)
      assert.equal('TIMEOUT', session.endState)
    })

    it('should display timeout result on portal', () => {
      _verifyResultOnPortalPage({sessionId, session, desiredCap, expectedSessionInfor})
    })
  })

  /**
   * Make a test in progress then verify the actual outcome on portal
   */
  describe('verify test run with in progress status', () => {
    let sessionId
    let desiredCap
    let session
    let expectedSessionInfor
    let endTest

    before(async function async() {
      await e2e.ensureAllDevicesAvaillable()
      desiredCap = await e2e.getFirstFoundActivatedCap()
      assert.isNotNull(cap, 'cap is not null')
    })

    after(async function async() {
      if (endTest) {
        await endTest()
      }
    })

    it('should create an in progress test after run an inprogress appium test',
      async function async() {
        sessionId = null
        // run dummy appium test
        const startedAt = moment.utc()
        const inprogressTest = await e2e.executeInprogressAutoTestSession(desiredCap)
        sessionId = inprogressTest.sessionId
        endTest = inprogressTest.endTest
        const endedAt = moment.utc()
        expectedSessionInfor = {
          startedAt,
          endedAt,
          duration: endedAt.diff(startedAt, 'seconds')
        }
        // verify test result
        assert.isNotNull(sessionId, 'sessionId is not null')
        session = await e2e.getSession(sessionId)
        assert.isNull(session.endState)
      })

    it('should display in progress result on portal', () => {
      _verifyResultOnPortalPage({sessionId, session, desiredCap, expectedSessionInfor})
    })
  })

  /**
   * Make a test error then verify the actual outcome on portal
   */
  describe('verify test run with error status', () => {
    let sessionId
    let desiredCap
    let session
    let expectedSessionInfor

    before(async function async() {
      await e2e.ensureAllDevicesAvaillable()
      desiredCap = await e2e.getFirstFoundActivatedCap()
      assert.isNotNull(cap, 'cap is not null')
    })

    it('should create a error test after run an error appium test', async function async() {
      sessionId = null
      // run dummy appium test
      const startedAt = moment.utc()
      sessionId = await e2e.executeErrorAutoTestSession(desiredCap)
      const endedAt = moment.utc()
      expectedSessionInfor = {
        startedAt,
        endedAt,
        duration: endedAt.diff(startedAt, 'seconds')
      }
      // verify test result
      assert.isNotNull(sessionId, 'sessionId is not null')
      session = await e2e.getSession(sessionId)
      assert.equal('ERROR', session.endState)
    })

    it('should display error result on portal', () => {
      _verifyResultOnPortalPage({sessionId, session, desiredCap, expectedSessionInfor})
    })
  })

  function _verifyResultOnPortalPage({sessionId, session, desiredCap, expectedSessionInfor}) {
    assert.isNotNull(sessionId, 'sessionId is not null')
    e2e.loginPortal()

    const actualHeader = e2e.getHeaderDescription(sessionId)
    const actualMetaData = e2e.getMetaData(sessionId)
    const actualDeviceInfor = actualMetaData.deviceInformation
    const actualDesiredCap = actualMetaData.desiredCapability
    const actualSessionInfor = actualMetaData.sessionInformation
    const expectedHeader = _produceHeaderDescription(session)
    const expectedDeviceInfor = _produceDeviceInformation(session)

    _verifyHeaderDescription(actualHeader, expectedHeader)
    _verifyDeviceInformation(actualDeviceInfor, expectedDeviceInfor)
    _verifyDesiredCapability(actualDesiredCap, desiredCap)
    _verifySessionInformation(actualSessionInfor, expectedSessionInfor)
  }

  function _verifyHeaderDescription(actualHeader, expectedHeader) {
    debug.log('test-full-e2e:actual header', actualHeader)
    debug.log('test-full-e2e:expected header', expectedHeader)
    assert.equal(actualHeader.deviceName, expectedHeader.deviceName)
    assert.equal(actualHeader.modelName, expectedHeader.modelName)
    assert.equal(actualHeader.platform, expectedHeader.platform)
    assert.equal(actualHeader.state, expectedHeader.state)
  }

  function _verifyDeviceInformation(actualDeviceInfor, expectedDeviceInfor) {
    debug.log('test-full-e2e:actual device information', actualDeviceInfor)
    debug.log('test-full-e2e:expected device information', expectedDeviceInfor)
    assert.equal(actualDeviceInfor.deviceName, expectedDeviceInfor.deviceName)
    assert.equal(actualDeviceInfor.modelName, expectedDeviceInfor.modelName)
    assert.equal(actualDeviceInfor.platformName, expectedDeviceInfor.platformName)
    assert.equal(actualDeviceInfor.platformVersion, expectedDeviceInfor.platformVersion)
    assert.equal(actualDeviceInfor.browserName, expectedDeviceInfor.browserName)
    assert.equal(actualDeviceInfor.browserVersion, expectedDeviceInfor.browserVersion)
  }

  function _verifyDesiredCapability(actualCap, expectedCap) {
    debug.log('test-full-e2e:actual desired cap', actualCap)
    debug.log('test-full-e2e:expected desired cap', expectedCap)
    assert.equal(actualCap.deviceName, expectedCap.deviceName)
    assert.equal(actualCap.platformName, expectedCap.platformName)
    assert.equal(actualCap.platformVersion, expectedCap.platformVersion)
    assert.equal(actualCap.deviceName, expectedCap.deviceName)
    assert.equal(actualCap.browserName, expectedCap.browserName)
    assert.equal(actualCap.deviceOrientation, expectedCap.deviceOrientation)
  }

  function _verifySessionInformation(actualSession, expectedSession) {
    debug.log('test-full-e2e: expected duration', expectedSession.duration)
    debug.log('test-full-e2e: actual duration', actualSession.duration)
    const expectedDuration = expectedSession.duration
    const duration = actualSession.duration
    const actualDuration =
    parseInt((duration.match(/\d+h/g) | 0) * 3600 +
    (duration.match(/\d+m/g) | 0) * 60 +
    (duration.match(/\d+s/g) | 0))
    assert.isAtLeast(expectedDuration, actualDuration, 'actual duration should be <= expected')
  }

  function _produceHeaderDescription(session) {
    const platformName = session.executionData.actual.platformName
    const platformVersion = session.executionData.actual.platformVersion
    const platform = `${platformName} ${platformVersion}`
    return {
      deviceName: session.executionData.actual.deviceName,
      modelName: session.executionData.actual.modelName,
      platform,
      state: _getState(session.endState)
    }
  }

  function _produceDeviceInformation(session) {
    return {
      deviceName: session.executionData.actual.deviceName,
      modelName: session.executionData.actual.modelName,
      platformName: session.executionData.actual.platformName,
      platformVersion: session.executionData.actual.platformVersion,
      browserName: session.executionData.actual.installedBrowsers[0].name,
      browserVersion: session.executionData.actual.installedBrowsers[0].version
    }
  }

  function _getState(endState) {
    switch (endState) {
      case 'COMPLETE': return 'Complete'
      case 'TIMEOUT': return 'Timeout'
      case 'ERROR': return 'Error'
      default: return 'In progress'
    }
  }
})
