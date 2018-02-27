import {assert} from 'chai'
import moment from 'moment'
import {debug} from '@kobiton/core-util'
import BaseData from '../../browser/data'
import ManualData from './data'
import config from '../../../framework/config/test'
import LoginPage from '../../../framework/page-objects/portal/intro/login'

const expectedDurationInMinutes = config.expectedDurationInMinutes
const {username1: username, password1: password} = {...config}
let deviceGroup = config.device.group.toLowerCase()
let {deviceName, platformVersion} = ManualData.getADevice()
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
  const stayIdleTimeout = 360000 // 6 minutes
  const expectedDuration = expectedDurationInMinutes
  startedAt = moment.utc()

  before(() => {
    const loginPage = new LoginPage()
    loginPage.open()
    devicesPage = loginPage.login(username, password)
    if (deviceGroup === 'private') {
      if (username === 'pikachu') {
        deviceGroup = 'admin'
      }
      else if (devicesPage.isExistingOrg()) {
        devicesPage.getElementInOrg('private')
      }
      else {
        debug.log('There isn\'t a organization\'s device')
      }
    }
    const numOfOnlineDevices =
      devicesPage.getTotalOnlineDevices({
        group: deviceGroup, nameOfDevice: deviceName, platformVersionOfDevice: platformVersion
      })
    assert.isAtLeast(numOfOnlineDevices, 1, `Expected at least one online ${deviceName} device`)
    devicesPage.cleanUpFolder('images')
    devicesPage.cleanUpFolder('reports')
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
    platformVersion = parseFloat(platformVersion)
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

  it('should have correct format for counting time', () => {
    const timeRegex = manualPage.timeRegex()
    let time = manualPage.getCountingTime()
    assert.isTrue(timeRegex.test(time))

    // It causes automatically exit session on Firefox
    // Refresh page
    // manualPage.pause(2000)
    // manualPage.refreshPage()
    // manualPage.pause(2000)
    // time = manualPage.getCountingTime()
    // assert.isTrue(timeRegex.test(time))
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

    // Verify there is screenshot board
  it('should take screenshot', () => {
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
    if (config.browser.browserName === 'chrome') {
      startedAt = moment.utc()
      do {
        _doDeviceActions()
        endedAt = moment.utc()
        duration = endedAt.diff(startedAt, 'minutes')
      } while (duration < expectedDuration)
    }
  })

  it('should pinch or zoom successfully', async () => {
    let styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: rgb(97, 97, 97)'))
    manualPage.takeScreenshot('manual', 'beforePinchZoom')

    manualPage.clickButtonOnMenuBar('pinchButton')
    styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: white'))
    manualPage.takeScreenshot('manual', 'afterPinchZoom')

    manualPage.clickButtonOnMenuBar('touchButton')
    styleOfPinchButton = manualPage.getStyleOfButton('pinchButton')
    assert.isTrue(styleOfPinchButton.includes('fill: rgb(97, 97, 97)'))
    // eslint-disable-next-line max-len
    const result = await manualPage.compareImage('manual', 'beforePinchZoom', 'afterPinchZoom', 'beforeAndAfterPinchZoom')
    assert.isAtLeast(result.misMatchPercentage, 1)
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

  it('should record network activity', function () {
    if ((platformName === 'Android' && platformVersion >= 6) || platformName === 'iOS') {
      let styleOfRecordNetworkButton = manualPage.getStyleOfElement('styleRecordNetworkButton')
      assert.isTrue(styleOfRecordNetworkButton.includes('background-color: rgb(97, 97, 97)'))
      // Turn on recording network activity
      manualPage.recordNetworkActivity()
      assert.isTrue(manualPage.isContaining('recordingNetworkActivityMessage'))
      styleOfRecordNetworkButton = manualPage.getStyleOfElement('styleRecordingNetworkButton')
      assert.isTrue(styleOfRecordNetworkButton.includes('background-color: rgb(244, 67, 54)'))
      // Turn off recording network activity
      manualPage.stopRecordingNetworkActivity()
      assert.isTrue(manualPage.isContaining('endRecordNetworkActivityMessage'))
      styleOfRecordNetworkButton = manualPage.getStyleOfElement('styleRecordNetworkButton')
      assert.isTrue(styleOfRecordNetworkButton.includes('background-color: rgb(97, 97, 97)'))
    }
    else {
      debug.log('Kobiton hasn\'t supported record network activity on Android 4.x.x and 5.x.x')
      this.skip()
    }
  })

  it('should set device time zone successfully', function () {
    if (platformName === 'Android' && platformVersion >= 8) {
      debug.log('Kobiton hasn\'t supported set time zone on Android 8.x.x')
      this.skip()
    }
    else {
      // Verify Cancel action on set device time zone dialog
      const defaultTimezone = manualPage.getDefaultTimezone()
      assert.equal(defaultTimezone, 'Select a time zone')
      assert.isFalse(manualPage.isVisableButton('setTimezoneButton'))
      manualPage.elements.cancelSetTimezoneButton.click()

      manualPage.setDeviceTimezone('(GMT-10:00) Hawaii Time')
      assert.isTrue(manualPage.isContaining('setNewTimezoneStatus'))

      manualPage.setDeviceTimezone('(GMT+00:00) London')
      assert.isTrue(manualPage.isContaining('setNewTimezoneStatus'))
    }
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

  it('should show recent apps on Android device', async function () {
    if (platformName === 'Android') {
      manualPage.takeScreenshotPage('manual', 'beforeClickRecentApp')
      manualPage.showRecentApps()
      manualPage.takeScreenshotPage('manual', 'afterClickRecentApp')
      manualPage.elements.homeButton.click()
      manualPage.pause(2000)
      // eslint-disable-next-line max-len
      const result = await manualPage.compareImage('manual', 'beforeClickRecentApp', 'afterClickRecentApp', 'beforeAndAfterClickRecentApp')
      assert.isAtLeast(result.misMatchPercentage, 1)
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
    manualPage.touchOnCanvasScreen()
    manualPage.pause(3000)
    assert.isFalse(manualPage.isContaining('powerOffAlert'))

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

  it('should have function share manual testing screen', () => {
    manualPage.shareScreenView()
    // eslint-disable-next-line max-len
    assert.isTrue(manualPage.isContaining('shareSessionViewPopup'), 'There is no share screen pop up')
    assert.isTrue(manualPage.isContaining('linkShare'), 'There is no share link')
    assert.isTrue(manualPage.isContaining('copyLinkButton'), 'There is no copy link button')

    // Close share session pop up
    manualPage.elements.closeShareSessionPopUpButton.click()
    manualPage.pause(2000)
    assert.isFalse(manualPage.isContaining('shareSessionViewPopup'))
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

  it('should end session automatically afer staying idle for 5 minutes', () => {
    if (deviceGroup === 'private' || deviceGroup === 'admin') {
      const defaultValueCheckbox = manualPage.getStyleOfElement('attributeIdleCheckbox')
      // Verify default value is unchecked
      assert.isTrue(defaultValueCheckbox.includes('opacity 1000ms'))
      // Check on auto quick session after 5 minutes if you do not anything
      manualPage.clickIdleCheckbox()
    }
    manualPage.waitForIdlePopUp(stayIdleTimeout)
    assert.isTrue(manualPage.isContaining('idlePopUp'))
    manualPage.continueManualSession()
    assert.isFalse(manualPage.isContaining('idlePopUp'))
    manualPage.clickIdleCheckbox()
    manualPage.pause(1000)
  })

  it('should have checkbox Clean up device on private devices', () => {
    if (deviceGroup === 'private' || deviceGroup === 'admin') {
      const defaultValueCheckbox = manualPage.getStyleOfElement('attributeCleanUpCheckbox')
      assert.isTrue(defaultValueCheckbox.includes('opacity 1000ms'))
    }
    else {
      assert.isFalse(manualPage.isContaining('cleanUpCheckbox'))
    }
  })

  it('should change session name successfully', () => {
    manualPage.elements.idleCheckbox.click()
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
      manualPage.closeSystemMessage('dismissMessage')
      manualPage.pause(1000)
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
      appUrl = s3AppLink.concat('clipboard-app-debug.apk')
    }
    else {
      appUrl = s3AppLink.concat('iFixit.ipa')
    }
    manualPage.fillInAppUrlAndInstall(appUrl)
    manualPage.waitForInstallingAppDone(installAppTimeout)
    assert.isTrue(manualPage.isContaining('installedAppMessage'))
    manualPage.closeSystemMessage('dismissMessage')
    manualPage.pause(1000)
  })

  it('should copy paste on clipboard successfully', function () {
    if (platformName === 'Android' && config.browserName === 'firefox') {
      manualPage.copyAndPasteOnClipboard()
      manualPage.pause(10000)
      assert.isFalse(manualPage.isContaining('dismissMessage'))

      // Invalid text
      const value = BaseData.generateParagraphs(50)
      manualPage.copyAndPasteOnClipboard({textValue: value})
      manualPage.pause(5000)
      assert.isTrue(manualPage.isContaining('tooLongTextToPasteMessage'))
    }
    else {
      debug.log('Kobiton hasn\'t supported function copy paste on iOS devices')
      this.skip()
    }
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

  it('should show lives log', () => {
    assert.isTrue(manualPage.isContaining('liveLogsTab'))
    manualPage.elements.liveLogsTab.click()
    // Verify control buttons of live logs
    assert.isTrue(manualPage.isContaining('pauseButton'))
    assert.isTrue(manualPage.isContaining('clearLogsButton'))
    assert.isTrue(manualPage.isContaining('downloadLogsButton'))
    // Verify live logs is loading
    let styleOfGrid = manualPage.getStyleOfElement('liveLogsBoard')
    assert.isNotNull(styleOfGrid, 'There is not live logs')
    // Click pause live logs
    manualPage.elements.pauseButton.click()
    manualPage.pause(1000)
    // Verify live log is stopped loading
    const styleOfGridAtPausing = manualPage.getStyleOfElement('liveLogsBoard')
    manualPage.pause(5000)
    const styleOfGridAfterPausing = manualPage.getStyleOfElement('liveLogsBoard')
    assert.equal(styleOfGridAtPausing, styleOfGridAfterPausing)
    // Verify clear logs
    manualPage.elements.clearLogsButton.click()
    manualPage.pause(2000)
    assert.isFalse(manualPage.isContaining('liveLogsBoard'))
    // Verify live log is loading
    manualPage.elements.resumeButton.click()
    manualPage.pause(2000)
    styleOfGrid = manualPage.getStyleOfElement('liveLogsBoard')
    assert.notEqual(styleOfGrid, styleOfGridAfterPausing)
  })
})
