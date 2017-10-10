import {assert} from 'chai'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'

const expectedDurationInMinutes = config.expectedDurationInMinutes
const {username1: username, password1: password} = {...config}
const {name: deviceName, group: deviceGroup, version: platformVersion} = {...config.device}
describe(`Manual feature for ${deviceName}:${platformVersion} `, () => {
  let devicesPage
  let manualPage
  let platformName
  let startedAt, endedAt
  let duration = 0
  const initilizingTimeout = 180000 // 3 minutes
  const expectedDuration = expectedDurationInMinutes
  startedAt = moment.utc()

  before(() => {
    const loginPage = new LoginPage()
    loginPage.open()
    loginPage.windowHandleMaximize()
    devicesPage = loginPage.login(username, password)
    const numOfOnlineDevices =
      devicesPage.getTotalOnlineDevices({
        group: deviceGroup, nameOfDevice: deviceName, platformVersionOfDevice: platformVersion
      })
    assert.isAtLeast(numOfOnlineDevices, 1, `Expected at least one online ${deviceName} device`)
  })

  after(() => {
    if (manualPage) {
      manualPage.exitManual()
    }
  })

  it('should launch device succesfully', () => {
    manualPage = devicesPage.launchAnOnlineDevice({
      group: deviceGroup, nameOfDevice: deviceName, platformVersionOfDevice: platformVersion
    })
    assert.isDefined(manualPage, `${deviceName}: should launch manual page`)
    manualPage.waitForInitializingDeviceDone(initilizingTimeout)
    const urlPage = manualPage.getUrlPage()
    assert.include(urlPage, config.portalUrl.concat('/devices/launch?key='),
      'It has not launched a device yet')
  })

  it('should change quality successfully', () => {
    // Change to low quality
    manualPage.selectQuality('Low')
    assert.isTrue(manualPage.isContaining('lowQuality'))
    // Change to High quality
    manualPage.selectQuality('High')
    assert.isTrue(manualPage.isContaining('highQuality'))
    // Change to Medium quality
    manualPage.selectQuality('Medium')
    assert.isTrue(manualPage.isContaining('mediumQuality'))
  })

  it('should collapse or expand panel', () => {
    // Collapse panel
    manualPage.elements.collapsePanelButton.click()
    manualPage.pause(1000)
    assert.isTrue(manualPage.isContaining('expandPanelButton'))
    // Expand panel
    manualPage.elements.expandPanelButton.click()
    manualPage.pause(1000)
    assert.isTrue(manualPage.isContaining('collapsePanelButton'))
  })

  it('should take screenshot', () => {
    // Verify there isn't a screenshot was captured
    assert.isFalse(manualPage.isContaining('downloadScreenshotButton'))
    // Take screenshot
    manualPage.takeScreenShot('takeScreenShotButton')
    assert.isTrue(manualPage.isContaining('screenshotBoard'))
    assert.isTrue(manualPage.isContaining('downloadScreenshotButton'))
    // Verify there is a screenshot was captured
    assert.equal(manualPage.countScreenshots('downloadScreenshotButton'), 1)
    manualPage.pause(1000)
    manualPage.takeScreenShot('takeScreenShotButton')
    manualPage.takeScreenShot('takeScreenShotButton')
    manualPage.takeScreenShot('takeScreenShotButton')
    // Verify number of screenshots were captured
    assert.equal(manualPage.countScreenshots('downloadScreenshotButton'), 4)
  })

  it('should have default touch mode', () => {
    let styleOfTouchButton = manualPage.getStyleOfButton('touchButton')
    assert.isTrue(styleOfTouchButton.includes('fill: white'))
    let styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: rgb(97, 97, 97)'))
    startedAt = moment.utc()
    do {
      _doDeviceActions()
      endedAt = moment.utc()
      duration = endedAt.diff(startedAt, 'minutes')
    } while (duration < expectedDuration)
  })

  it('should pinch or zoom successfully', () => {
    let styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: rgb(97, 97, 97)'))

    manualPage.clickButtonOnMenuBar('pinchButton')
    styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: white'))

    manualPage.clickButtonOnMenuBar('touchButton')
    styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: rgb(97, 97, 97)'))
  })

  it('should rotate screen', () => {
    manualPage.rotateScreen()
    manualPage.rotateScreen()
  })

  it('should set device location successfully', () => {
    manualPage.setDeviceLocation({lat: '10.802216', long: '106.645714'})
    assert.isTrue(manualPage.isContaining('setNewLocationStatus'))
    manualPage.setDeviceLocation({lat: '-90', long: '-180'})
    assert.isTrue(manualPage.isContaining('setNewLocationStatus'))

    // Input wrong latitude
    manualPage.setDeviceLocation({lat: 'abc', long: '-180'})
    assert.isTrue(manualPage.isContaining('wrongLatitudeWarning'))
    assert.isFalse(manualPage.isVisableButton('setLocationButton'))
    manualPage.elements.cancelLocationButton.click()

    // Input wrong longitude
    manualPage.setDeviceLocation({lat: '23', long: '-180.32'})
    assert.isTrue(manualPage.isContaining('wrongLongitudeWarning'))
    assert.isFalse(manualPage.isVisableButton('setLocationButton'))
    manualPage.elements.cancelLocationButton.click()
  })

  it('should set device time zone successfully', () => {
    // Verify Cancel action on set device time zone dialog
    const defaultTimezone = manualPage.getDefaultTimezone()
    assert.equal(defaultTimezone, 'Select a time zone')
    assert.isFalse(manualPage.isVisableButton('setTimezoneButton'))
    manualPage.elements.cancelSetTimezoneButton.click()

    manualPage.setDeviceTimezone('(GMT-10:00) Hawaii Time')
    assert.isTrue(manualPage.isContaining('setNewTimezoneStatus'))

    manualPage.setDeviceTimezone('(GMT+00:00) London')
    assert.isTrue(manualPage.isContaining('setNewTimezoneStatus'))
  })

  it('should power off/on device', () => {
    // Turn off screen
    manualPage.clickButtonOnMenuBar('powerButton')
    manualPage.pause(3000)
    assert.isTrue(manualPage.isContaining('powerOffAlert'))
    // Dissmiss message
    manualPage.elements.dismissMessage.click()
    // Turn on screen
    manualPage.clickButtonOnMenuBar('powerButton')
    manualPage.pause(3000)
    assert.isFalse(manualPage.isContaining('powerOffAlert'))
  })

  it('should show recent apps', function () {
    platformName = manualPage.getPlatformNameInfo()
    if (platformName === 'Android') {
      manualPage.showRecentApps()
    }
    else {
      debug.log(`Menu action bar doesn't have recent apps button for ${platformName} device`)
      this.skip()
    }
  })

  it('should do actions on Home button', () => {
    platformName = manualPage.getPlatformNameInfo()
    // Turn off screen
    manualPage.clickButtonOnMenuBar('powerButton')
    manualPage.pause(3000)
    assert.isTrue(manualPage.isContaining('powerOffAlert'))
    // Click Home to turn on screen
    manualPage.clickButtonOnMenuBar('homeButton')
    manualPage.pause(3000)
    assert.isFalse(manualPage.isContaining('powerOffAlert'))
    // Turn off screen
    manualPage.clickButtonOnMenuBar('powerButton')
    manualPage.pause(3000)
    assert.isTrue(manualPage.isContaining('powerOffAlert'))
    // Turn on screen by touching on device screen
    manualPage.doTouch({x: 100, y: 100})
    manualPage.pause(3000)
    assert.isFalse(manualPage.isContaining('powerOffAlert'))

    const platformVersion = parseFloat(manualPage.getPlatformVersionInfo())
    if (platformName === 'iOS') {
      // Double Home on iOS device
      manualPage.elements.homeButton.doubleClick()
      manualPage.pause(3000)
      if (platformVersion > 10.3) {
        assert.isTrue(manualPage.isContaining('notSupportDoubleHomeMessage'))
      }
      // Long press on iOS device (TBD)
    }
  })

  it('should click back button successfully', function () {
    platformName = manualPage.getPlatformNameInfo()
    if (platformName === 'Android') {
      manualPage.turnBack()
    }
    else {
      debug.log(`Menu action bar doesn't have back button for ${platformName} device`)
      this.skip()
    }
  })

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
