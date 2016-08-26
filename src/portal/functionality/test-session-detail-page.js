import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import initEnv from '../../core/init-environment'
import {testerAccount} from '../core/data'
import SessionDetailPage from '../../core/portal-pages/session-detail'
import * as portal from '../../core/portal-api'
import {debug} from '@kobiton/core-util'

describe('Verify Session Detail Page', () => {
  const loginPage = new LoginPage()
  let sessionDetailPage = new SessionDetailPage()
  let sessionID

  before(() => {
    loginPage.windowHandleMaximize()
    loginPage.open()
    loginPage.login(testerAccount)
  })

  it('should find at least one test session with captureScreenshots is true',
    async function async() {
      const session = await _getSession({captureScreenshots: true})
      debug.log('test-session-detail-page:', session)
      assert.isNotNull(session, 'Session should not null')
      sessionID = session.id
      assert.isNotNull(sessionID, 'Found at least one session ID')
    }
  )

  it('should display detail session test page ui', () => {
    assert.isNotNull(sessionID, 'Found at least one session ID')
    sessionDetailPage.open(sessionID)
    sessionDetailPage.waitForLoadingProgressDone()
    assert.isTrue(sessionDetailPage.commandsButton.isVisible())
    assert.isTrue(sessionDetailPage.metadataButton.isVisible())
    assert.isTrue(sessionDetailPage.deviceImage.isVisible())
    assert.isTrue(sessionDetailPage.screenshotImage.isVisible())
    assert.isTrue(sessionDetailPage.modelLabel.isVisible())
    assert.isTrue(sessionDetailPage.platformLabel.isVisible())
    assert.isTrue(sessionDetailPage.stateLabel.isVisible())
  })

  it('should display detail session test page ui on METADATA tab', () => {
    assert.isNotNull(sessionID, 'Found at least one session ID')
    sessionDetailPage.open(sessionID)
    sessionDetailPage.waitForLoadingProgressDone()
    sessionDetailPage.metadataButton.click()
    // Verify header description ui
    assert.isTrue(sessionDetailPage.sessionInformationLabel.isVisible())
    assert.isTrue(sessionDetailPage.deviceInformationLabel.isVisible())
    assert.isTrue(sessionDetailPage.desiredcapabilitiesLabel.isVisible())
    // Verify session information ui
    assert.isTrue(sessionDetailPage.startTimeLabel.isVisible())
    assert.isTrue(sessionDetailPage.endTimeLabel.isVisible())
    assert.isTrue(sessionDetailPage.durationLabel.isVisible())
    assert.isTrue(sessionDetailPage.webdriverIdLabel.isVisible())
    // Verify device information ui
    assert.isTrue(sessionDetailPage.deviceNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.deviceModelNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.devicePlatformNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.devicePlatformVersionLabel.isVisible())
    assert.isTrue(sessionDetailPage.deviceBrowserNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.deviceBrowserVersionLabel.isVisible())
    // Verify desired capability ui
    assert.isTrue(sessionDetailPage.desiredDeviceNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.desiredPlatformNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.desiredPlatformVersionLabel.isVisible())
    assert.isTrue(sessionDetailPage.desiredBrowserNameLabel.isVisible())
    assert.isTrue(sessionDetailPage.desiredDeviceOrientationLabel.isVisible())
    assert.isTrue(sessionDetailPage.desiredCaptureScreenshotLabel.isVisible())
  })

  it('should display screenshot when desiredCaptureScreenshot is true', () => {
    assert.isNotNull(sessionID, 'Found at least one session ID')
    sessionDetailPage.open(sessionID)
    sessionDetailPage.waitForLoadingProgressDone()
    const metaData = sessionDetailPage.getMetaData()
    assert.equal(metaData.desiredCapability.captureScreenshots, 'true')
    assert.isTrue(sessionDetailPage.hasScreenShot(), 'true if display screenshot')
  })

  async function _getSession({captureScreenshots = true}) {
    const env = await initEnv()
    debug.log('test-session-detail-page: captureScreenshots', captureScreenshots)
    const sessions = await portal.getSessions({token: env.userInfo.token, page: 1, size: 20})
    return sessions.find((session) => {
      return session.executionData.desired.captureScreenshots === captureScreenshots
    })
  }
})
