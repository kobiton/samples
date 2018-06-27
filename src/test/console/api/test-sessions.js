import BPromise from 'bluebird'
import {assert} from 'chai'
import api from '../../../framework/api'
import config from '../../../framework/config/test'

describe('API / Sessions', () => {

  const androidDesiredCaps = {
    desiredCapabilities: {
      deviceGroup: 'KOBITON',
      deviceName: 'Galaxy',
      platformName: 'Android',
      browserName: 'chrome'
    }}

  const iOSDesiredCaps = {
    desiredCapabilities: {
      deviceGroup: 'KOBITON',
      deviceName: 'iPhone',
      platformName: 'iOS',
      browserName: 'safari'
    }}

  let androidSessionId, androidKSessionId
  let iOSSessionId, iOSKSessionId
  let androidDriver, iOSDriver

  const completeState = {state: 'Complete'}
  const passedState = {state: 'Passed'}
  const failedState = {state: 'Failed'}
  const runningState = {state: 'Running'}
  const terminatedState = {state: 'Terminated'}
  const errorState = {state: 'Error'}
  const timeoutState = {state: 'Timeout'}

  const onlineAndroid = {groupType: 'cloud', platformName: 'Android', deviceNumbers: 1}
  const onlineIOS = {groupType: 'cloud', platformName: 'iOS', deviceNumbers: 1}

  it('should verify a test session', async () => {
    const errorMsg1 = 'Could not update session'
    const errorMsg2 = 'Session state must be PASSED, FAILED or COMPLETE'

    // Init a test session on Android device
    const androidDevice = await api.Device.getDevices(onlineAndroid)
    assert.isAtLeast(androidDevice.length, 1, 'At least 1 device is online.')
    androidDesiredCaps.desiredCapabilities.deviceName = androidDevice[0].deviceName

    androidDriver = await api.Session.initSession(androidDesiredCaps)
    androidSessionId = androidDriver[0].sessionId
    androidKSessionId = androidDriver[0].value.kobitonSessionId

    await api.Session.getUrl(androidSessionId, {url: 'https://www.google.com'})

    // Try to change the state during running test
    let getSessionState = await api.Session.updateSessionInfo(androidKSessionId, completeState)
    assert.include(JSON.stringify(getSessionState), errorMsg1,
      'Could not update complete state during running test session.')

    getSessionState = await api.Session.updateSessionInfo(androidKSessionId, passedState)
    assert.include(JSON.stringify(getSessionState), errorMsg1,
      'Could not update passed state during running test session.')

    getSessionState = await api.Session.updateSessionInfo(androidKSessionId, failedState)
    assert.include(JSON.stringify(getSessionState), errorMsg1,
      'Could not update failed state during running test session.')

    getSessionState = await api.Session.updateSessionInfo(androidKSessionId, runningState)
    assert.include(JSON.stringify(getSessionState), errorMsg2,
      'Could not update running state during running test session.')

    getSessionState = await api.Session.updateSessionInfo(androidKSessionId, errorState)
    assert.include(JSON.stringify(getSessionState), errorMsg2,
      'Could not update error state during running test session.')

    getSessionState = await api.Session.updateSessionInfo(androidKSessionId, timeoutState)
    assert.include(JSON.stringify(getSessionState), errorMsg2,
      'Could not update timeout state during running test session.')

    getSessionState = await api.Session.updateSessionInfo(androidKSessionId, terminatedState)
    assert.include(JSON.stringify(getSessionState), errorMsg2,
      'Could not update terminated state during running test session.')

    await api.Session.deleteSession(androidSessionId)

    await BPromise.delay(5000) // Wait for status is updated.

    getSessionState = (await api.Session.getASession(androidKSessionId))[0].state
    assert.equal(getSessionState, 'COMPLETE', 'The complete state is set successfully.')

    // Update the state to passed
    await api.Session.updateSessionInfo(androidKSessionId, passedState)

    getSessionState = (await api.Session.getASession(androidKSessionId))[0].state
    assert.equal(getSessionState, 'PASSED', 'The passed state is set successfully.')

    // Update the state to failed
    await api.Session.updateSessionInfo(androidKSessionId, failedState)

    getSessionState = (await api.Session.getASession(androidKSessionId))[0].state
    assert.equal(getSessionState, 'FAILED', 'The failed state is set successfully.')

    const aSession = (await api.Session.getASession(androidKSessionId))[0]

    const deviceLogRegex = /sessions\/[0-9]+\/logs\/device[^\n]+.log/g
    const appiumLogRegex = /sessions\/[0-9]+\/logs\/appium[^\n]+.log/g
    const downloadRegex = /sessions\/[0-9]+\/logs\/[^\n]+.zip/g
    const videoRegex = /sessions\/[0-9]+\/videos\/Video[^\n]+.mp4/g

    // Verify Logs & Video are uploaded
    assert.match(aSession.executionData.log.previewPath, deviceLogRegex,
      'Device Log is uploaded successfully.')
    assert.match(aSession.executionData.log.appiumPreviewPath, appiumLogRegex,
      'Appium Log is uploaded successfully.')
    assert.match(aSession.executionData.log.downloadPath, downloadRegex,
      'Download link is generated successfully.')
    assert.match(aSession.executionData.video.path, videoRegex,
      'Video is uploaded successfully.')

    // Verify Appium Version & Node Version
    assert.isNotNull(aSession.executionData.versions.appiumVersion,
      'Appium Version is included on executionData')
    assert.isNotNull(aSession.executionData.versions.nodeVersion,
      'Appium Version is included on executionData')

    const sessionNameRegex = /Session created at (0|1)\d{1}\/((0|1|2)\d{1})\/((19|20)\d{2}) ([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)/g // eslint-disable-line max-len
    assert.match(aSession.executionData.desired.sessionName, sessionNameRegex,
      'Session Name is created as default "Session created at mm/dd/yyyy hh:mm AM|PM"')

    // Verify Screenshot's Commands
    const screenshotRegex = /sessions\/[^]+\/screenshots\/[^]+.jpg/g
    aSession.commands.forEach((c) => {
      let result
      while ((result = screenshotRegex.exec(c.screenshot)) !== null) {
        assert.equal(c.screenshot, result,
          'Screenshot is uploaded successfully.')
      }
    })
  })

  it('should verify terminated state', async () => {
    // Init a test session on iOS device
    const iOSDevice = await api.Device.getDevices(onlineIOS)
    assert.isAtLeast(iOSDevice.length, 1, 'At least 1 device is online.')
    iOSDesiredCaps.desiredCapabilities.deviceName = iOSDevice[0].deviceName

    iOSDriver = await api.Session.initSession(iOSDesiredCaps)
    iOSSessionId = iOSDriver[0].sessionId
    iOSKSessionId = iOSDriver[0].value.kobitonSessionId

    await api.Session.getUrl(iOSSessionId, {url: 'https://www.google.com'})
    await api.Session.terminateASession(iOSKSessionId)

    await BPromise.delay(5000) // Wait for status is updated.

    let getSessionState = (await api.Session.getASession(iOSKSessionId))[0].state
    assert.equal(getSessionState, 'TERMINATED', 'The terminated state is set successfully.')
  })

  it('should verify timeout state', async () => {
    // Init a test session on Android device
    const androidDevice = await api.Device.getDevices(onlineAndroid)
    assert.isAtLeast(androidDevice.length, 1, 'At least 1 device is online.')
    androidDesiredCaps.desiredCapabilities.deviceName = androidDevice[0].deviceName

    androidDriver = await api.Session.initSession(androidDesiredCaps)
    androidSessionId = androidDriver[0].sessionId
    androidKSessionId = androidDriver[0].value.kobitonSessionId

    if (config.portalUrl.includes('portal.kobiton.com')) {
      await BPromise.delay(1000 * 60 * 11) // In web testing, the timeout is 10 minutes.
    }
    else {
      await BPromise.delay(1000 * 60 * 4) // In web testing, the timeout is 3 minutes.
    }

    let getSessionState = (await api.Session.getASession(androidKSessionId))[0].state
    assert.equal(getSessionState, 'TIMEOUT', 'The timeout state is set successfully.')
  })

  it('should not upload screenshots if captureScreenshots is false', async () => {
    const androidDevice = await api.Device.getDevices(onlineAndroid)
    assert.isAtLeast(androidDevice.length, 1, 'At least 1 device is online.')
    androidDesiredCaps.desiredCapabilities.deviceName = androidDevice[0].deviceName
    androidDesiredCaps.desiredCapabilities.captureScreenshots = false

    androidDriver = await api.Session.initSession(androidDesiredCaps)

    androidSessionId = androidDriver[0].sessionId
    androidKSessionId = androidDriver[0].value.kobitonSessionId

    await api.Session.getUrl(iOSSessionId, {url: 'https://www.google.com'})
    await api.Session.deleteSession(androidSessionId)
    await BPromise.delay(5000)
    const aSession = (await api.Session.getASession(androidKSessionId))[0]
    aSession.commands.forEach((c) => {
      assert.isNull(c.screenshot, 'No screenshot is uploaded.')
    })
  })

})
