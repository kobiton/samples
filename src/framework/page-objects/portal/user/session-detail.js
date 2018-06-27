import Paging from '../../portal/paging'

const elements = {
  backButton: '//div[text()="Session Overview"]/ancestor::div[4]/div[1]',
  sessionOverview: {
    basePath: '//div[text()="Session name"]/../..',
    sessionOverviewTab: '(//button/div/div)[1]',
    name: '//div[text()="Session name"]/../../div[1]/div[2]//span',
    editNameButton: '//div[text()="Session name"]/../../div[1]/div[2]//button',
    nameInput: '//div[text()="Session name"]/../../div[1]/div[2]//input',
    //locator displays when session name is set to unacceptable value
    errorMessage: '//div[text()="Session name"]/../../div[1]/div[2]//input/../div[3]',
    description: '//div[text()="Session name"]/../../div[2]/div[2]//span',
    editDescriptionButton: '//div[text()="Session name"]/../../div[2]/div[2]//button',
    descriptionInput: '//div[text()="Session name"]/../../div[2]/div[2]//input',
    type: '//div[text()="Session name"]/../../div[3]//span/parent::div',
    user: '//div[text()="Session name"]/../../div[3]//div[text()="User"]/../div[2]',
    duration: '//div[text()="Session name"]/../../div[4]/div[1]/div[2]',
    status: '//div[text()="Session name"]/../../div[4]/div[2]/div[2]',
    startTime: '//div[text()="Session name"]/../../div[5]/div[1]/div[2]',
    endTime: '//div[text()="Session name"]/../../div[5]/div[2]/div[2]',
    image: '//div[div/text()="Manufacturer"]/../../div[1]/img',
    manufacturer: '//div[div/text()="Manufacturer"]/div[2]',
    deviceName: '//div[div/text()="Manufacturer"]/../div[2]/div[2]',
    modelName: '//div[div/text()="Manufacturer"]/../div[3]/div[2]',
    resolution: '//div[div/text()="Manufacturer"]/../div[4]/div[2]',
    installedAppsInfo: {
      installedAppsLabel: '//div[text()="Apps Installed Info"]',
      apps: '//div[text()="Apps Installed Info"]/../div[2]/div/div'
    },
    harFilesInfo: {
      harLabel: '//div[text()="Network Activity Captured (HAR file)"]',
      harFiles: '//div[text()="Network Activity Captured (HAR file)"]/../div[2]/div/div'
    },
    automationInfo: {
      automationInfoLabel: '//div[text()="Automation Info"]',
      webDriverID: '//div[text()="Automation Info"]/../div[2]/div[1]/div/div[2]',
      capturedScreenshot: '//div[text()="Automation Info"]/../div[2]/div[2]/div[1]/div[1]/div[2]',
      deviceOrientation: '//div[text()="Automation Info"]/../div[2]/div[2]/div[1]/div[2]/div[2]',
      appiumVersion: '//div[text()="Automation Info"]/../div[2]/div[2]/div[2]/div[1]/div[2]',
      nodeJSVersion: '//div[text()="Automation Info"]/../div[2]/div[2]/div[2]/div[2]/div[2]'
    },
    successfulMessage: '//span[contains(text(), "Session has been updated successfully")]',
    failureMessage: '//*[@id="app"]/div/div/div[2]/div[1]/div[2]//span[text()]'
  },
  actionsPerformed: {
    actionsPerformedTab: '//div[text()="Actions Performed"]',
    actionsList: '//div[text()="Step"]/../../div',
    actionImage: '//canvas',
    downloadImageAnimation: '//canvas/../div'
  },
  httpCommands: {
    httpCommandsTab: '//div[text()="HTTP Commands"]',
    commandsList: '//div[text()="Step"]/../../div',
    image: '//canvas',
    requestBodyLabel: '//div[text()="Step"]/../../../../div[2]/div[1]/div[1]//h3',
    requestBodyPreview: '//div[text()="Step"]/../../../../div[2]/div[1]/div[1]//*[name()="pre"]',
    responseBodyLabel: '//div[text()="Step"]/../../../../div[2]/div[1]/div[2]//h3',
    responseBodyPreview: '//div[text()="Step"]/../../../../div[2]/div[1]/div[2]//*[name()="pre"]'
  },
  video: {
    videoTab: '//div[text()="Video"]',
    sizeLabel: '//video/../../../div[1]/span',
    downloadButton: '//video/../../../div[1]/a',
    videoScreen: '//video'
  },
  logs: {
    logsTab: '//div[text()="Logs"]',
    deviceLogLabel: '//*[text()="Device"]',
    deviceLogPreview: '//*[text()="Device"]/../../../..//pre',
    appiumLogLabel: '//*[text()="Appium"]/../../../..//button',
    appiumLogPreview: '//*[text()="Appium"]/../../../..//pre',
    downloadButton: '//*[text()="Device"]/../../../../../../div[1]/a'
  }
}

