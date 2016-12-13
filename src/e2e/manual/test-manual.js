import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import {getConfig} from '../../core/config'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import {getADevice} from '../core/data'

const {filterDevice, deviceGroup, expectedDurationInMinutes} = getConfig()
const deviceName = filterDevice || getADevice().deviceName

describe('Manual feature: ', () => {

  const account = getConfig()
  const testerAccount = {
    username: account.emailOrUsername,
    password: account.password
  }
  // Acceptable different rate on comparing two images
  let devicesPage
  let manualPage
  let startedAt, endedAt
  let duration = 0
  const expectedDuration = expectedDurationInMinutes // Convert hours to minutes
  startedAt = moment.utc()

  before(() => {
    const loginPage = new LoginPage()
    loginPage.windowHandleMaximize()
    loginPage.open()
    devicesPage = loginPage.login(testerAccount)

    const numOfOnlineDevices =
      devicesPage.getTotalOnlineDevices({group: deviceGroup, deviceName})
    debug.log('test-manual: ', deviceName)
    assert.isAtLeast(numOfOnlineDevices, 1, `Expected at least one online ${deviceName} device`)
  })

  after(() => {
    if (manualPage) {
      manualPage.exitManual()
    }
  })

  it(`should launch a device with name ${deviceName}`, () => {
    manualPage = devicesPage.launchAnOnlineDevice({group: deviceGroup, deviceName})
    assert.isDefined(manualPage, `${deviceName}: should launch manual page`)
    manualPage.showHighRightPanelButton.click()
    const canvasSize = manualPage.screenCanvas.getElementSize()
    browser.setViewportSize(canvasSize, true)
    manualPage.waitForLoadingProgressDone()
    assert.isTrue(manualPage.powerButton.isEnabled())
    assert.isTrue(manualPage.homeButton.isEnabled())
    assert.isFalse(manualPage.isInitializing(), `${deviceName}: should initilize done`)
  })

  it(`should run in ${expectedDurationInMinutes} minutes with device: ${deviceName}`, () => {
    do {
      // To make sure every test will not be in initialzing device... status
      manualPage.waitForInitializingDeviceDone(120000)
      manualPage.startFpsCount()
      _doMenuBarActions()
      _doDeviceActions()
      // Do power action again to make sure that has atleast one time not in black screen
      _doMenuBarActions()
      _doDeviceActions()
      const frameCount = manualPage.stopFpsCount()

      assert.isAtLeast(frameCount, 1,
        `${deviceName} : frameCount should be atleast 1`)
      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'minutes')
    } while (duration < expectedDuration)
  })

  function _doMenuBarActions() {
    manualPage.waitForLoadingProgressDone()
    manualPage.powerButton.click()
    manualPage.volumeUpButton.click()
    manualPage.volumeDownButton.click()
    manualPage.pinchButton.click()
    manualPage.rotateButton.click()
    manualPage.touchButton.click()
    manualPage.takeScreenShotButton.click()
    manualPage.homeButton.click()
  }

  function _doDeviceActions() {
    manualPage.doSwipeRight()
    manualPage.doSwipeLeft()
    manualPage.doSwipeDown()
    manualPage.doSwipeUp()
    manualPage.doSwipeCrossRight()
    manualPage.doTouch({x: 1, y: 1})
  }

})
