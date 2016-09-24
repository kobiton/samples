import AuthenticatedPage from './authenticated'

const defaultElements = {
  commandsButton: '//div[(text()= "Commands")]',
  metadataButton: '//div[(text()= "Metadata")]',
  deviceImage: '//img[contains(@src,"devices")]',
  //COMMAND tab
  screenshotImage: '//img[contains(@src,"screenshots")]',
  noScreenShotLabel: '//div[text()="No Screenshot"]',
  //Label of header page
  modelLabel: '//div[(text()="Model: ")]',
  platformLabel: '//div[(text()="Platform: ")]',
  stateLabel: '//div[(text()="State: ")]',
  // Label of METADATA tab
  sessionInformationLabel: '//div[(text()="Session Information")]',
  deviceInformationLabel: '//div[(text()="Device Information")]',
  desiredcapabilitiesLabel: '//div[(text()="Desired Capabilities")]',
  startTimeLabel: '//div[(text()="Start time")]',
  endTimeLabel: '//div[(text()="End time")]',
  durationLabel: '//div[(text()="Duration")]',
  webdriverIdLabel: '//div[(text()="WebDriver ID")]',
  deviceNameLabel: '(//div[(text()="Device name")])[1]',
  deviceModelNameLabel: '//div[(text()="Model name")]',
  devicePlatformNameLabel: '(//div[(text()="Platform name")])[1]',
  devicePlatformVersionLabel: '(//div[(text()="Platform version")])[1]',
  deviceBrowserNameLabel: '(//div[(text()="Browser name")])[1]',
  deviceBrowserVersionLabel: '//div[(text()="Browser version")]',
  desiredDeviceNameLabel: '(//div[(text()="Device name")])[2]',
  desiredPlatformNameLabel: '(//div[(text()="Platform name")])[2]',
  desiredPlatformVersionLabel: '(//div[(text()="Platform version")])[2]',
  desiredBrowserNameLabel: '(//div[(text()="Browser name")])[2]',
  desiredDeviceOrientationLabel: '//div[(text()="Device orientation")]',
  desiredCaptureScreenshotLabel: '//div[(text()="Capture screenshot")]',
  // Text of header page
  deviceText: '(//div[text()="Model: "]/../../div)[1]',
  modelText: '//div[text()="Model: "]/../div[2]',
  platformText: '//div[text()="Platform: "]/../div[2]',
  stateText: '//div[text()="State: "]/../div[2]',
  //Text of METADATA tab
  startTimeText: '//div[text()="Start time"]/../div[2]',
  endTimeText: '//div[text()="End time"]/../div[2]',
  durationText: '//div[text()="Duration"]/../div[2]',
  webdriverIdText: '//div[text()="WebDriver ID"]/../div[2]',
  deviceNameText: '(//div[text()="Device name"]/../div[2])[1]',
  deviceModelNameText: '//div[text()="Model name"]/../div[2]',
  devicePlatformNameText: '(//div[text()="Platform name"]/../div[2])[1]',
  devicePlatformVersionText: '(//div[text()="Platform version"]/../div[2])[1]',
  deviceBrowserNameText: '(//div[text()="Browser name"]/../div[2])[1]',
  deviceBrowserVersionText: '(//div[text()="Browser version"]/../div[2])[1]',
  desiredDeviceNameText: '(//div[text()="Device name"]/../div[2])[2]',
  desiredPlatformNameText: '(//div[text()="Platform name"]/../div[2])[2]',
  desiredPlatformVersionText: '(//div[text()="Platform version"]/../div[2])[2]',
  desiredBrowserNameText: '(//div[text()="Browser name"]/../div[2])[2]',
  desiredDeviceOrientationText: '//div[text()="Device orientation"]/../div[2]',
  desiredCaptureScreenshotText: '//div[text()="Capture screenshot"]/../div[2]'
}

export default class SessionDetailPage extends AuthenticatedPage {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  open(sessionID) {
    super.open('sessions/' + sessionID)
  }

  hasScreenShot() {
    this.commandsButton.click()
    return this.screenshotImage.isExisting()
  }

  hasNoScreenShot() {
    this.commandsButton.click()
    return this.noScreenShotLabel.isExisting()
  }

  getHeaderDescription() {
    this.waitForLoadingProgressDone()
    return {
      deviceName: this.deviceText.getText(),
      modelName: this.modelText.getText(),
      platform: this.platformText.getText(),
      state: this.stateText.getText()
    }
  }

  getMetaData() {
    this.metadataButton.click()
    this.waitForLoadingProgressDone()
    return {
      sessionInformation: {
        startTime: this.startTimeText.getText(),
        endTime: this.endTimeText.getText(),
        duration: this.durationText.getText(),
        webDriverId: this.webdriverIdText.getText()
      },
      deviceInformation: {
        deviceName: this.deviceNameText.getText(),
        modelName: this.deviceModelNameText.getText(),
        platformName: this.devicePlatformNameText.getText(),
        platformVersion: this.devicePlatformVersionText.getText(),
        browserName: this.deviceBrowserNameText.getText(),
        browserVersion: this.deviceBrowserVersionText.getText()
      },
      desiredCapability: {
        deviceName: this.desiredDeviceNameText.getText(),
        platformName: this.desiredPlatformNameText.getText(),
        platformVersion: this.desiredPlatformVersionText.getText(),
        browserName: this.desiredBrowserNameText.getText(),
        deviceOrientation: this.desiredDeviceOrientationText.getText(),
        captureScreenshots: this.desiredCaptureScreenshotText.getText()
      }
    }
  }
}