const videoLocatorQuery = 'video'

const tabsEnum = {
  SESSION_OVERVIEW: 'SESSION_OVERVIEW',
  ACTIONS_PERFORMED: 'ACTIONS_PERFORMED',
  HTTP_COMMANDS: 'HTTP_COMMANDS',
  VIDEO: 'VIDEO',
  LOGS: 'LOGS'
}

const areasEnum = {
  REQUEST_BODY: 'REQUEST_BODY',
  RESPONSE_BODY: 'RESPONSE_BODY',
  DEVICE: 'DEVICE',
  APPIUM: 'APPIUM'
}

export default class SessionDetailsPage extends Paging {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  openSession(sessionID) {
    super.open(`sessions/${sessionID}`)
  }

  /** Open tab corresponding given tab name
  * @param tabName {string}
  */
  navigateTo(tabName) {
    switch (tabName.toUpperCase()) {
      case tabsEnum.SESSION_OVERVIEW:
        this._browser.click(elements.sessionOverview.sessionOverviewTab)
        break
      case tabsEnum.ACTIONS_PERFORMED:
        this._browser.click(elements.actionsPerformed.actionsPerformedTab)
        break
      case tabsEnum.HTTP_COMMANDS:
        this._browser.click(elements.httpCommands.httpCommandsTab)
        break
      case tabsEnum.VIDEO:
        this._browser.click(elements.video.videoTab)
        break
      case tabsEnum.LOGS:
        this._browser.click(elements.logs.logsTab)
        break
    }
  }

  /**
  * Get back the sessions page by clicking on back button in session details page
  */
  getBackSessionListPage() {
    this._browser.click(elements.backButton)
    this.waitForLoadingProgressDone()
  }

  /**
  * Get list of sessions
  * Return a key object of session details info
  */
  getSessionDetails() {
    let sessionInfo = {}
    sessionInfo.SessionOverview = this.getSessionOverview()
    if (this._isManualSession()) {
      sessionInfo.ActionsPerformed = this.getCommands()
    }
    else {
      sessionInfo.HttpCommands = this.getCommands()
    }
    sessionInfo.Video = this.getVideoInfo()
    sessionInfo.Logs = this.getLogsInfo()
    return sessionInfo
  }

  /**
  * Get session overview info
  * Return a key object of session overview info
  */
  getSessionOverview() {
    let sessionOverview = {}
    sessionOverview.Name = this._browser.getText(elements.sessionOverview.name)
    sessionOverview.Description = this._browser.getText(elements.sessionOverview.description)
    sessionOverview.Type = this._browser.getText(elements.sessionOverview.type)
    sessionOverview.Duration = this._browser.getText(elements.sessionOverview.duration)
    sessionOverview.Status = this._browser.getText(elements.sessionOverview.status)
    sessionOverview.StartTime = this._browser.getText(elements.sessionOverview.startTime)
    sessionOverview.EndTime = this._browser.getText(elements.sessionOverview.endTime)
    sessionOverview.DeviceInfo = this._getDeviceInfo()
    if (this._isExisting(elements.sessionOverview.user)) {
      sessionOverview.User = this._browser.getText(elements.sessionOverview.user)
    }
    if (this._isExisting(elements.sessionOverview.harFilesInfo.harLabel)) {
      sessionOverview.harFiles = this._getHarFilesInfo()
    }
    if (this._isExisting(elements.sessionOverview.automationInfo.automationInfoLabel)) {
      sessionOverview.AutomationInfo = this._getAutomationInfo()
    }
    if (this._isExisting(elements.sessionOverview.installedAppsInfo.installedAppsLabel)) {
      sessionOverview.InstalledApps = this._getInstalledAppsInfo()
    }
    return sessionOverview
  }

  /**
  * Get device info in a session details
  * Return a key object of device info
  */
  _getDeviceInfo() {
    let deviceInfo = {}
    deviceInfo.Manufacture = this._browser.getText(elements.sessionOverview.manufacturer)
    deviceInfo.DeviceName = this._browser.getText(elements.sessionOverview.deviceName)
    deviceInfo.ModelName = this._browser.getText(elements.sessionOverview.modelName)
    deviceInfo.Resolution = this._browser.getText(elements.sessionOverview.resolution)
    deviceInfo.ImageLink = this._browser.getAttribute(elements.sessionOverview.image, 'src')
    return deviceInfo
  }

