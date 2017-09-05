import {assert} from 'chai'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import ManualData from './data'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import config from '../../../framework/config/test'
import {writeSuccess} from '../../../framework/common/logger'

const {deviceName: filterDevice, deviceGroup} = {...config}
const expectedDurationInMinutes = config.expectedDurationInMinutes
const {screenQuality} = {...config.browser}
const {username1: username, password1: password} = {...config}
const {deviceName, platformVersion} = filterDevice
  ? {deviceName: filterDevice, platformVersion: 'none'} : ManualData.getADevice()
describe(`Manual feature for ${deviceName}:${platformVersion} `, () => {
  let devicesPage
  let manualPage
  let startedAt, endedAt
  let duration = 0
  const initilizingTimeout = 120000 // 2 minutes
  const expectedDuration = expectedDurationInMinutes
  startedAt = moment.utc()

  before(() => {
    const loginPage = new LoginPage()
    loginPage.windowHandleMaximize()
    loginPage.open()
    devicesPage = loginPage.login(username, password)
    const numOfOnlineDevices =
      devicesPage.getTotalOnlineDevices({group: deviceGroup, deviceName})
    assert.isAtLeast(numOfOnlineDevices, 1, `Expected at least one online ${deviceName} device`)
  })

  after(() => {
    if (manualPage) {
      manualPage.exitManual()
    }
  })

  it('should launch device', () => {
    manualPage = devicesPage.launchAnOnlineDevice({group: deviceGroup, deviceName})
    assert.isDefined(manualPage, `${deviceName}: should launch manual page`)
    manualPage.elements.showHighRightPanelButton.click()
    manualPage.waitForInitializingDeviceDone(initilizingTimeout)
    let canvasSize = manualPage.elements.canvasScreen.getElementSize()
    // Recalculate canvas width as screen width = canvas width * 130%
    const width = canvasSize.width
    canvasSize.width = width * 1.3
    browser.setViewportSize(canvasSize, true)
    manualPage.waitForLoadingProgressDone()
    // Set screen quality when we want to test screen quality
    manualPage.selectQuality(screenQuality)
    assert.isTrue(manualPage.elements.powerButton.isEnabled(), 'Power button should be enabled')
    assert.isTrue(manualPage.elements.homeButton.isEnabled(), 'Home button should be enabled')
    assert.isFalse(manualPage.isInitializing(), `${deviceName}: should initilize done`)
  })

  it(`should run in ${expectedDurationInMinutes} minutes`, () => {
    manualPage.startFpsCount()
    do {
      // To make sure every test will not be in initialzing device... status
      manualPage.waitForInitializingDeviceDone(initilizingTimeout)
      _doMenuBarActions()
      _doDeviceActions()
      // Do power action again to make sure that has atleast one time not in black screen
      _doMenuBarActions()
      _doDeviceActions()
      const frameCount = manualPage.resetFrameCount()

      assert.isAtLeast(frameCount, 1,
        `${deviceName} : frameCount should be atleast 1`)
      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'minutes')
    } while (duration < expectedDuration)
  })

  it('should have average fps less than or equal 10', () => {
    const averageFps = manualPage.getAverageFps()
    // This log is to write fps to log file
    writeSuccess(`${deviceName}-${platformVersion}-${averageFps}`, averageFps)
    debug.log('writeSuccess in testcase, averageFps', averageFps)
    debug.log('test-manual: average fps', `${deviceName}-${platformVersion}-${averageFps}`)
    assert.isAtMost(averageFps, 10,
        `${deviceName}:${platformVersion} has average fps ${averageFps}`)
  })

  function _doMenuBarActions() {
    manualPage.waitForLoadingProgressDone()
    if (manualPage.powerOffAlertExist()) {
      manualPage.elements.powerButton.waitForEnabled()
      manualPage.elements.powerButton.click()
    }
    // Wait for power or home button enabled
    browser.pause(2000)
    manualPage.elements.homeButton.click()
    // Do multiple actions on volume button
    manualPage.elements.volumeUpButton.click()
    manualPage.elements.volumeUpButton.click()
    manualPage.elements.volumeUpButton.click()
    manualPage.elements.volumeDownButton.click()
    manualPage.elements.volumeDownButton.click()
    manualPage.elements.volumeDownButton.click()

    manualPage.elements.pinchButton.click()
    manualPage.elements.rotateButton.click()
    manualPage.elements.touchButton.click()
    // TODO: add more script to verify captured screenshot
    manualPage.elements.takeScreenShotButton.click()
  }

  function _doDeviceActions() {
    manualPage.doSwipeRight()
    manualPage.doSwipeLeft()
    manualPage.doSwipeDown()
    manualPage.doSwipeUp()
    manualPage.doSwipeCrossRight()
    manualPage.doSwipeUp()
    manualPage.doTouch({x: 10, y: 10})
  }

})
