import {assert} from 'chai'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'

const expectedDurationInMinutes = config.expectedDurationInMinutes
const {username1: username, password1: password} = {...config}
const {name: deviceName, group: deviceGroup, version: platformVersion} = {...config.device}
const s3AppLink = 'https://s3-ap-southeast-1.amazonaws.com/kobiton-devvn/apps-test/demo/'
describe(`Manual feature for ${deviceName}:${platformVersion} `, () => {
  let devicesPage
  let manualPage
  let platformName
  let startedAt, endedAt
  let duration = 0
  let appTestPath
  const initilizingTimeout = 180000 // 3 minutes
  const installAppTimeout = 180000 // 3 minutes
  const uploadScreenshotTimeout = 60000 // 1 minute
  const expectedDuration = expectedDurationInMinutes
  startedAt = moment.utc()

  before(() => {
    const loginPage = new LoginPage()
    loginPage.open()
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

  it('should launch device successfully', () => {
    manualPage = devicesPage.launchAnOnlineDevice({
      group: deviceGroup, nameOfDevice: deviceName, platformVersionOfDevice: platformVersion
    })
    assert.isDefined(manualPage, `${deviceName}: should launch manual page`)
    manualPage.waitForInitializingDeviceDone(initilizingTimeout)
    const urlPage = manualPage.getUrlPage()
    assert.include(urlPage, config.portalUrl.concat('/devices/launch?key='),
      'It has not launched a device yet')
    platformName = manualPage.getPlatformNameInfo()
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
    // Verify there is screenshot board
    assert.isTrue(manualPage.isContaining('screenshotBoard'))

    // Verify there isn't a screenshot was captured
    assert.isFalse(manualPage.isContaining('downloadScreenshotButton'))

    // Take screenshot
    manualPage.takeScreenShot()
    // Verify there is a screenshot was captured
    assert.equal(manualPage.countElements('downloadScreenshotButton'), 1)
    manualPage.pause(1000)

    manualPage.takeScreenShot()
    manualPage.takeScreenShot()
    manualPage.takeScreenShot()
    manualPage.waitForUploadScreenshotDone(uploadScreenshotTimeout)
    // Verify number of screenshots were captured
    assert.equal(manualPage.countElements('downloadScreenshotButton'), 4)
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
    if (platformName === 'Android') {
      manualPage.showRecentApps()
    }
    else {
      debug.log(`Menu action bar doesn't have recent apps button for ${platformName} device`)
      this.skip()
    }
  })

  it('should do actions on Home button', () => {
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

  it('should change session name successfully', () => {
    // Verify default session name
    const dateTimeRegex = manualPage.dateTimeRegex()
    const defaultSessionName = manualPage.getSessionName()
    assert.isTrue(dateTimeRegex.test(defaultSessionName))
    assert.include(defaultSessionName, 'Session created at')

    // Edit session name with invalid value
    manualPage.editSessionName('test')
    assert.isTrue(manualPage.isContaining('invalidSessionNameMessage'))
    manualPage.closeSystemMessage('closeInvalidSessionNameWarningButton')
    // eslint-disable-next-line max-len
    manualPage.editSessionName('Our platform gives developers and businesses access to the real mobile devices they want and manage the devices they own')
    assert.isTrue(manualPage.isContaining('invalidSessionNameMessage'))
    manualPage.closeSystemMessage('closeInvalidSessionNameWarningButton')

    // Edit session name with valid value
    manualPage.editSessionName('Kobiton test 12/4$5)')
    assert.isFalse(manualPage.isContaining('invalidSessionNameMessage'))
    const sessionName = manualPage.getSessionName()
    assert.equal(sessionName, 'Kobiton test 12/4$5)')

    // Verify message required session name
    manualPage.inputEmptySessionName(' ')
    assert.isTrue(manualPage.isContaining('requiredSessionNameMessage'))
  })

  it('should change session description successfully', () => {
    // Verify default description
    const defaultDescription = manualPage.getSessionDescription()
    assert.equal(defaultDescription, 'Edit session description')

    // Edit session description
    manualPage.editSessionDescription('description')
    const sessionDescription = manualPage.getSessionDescription()
    assert.equal(sessionDescription, 'description')
  })

  it('should download app to local file successfully', async function () {
    let urlApp
    if (platformName === 'Android') {
      urlApp = s3AppLink.concat('iFixit.apk')
    }
    else {
      urlApp = s3AppLink.concat('iFixit.ipa')
    }
    appTestPath = await manualPage.getAppPath(urlApp)
    // Purpose of this test is just download app and save in local machine
    this.skip()
  })

  it('should install app from local file', function () {
    if (appTestPath) {
      manualPage.pause(2000)
      manualPage.chooseFileFromLocalFile(appTestPath)
      manualPage.waitForInstallingAppDone(installAppTimeout)
      assert.isTrue(manualPage.isContaining('installedAppMessage'))
    }
    else {
      debug.log('There isn\'t an app in the apps-test folder to install')
      this.skip()
    }
  })

  it('should install app from url successfully', () => {
    let appUrl
    // Input invalid url
    appUrl = s3AppLink.concat('result_smoke_test_prod.txt.zip')
    manualPage.fillInAppUrlAndInstall(appUrl)
    manualPage.waitForInstallingAppDone(installAppTimeout)
    assert.isTrue(manualPage.isContaining('failedToInstallAppMessage'))
    manualPage.closeSystemMessage('dismissMessage')
    manualPage.pause(1000)

    // Input valid url
    if (platformName === 'Android') {
      appUrl = s3AppLink.concat('iFixit.apk')
    }
    else {
      appUrl = s3AppLink.concat('iFixit.ipa')
    }
    manualPage.fillInAppUrlAndInstall(appUrl)
    manualPage.waitForInstallingAppDone(installAppTimeout)
    assert.isTrue(manualPage.isContaining('installedAppMessage'))
  })

  it('should install app from App repository successfully', function () {
    const numberOfAppToInstall = manualPage.countElements('appTags')
    if (numberOfAppToInstall > 0) {
      const orderOfValidApp = Math.floor(Math.random() * numberOfAppToInstall) + 1
      manualPage.installAppFromAppRepo(orderOfValidApp.toString())
      manualPage.waitForInstallingAppDone(installAppTimeout)
      assert.isTrue(manualPage.isContaining('installedAppMessage'))
    }
    else {
      debug.log('There isn\'t an app in App Repo to install')
      this.skip()
    }
  })

})