  /**
  * Get automation info in a session details
  * Return a key object of automation info
  */
  _getAutomationInfo() {
    let automationInfo = {}
    // eslint-disable-next-line max-len
    automationInfo.WebDriverID = this._browser.getText(elements.sessionOverview.automationInfo.webDriverID)
    // eslint-disable-next-line max-len
    automationInfo.CaptureScreenshot = this._browser.getText(elements.sessionOverview.automationInfo.capturedScreenshot)
    // eslint-disable-next-line max-len
    automationInfo.DeviceOrentation = this._browser.getText(elements.sessionOverview.automationInfo.deviceOrientation)
    // eslint-disable-next-line max-len
    automationInfo.AppiumVersion = this._browser.getText(elements.sessionOverview.automationInfo.appiumVersion)
    // eslint-disable-next-line max-len
    automationInfo.NodeJSVersion = this._browser.getText(elements.sessionOverview.automationInfo.nodeJSVersion)
    return automationInfo
  }

  /**
  * Get har file info in a session details
  * Return an array of har file info
  */
  _getHarFilesInfo() {
    const harFileElements = this.getElements(elements.sessionOverview.harFilesInfo.harFiles)
    let harFilesInfo = {}
    let harFilesList = []
    if (harFileElements.length > 1) {
      for (let i = 2; i <= harFileElements.length; i++) {
        // eslint-disable-next-line max-len
        harFilesInfo.StartTime = this._browser.getText(`${elements.sessionOverview.harFilesInfo.harFiles}[${i}]/div[1]`)
        // eslint-disable-next-line max-len
        harFilesInfo.EndTime = this._browser.getText(`${elements.sessionOverview.harFilesInfo.harFiles}[${i}]/div[2]`)
        // eslint-disable-next-line max-len
        harFilesInfo.DurationAndSize = this._browser.getText(`${elements.sessionOverview.harFilesInfo.harFiles}[${i}]/div[3]`)
        // eslint-disable-next-line max-len
        harFilesInfo.DownloadLink = this._browser.getAttribute(`${elements.sessionOverview.harFilesInfo.harFiles}[${i}]/div[4]/a`, 'href')
        harFilesList.push(harFilesInfo)
        harFilesInfo = {}
      }
    }
    return harFilesList
  }

  /**
  * Get installed apps info in a session details
  * Return an array of installed app info
  */
  _getInstalledAppsInfo() {
    const appElements = this.getElements(elements.sessionOverview.installedAppsInfo.apps)
    let appInfo = {}
    let appsList = []
    if (appElements.length > 1) {
      for (let i = 2; i <= appElements.length; i++) {
        // eslint-disable-next-line max-len
        appInfo.Name = this._browser.getText(`${elements.sessionOverview.installedAppsInfo.apps}[${i}]/div[1]`)
        // eslint-disable-next-line max-len
        appInfo.SizeAndVersion = this._browser.getText(`${elements.sessionOverview.installedAppsInfo.apps}[${i}]/div[2]`)
        // eslint-disable-next-line max-len
        appInfo.PackageName = this._browser.getText(`${elements.sessionOverview.installedAppsInfo.apps}[${i}]/div[3]`)
        // eslint-disable-next-line max-len
        appInfo.Status = this._browser.getText(`${elements.sessionOverview.installedAppsInfo.apps}[${i}]/div[4]`)
        appsList.push(appInfo)
        appInfo = {}
      }
    }
    return appsList
  }

  /**
  * Change session name in session details page
  * @param newName {string}
  */
  editSessionName(newName) {
    this._browser.click(elements.sessionOverview.editNameButton)
    this.pause(1000)
    this._browser.setValue(elements.sessionOverview.nameInput, newName)
    this._browser.click(elements.sessionOverview.sessionOverviewTab)
  }

  /**
  * Change session description in session details page
  * @param newDescription {string}
  */
  editSessionDescription(newDescription) {
    this._browser.click(elements.sessionOverview.editDescriptionButton)
    this._browser.setValue(elements.sessionOverview.descriptionInput, newDescription)
    this._browser.click(elements.sessionOverview.sessionOverviewTab)
  }

  /**
  * Get notification message
  * Return notification message
  */
  getNotificationMessage() {
    let message
    this.pause(1500)
    if (this._isExisting(elements.sessionOverview.successfulMessage)) {
      message = this._browser.getText(elements.sessionOverview.successfulMessage)
    }
    if (this._isExisting(elements.sessionOverview.failureMessage)) {
      message = this._browser.getText(elements.sessionOverview.failureMessage)
    }
    return message
  }

  /**
  * Get a list of commands from session details page
  * Return an array of commands info
  */
  getCommands() {
    let actionElements
    let actionInfo = {}
    let actionsList = []
    let pageNumber = 1
    if (this._isManualSession()) {
      this.navigateTo(tabsEnum.ACTIONS_PERFORMED)
      const totalPages = this.getTotalPages()
      while (pageNumber <= totalPages) {
        actionElements = this.getElements(elements.actionsPerformed.actionsList)
        if (actionElements.length > 1) {
          for (let i = 2; i <= actionElements.length; i++) {
            this._selectPerformedActionStep(i - 1)
            // eslint-disable-next-line max-len
            actionInfo.Step = this._browser.getText(`${elements.actionsPerformed.actionsList}[${i}]/div[1]`)
            // eslint-disable-next-line max-len
            actionInfo.Action = this._browser.getText(`${elements.actionsPerformed.actionsList}[${i}]/div[2]`)
            // eslint-disable-next-line max-len
            actionInfo.Timestamp = this._browser.getText(`${elements.actionsPerformed.actionsList}[${i}]/div[3]`)
            actionInfo.Screenshot = this._getActionImage()
            actionsList.push(actionInfo)
            actionInfo = {}
          }
        }
        if (this.isClickableButton('NEXT')) {
          this.moveToPage('NEXT')
        }
        pageNumber++
      }
    }
    else {
      this.navigateTo(tabsEnum.HTTP_COMMANDS)
      const totalPages = this.getTotalPages()
      while (pageNumber <= totalPages) {
        actionElements = this.getElements(elements.actionsPerformed.actionsList)
        if (actionElements.length > 1) {
          for (let i = 2; i <= actionElements.length; i++) {
            this._selectPerformedActionStep(i - 1)
            // eslint-disable-next-line max-len
            actionInfo.Step = this._browser.getText(`${elements.httpCommands.commandsList}[${i}]/div[1]`)
            // eslint-disable-next-line max-len
            actionInfo.Method = this._browser.getText(`${elements.httpCommands.commandsList}[${i}]/div[2]`)
            // eslint-disable-next-line max-len
            actionInfo.Path = this._browser.getText(`${elements.httpCommands.commandsList}[${i}]/div[3]`)
            // eslint-disable-next-line max-len
            actionInfo.Duration = this._browser.getText(`${elements.httpCommands.commandsList}[${i}]/div[4]`)
            actionInfo.RequestBody = this._getBodyData(areasEnum.REQUEST_BODY)
            actionInfo.ResponseBody = this._getBodyData(areasEnum.RESPONSE_BODY)
            actionInfo.Screenshot = this._getActionImage()
            actionsList.push(actionInfo)
            actionInfo = {}
          }
        }
        if (this.isClickableButton('NEXT')) {
          this.moveToPage('NEXT')
        }
        pageNumber++
      }
    }
    return actionsList

  }

  /**
  * Get video info in session details page
  * Return a key object consist of video info
  */
  getVideoInfo() {
    this.navigateTo(tabsEnum.VIDEO)
    let videoInfo = {}
    if (this._isExisting(elements.video.videoScreen)) {
      videoInfo.Size = this._browser.getText(elements.video.sizeLabel)
      videoInfo.VideoLink = this._browser.getAttribute(elements.video.videoScreen, 'src')
    }
    return videoInfo
  }

  /**
  * Get logs info in session details page
  * Return a key object consist of logs info
  */
  getLogsInfo() {
    this.navigateTo(tabsEnum.LOGS)
    let logsInfo = {}
    if (this._isExisting(elements.logs.downloadButton)) {
      logsInfo.DownloadLink = this._browser.getAttribute(elements.logs.downloadButton, 'href')
      logsInfo.DevicePreviewLog = this._browser.getText(elements.logs.deviceLogPreview)
    }
    if (this._isExisting(elements.logs.appiumLogLabel)) {
      logsInfo.AppiumPreviewLog = this._browser.getText(elements.logs.appiumLogPreview)
    }
    return logsInfo
  }

  /**
  * Select on a given step base on list of commands in session details
  * @param stepNumber {int}
  */
  _selectPerformedActionStep(stepNumber) {
    const number = parseInt(stepNumber) + 1
    if (this._isExisting(elements.actionsPerformed.actionsList)) {
      this._browser.click(`${elements.actionsPerformed.actionsList}[${number}]`)
      this.waitForLoadingProgressDone()
    }
  }

  /**
  * Get image path of a command
  * Return the image path
  */
  _getActionImage() {
    let imgPath
    if (this._isExisting(elements.actionsPerformed.actionImage)) {
      // eslint-disable-next-line max-len
      imgPath = this._browser.getAttribute(`${elements.actionsPerformed.actionImage}/parent::div/img`, 'src')
    }
    else {
      imgPath = 'No Screenshot'
    }
    return imgPath
  }

  /**
  * Check if it is a manual session
  * Return a boolean
  */
  _isManualSession() {
    return this.getSessionOverview().Type === 'Manual'
  }

  /**
  * Get request and response data in auto session, it is used for auto session only
  * @param tabName {string} - ResquestBody or ResponseBody
  * Return a body data
  */
  _getBodyData(tabName) {
    let data = {}
    if (this._hasBodyData(tabName)) {
      this._collapseTab(tabName)
      switch (tabName.toUpperCase()) {
        case areasEnum.REQUEST_BODY:
        // eslint-disable-next-line max-len
          data = this._browser.getText(elements.httpCommands.requestBodyPreview).replace(/[\n_]/g, '')
          break
        case areasEnum.RESPONSE_BODY:
        // eslint-disable-next-line max-len
          data = this._browser.getText(elements.httpCommands.responseBodyPreview).replace(/[\n_]/g, '')
          break
      }
    }
    return data

  }

  /**
  * Check if a given tab has body data, it is used for auto session only
  * @param tabName {string} - ResquestBody or ResponseBody
  * Return a boolean
  */
  _hasBodyData(tabName) {
    let result = false
    switch (tabName.toUpperCase()) {
      case areasEnum.REQUEST_BODY:
      // eslint-disable-next-line max-len
        result = !this._browser.getText(elements.httpCommands.requestBodyLabel).includes('No request body')
        break
      case areasEnum.RESPONSE_BODY:
      // eslint-disable-next-line max-len
        result = !this._browser.getText(elements.httpCommands.responseBodyLabel).includes('No response body')
        break
    }
    return result

  }

  /**
  * Check if a given tab has been expanded
  * @param tabName {string} - ResquestBody or ResponseBody or Device or Appium
  * Return a boolean
  */
  _isTabExpanded(tabName) {
    let result = false
    switch (tabName.toUpperCase()) {
      case areasEnum.REQUEST_BODY:
        result = this._isExisting(elements.httpCommands.requestBodyPreview)
        break
      case areasEnum.RESPONSE_BODY:
        result = this._isExisting(elements.httpCommands.responseBodyPreview)
        break
      case areasEnum.DEVICE:
        result = this._isExisting(elements.logs.deviceLogPreview)
        break
      case areasEnum.APPIUM:
        result = this._isExisting(elements.logs.appiumLogPreview)
        break
    }
    return result

  }

  /**
  * Collapse a given tab
  * @param tabName {string} - ResquestBody or ResponseBody or Device or Appium
  */
  _collapseTab(tabName) {
    if (!this._isTabExpanded(tabName)) {
      switch (tabName.toUpperCase()) {
        case areasEnum.REQUEST_BODY:
          this._browser.click(elements.httpCommands.requestBodyLabel)
          break
        case areasEnum.RESPONSE_BODY:
          this._browser.click(elements.httpCommands.responseBodyLabel)
          break
        case areasEnum.DEVICE:
          this._browser.click(elements.logs.deviceLogLabel)
          break
        case areasEnum.APPIUM:
          this._browser.click(elements.logs.appiumLogLabel)
          break
      }
    }
  }

  /**
  * Click on video screen to stop/play video in session details page
  */
  clickOnVideoScreen() {
    this._browser.click(elements.video.videoScreen)
  }

  /**
  * check video if is paused or not. Returns true if video is paused, otherwise false
  */
  isVideoPaused() {
    return this._browser.execute((selector) => {
      return document.querySelector(selector).paused
    }, videoLocatorQuery).value
  }

  /**
  * Get video duration
  */
  getVideoDuration() {
    return this._browser.execute((selector) => {
      return document.querySelector(selector).duration
    }, videoLocatorQuery).value
  }
}
