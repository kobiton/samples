import Paging from '../../portal/paging'
import {debug} from '@kobiton/core-util'

const elements = {
  timeOfFirstSession: `//div[contains(text(),"Test session")]/../
  following-sibling::div[1]/div/div/span`,
  firstSessionOfSessionList: '//div[contains(text(),"Test session")]/../following-sibling::div[1]',
  startTime: '//div[5]/div[1]/div[2]',
  endTime: '//div[5]/div[2]/div[2]',
  fullTextSearch: '//input[@name="keyword"]',
  sessionTypeDropDown: '//label[text()="Session type"]/parent::*/div[1]',
  statusDropDown: '//label[text()="Status"]/parent::*/div[@style]',
  platformDropDown: '//label[text()="Platform"]/parent::*/div[@style]',
  userDropDown: '//label[text()="User"]/parent::*/div[@style]',
  dropDownItems: '//div[@data-reactroot]/div/div/div[not(@style) and not(@data-state)]',
  sessionList: '//div[contains(@class,"rmq-c44f70ce _1y_mg6OlZKhq9LGfUCMUme")]',
  startDate: '//input[@id="start-date"]',
  endDate: '//input[@id="end-date"]',
  datePicker: {
    prev: '(//div[@data-reactroot])[2]/div/div[2]/div[1]/div[1]/button[1]',
    next: '(//div[@data-reactroot])[2]/div/div[2]/div[1]/div[1]/button[2]',
    curMonth: '(//div[@data-reactroot])[2]/div/div[2]/div[1]/div[1]/div/div/div',
    days: '(//div[@data-reactroot])[2]/div/div[2]/div[1]/div[3]//span'
  },
  deleteSessionForm: {
    cancelButton: '(//button//span)[1]',
    deleteButton: '(//button//span)[2]'
  },
  dashboard: {
    expandingButton: '//input[@id="start-date"]/ancestor::div[6]//*[name()="svg"]/*[name()="path"]',
    dashboardDiv: '//input[@id="start-date"]/ancestor::div[6]/div[2]',
    summaryLabel: '//input[@id="start-date"]/ancestor::div[6]/div[2]/div/div[1]/div[1]',
    sessionTypeChart: '(//input[@id="start-date"]/ancestor::div[6]/div[2]//*[name()="svg"])[1]',
    autoSessionNumber: '//span[text()="Automation"]/following-sibling::span',
    // eslint-disable-next-line max-len
    autoSessionStateNumber: '//span[text()="Automation"]/../..//span[text()="Running"]/following-sibling::span',
    manualSessionNumber: '//span[text()="Manual"]/following-sibling::span',
    // eslint-disable-next-line max-len
    manualSessionStateNumber: '//span[text()="Manual"]/../..//span[text()="Running"]/following-sibling::span',
    osTypeChart: '(//input[@id="start-date"]/ancestor::div[6]/div[2]//*[name()="svg"])[2]',
    iOSNumber: '//span[text()="iOS"]/following-sibling::span',
    androidNumber: '//span[text()="Android"]/following-sibling::span',
    userSessionsInfo: '//input[@id="start-date"]/ancestor::div[6]/div[2]/div/div[2]/div[2]/div'
  }
}

const sessionTypeEnum = {
  ALL: 'All',
  AUTO: 'Auto',
  MANUAL: 'Manual'
}

const statusEnum = {
  ALL: 'All',
  RUNNING: 'Running',
  COMPLETE: 'Complete',
  PASSED: 'Passed',
  FAILED: 'Failed',
  TIMEOUT: 'Timeout',
  ERROR: 'Error',
  TERMINATED: 'Terminated'
}

const platformEnum = {
  ALL: 'All',
  ANDROID: 'Android',
  IOS: 'iOS'
}

const monthEnum = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12
}

const waitTime = 1000 //milliseconds

export default class SessionsPage extends Paging {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  /**
   * Open sessions page
   */
  open() {
    super.open('sessions')
  }

  /**
   * Filter sessions by search types
   * @searchTypes: Object consist of search type and search value.
    ex: filterSessionBy({'sessionType': 'Auto', 'status': 'Complete'})
   * Return an array of session info
   */
  filterSessionBy(searchTypes) {
    Object.keys(searchTypes).forEach((key) => {
      let value = searchTypes[key]
      switch (key.toUpperCase()) {
        case 'FULLTEXT':
          this.filterSessionByFullText(value)
          break
        case 'SESSIONTYPE':
          this.filterSessionBySessionType(value)
          break
        case 'STATUS':
          this.filterSessionByStatus(value)
          break
        case 'PLATFORM':
          this.filterSessionByPlatform(value)
          break
        case 'USER':
          this.filterSessionByUser(value)
          break
      }
    })
  }

  selectDropdownItem(value) {
    const optimizedValue = this.capitalizeFirstLetter(value.toLowerCase())
    const itemXpath = `${elements.dropDownItems}//div[text()='${optimizedValue}']`
    this.pause(waitTime)
    this._browser.click(itemXpath)
    this.waitForLoadingProgressDone()
  }

  /**
   * Filter sessions by session type
   * Input a string of session type(All or Manual or Auto)
   */
  filterSessionBySessionType(sessionType) {
    if (sessionTypeEnum.hasOwnProperty(sessionType.toUpperCase())) {
      this._browser.click(elements.sessionTypeDropDown)
      this.selectDropdownItem(sessionType)
      this.waitForLoadingProgressDone()
    }
  }

  /**
   * Filter sessions by session status
   * Input a string of session status
   */
  filterSessionByStatus(sessionStatus) {
    if (statusEnum.hasOwnProperty(sessionStatus.toUpperCase())) {
      this._browser.click(elements.statusDropDown)
      this.selectDropdownItem(sessionStatus)
      this.waitForLoadingProgressDone()
    }
  }

  /**
   * Filter sessions by device platform
   * Input a string of device platform
   */
  filterSessionByPlatform(platformName) {
    if (platformEnum.hasOwnProperty(platformName.toUpperCase())) {
      this._browser.click(elements.platformDropDown)
      this.selectDropdownItem(platformName)
      this.waitForLoadingProgressDone()
    }
  }

  /**
   * Filter sessions by org user
   * Input a string of username
   */
  filterSessionByUser(userName) {
    this._browser.click(elements.userDropDown)
    this.selectDropdownItem(userName)
    this.waitForLoadingProgressDone()
  }

  /**
   * Filter sessions by keyword
   * Input a string
   */
  filterSessionByFullText(text) {
    this._browser.setValue(elements.fullTextSearch, text)
        .keys('Enter')
    this.waitForLoadingProgressRunning()
    this.waitForLoadingProgressDone()
  }

  /**
   * Get list of sessions's info in a current page
   * @param startDate {Date Object}
   * @param endDate {Date Object}
   * Return an array of sessions info
   */

  getSessions(startDate, endDate) {
    let sessionDataList = []
    let pageNumber = 1
    if (startDate && endDate) {
      this.selectStartAndEndDates(startDate, endDate)
    }
    const totalPages = this.getTotalPages()
    while (pageNumber <= totalPages) {
      const sessionElements = this.getElements(elements.sessionList)
      if (sessionElements.length > 1) {
        for (let i = 2; i <= sessionElements.length; i++) {
          let sessionData = {}
          sessionData.SessionName = this._browser.getText(`${elements.sessionList}[${i}]/div[1]/div/div`) // eslint-disable-line max-len
          sessionData.OSVersion = this._browser.getText(`${elements.sessionList}[${i}]/div[2]`) // eslint-disable-line max-len
          sessionData.DeviceModel = this._browser.getText(`${elements.sessionList}[${i}]/div[3]/div`) // eslint-disable-line max-len
          sessionData.Status = this._browser.getText(`${elements.sessionList}[${i}]/div[4]`) // eslint-disable-line max-len
          sessionDataList.push(sessionData)
        }
      }
      if (this.isClickableButton('NEXT')) {
        this.moveToPage('NEXT')
      }
      pageNumber++
    }

    return sessionDataList
  }

  capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }

  /**
  * Get the url of current opened website
  */
  getUrlPage() {
    this.waitForLoadingProgressDone()
    return this._browser.getUrl()
  }

  _getDropDownItems(element) {
    let types = []
    this._browser.click(element)
    for (let i = 1; i <= this.getElements(elements.dropDownItems).length; i++) {
      let value = this._browser.getText(`${elements.dropDownItems}[${i}]`)
      types.push(value)
    }
    return types
  }

  getSessionTypes() {
    return this._getDropDownItems(elements.sessionTypeDropDown)
  }

  getStatusTypes() {
    return this._getDropDownItems(elements.statusDropDown)
  }

  getPlatformTypes() {
    return this._getDropDownItems(elements.platformDropDown)
  }

  getUsers() {
    return this._getDropDownTypes(elements.userDropDown)
  }

  /**
  * Select start date and end date
  */
  selectStartAndEndDates(startDate, endDate) {
    if (startDate <= endDate) {
      this.openDatePicker('STARTDATE')
      this.pause(waitTime)
      this.selectDate(startDate)
      this.pause(waitTime)
      this.waitForLoadingProgressDone()
      this.openDatePicker('ENDDATE')
      this.pause(waitTime)
      this.selectDate(endDate)
      this.pause(waitTime)
      this.waitForLoadingProgressDone()
    }
    else {
      debug.error(`${startDate} is greater than ${endDate},
       please choose other dates and try again.`)
    }
  }

  /**
  * Click on start date or end date depends on input param
  * @param: pickerType - is either 'STARTDATE' or 'ENDDATE'
  */
  openDatePicker(pickerType = 'STARTDATE') {
    this.waitForLoadingProgressDone()
    switch (pickerType) {
      case 'STARTDATE':
        this._browser.click(elements.startDate)
        break
      case 'ENDDATE':
        this._browser.click(elements.endDate)
        break
    }
  }

  /**
  * @param: date is a Date object, ex: new Date(01-nov-2017)
  */
  selectDate(date) {
    const inputYear = date.getFullYear()
    const inputMonth = date.getMonth() + 1
    const inputDay = date.getDate()
    //Select Year
    let curYear = this._getCurrentYear()
    while (inputYear !== curYear) {
      this._selectDate(inputYear, curYear)
      curYear = this._getCurrentYear()
    }
    //Select Month
    let curMonth = this._getCurrentMonth()
    while (inputMonth !== monthEnum[curMonth.toUpperCase()]) {
      this._selectDate(inputMonth, monthEnum[curMonth.toUpperCase()])
      curMonth = this._getCurrentMonth()
    }
    //Select Day
    this.pause(waitTime)
    this._browser.click(`${elements.datePicker.days}[text()=${inputDay}]`)
  }

  _getCurrentMonth() {
    const curDate = this._browser.getText(elements.datePicker.curMonth)
    return curDate.substring(0, curDate.length - 5)
  }

  _getCurrentYear() {
    const curDate = this._browser.getText(elements.datePicker.curMonth)
    return curDate.substring(curDate.length - 4)
  }

  _selectDate(inputDate, curDate) {
    if (inputDate < curDate) {
      this._browser.click(elements.datePicker.prev)
      this.pause(waitTime)
    }
    else {
      this._browser.click(elements.datePicker.next)
      this.pause(waitTime)
    }
  }

  /**
   * Get time of first session in list session
   * Return an object
   */
  getTimeOfFirstSession() {
    return this._browser.getText(elements.timeOfFirstSession)
  }

  /**
   * Get session detail infor
   * Return an object
   */
  getFirstSessionDetail() {
    // Click first session of list sessions on Sessions page
    this.waitForLoadingProgressDone()
    this._browser.click(elements.firstSessionOfSessionList)
    this.waitForLoadingProgressDone()
    // Get start and end time
    const session = {}
    session.StartTime = this._browser.getText(elements.startTime)
    session.EndTime = this._browser.getText(elements.endTime)
    return session
  }

  /**
   * Click on Delete button of a session in sessions page
   * @param sessionName {string} : session name
   */
  clickDeleteSessionButton(sessionName) {
    this.filterSessionByFullText(sessionName)
    if (this.getElements(elements.sessionList).length > 1) {
      const columns = this.getElements(`${elements.sessionList}[2]/div`).length
      this._browser.click(`${elements.sessionList}[2]/div[${columns}]//*[name()='svg']`)
    }
    else {
      debug.error(`Unable to delete due to no session with name ${sessionName}.`)
    }
  }

  /**
   * Click on Delete button on deletion confirmation to delete a session
   */
  confirmToDelete() {
    this._browser.click(elements.deleteSessionForm.deleteButton)
    this.waitForLoadingProgressDone()
  }

  /**
   * Click on Cancel button on deletion confirmation to cancel deleting
   */
  cancelToDelete() {
    this._browser.click(elements.deleteSessionForm.cancelButton)
  }

  /**
   * Delete a session with a given session name
   * @param sessionName {string} : session name
   */
  deleteASession(sessionName) {
    this.clickDeleteSessionButton(sessionName)
    this.pause(waitTime)
    this.confirmToDelete()
  }

  /**
   * Get data on Dashboard
   * @param startDate {Date Object}
   * @param endDate {Date Object}
   * Return an object containing data on Dashboard
   */
  getDashboardInfo(startDate, endDate) {
    let dashboardInfo = {}
    this.expandDashboard()
    if (startDate && endDate) {
      this.selectStartAndEndDates(startDate, endDate)
    }
    if (this._isExisting(elements.dashboard.summaryLabel)) {
      dashboardInfo.SessionsData = this.getDashboardSessionsInfo()
      dashboardInfo.OSsData = this.getDashboardOSsInfo()
    }
    if (this._isExisting(elements.dashboard.userSessionsInfo)) {
      dashboardInfo.UsersData = this.getDashboardUsersInfo()
    }
    return dashboardInfo
  }

  /**
   * Get sessions info on Dashboard
   * Return an object which contains data of sessions on Dashboard
   */
  getDashboardSessionsInfo() {
    let dashboardSessionInfo = {}
    // eslint-disable-next-line max-len
    dashboardSessionInfo.TotalSessionsAndMinutes = this._browser.getText(elements.dashboard.summaryLabel)
    dashboardSessionInfo.AutoSessionsData = this._getSessionTypesData(sessionTypeEnum.AUTO)
    dashboardSessionInfo.ManualSessionsData = this._getSessionTypesData(sessionTypeEnum.MANUAL)
    return dashboardSessionInfo
  }

  /**
   * Get sessions data base on session type on Dashboard
   * @param sessionType {string} - type of session, default value is Auto
   * Return an object which contains data of corresponding session type
   */
  _getSessionTypesData(sessionType = 'Auto') {
    let sessionTypesData = {}
    const statusList = Object.keys(statusEnum)
    if (sessionType === sessionTypeEnum.AUTO) {
      // eslint-disable-next-line max-len
      sessionTypesData.TotalAutoSessions = this._browser.getText(elements.dashboard.autoSessionNumber)
      for (let i = 1; i < statusList.length; i++) {
        let status = statusEnum[statusList[i]]
        // eslint-disable-next-line max-len
        sessionTypesData[status] = this._browser.getText(elements.dashboard.autoSessionStateNumber.replace('Running', status))
      }
    }
    else if (sessionType === sessionTypeEnum.MANUAL) {
      // eslint-disable-next-line max-len
      sessionTypesData.TotalManualSessions = this._browser.getText(elements.dashboard.manualSessionNumber)
      for (let i = 1; i < statusList.length; i++) {
        let status = statusEnum[statusList[i]]
        // eslint-disable-next-line max-len
        sessionTypesData[status] = this._browser.getText(elements.dashboard.manualSessionStateNumber.replace('Running', status))
      }
    }
    return sessionTypesData
  }

  /**
   * Get OS data on Dashboard
   * Return an object which contains data of OS
   */
  getDashboardOSsInfo() {
    let oSData = {}
    if (this._isExisting(elements.dashboard.androidNumber)) {
      oSData.TotalAndroid = this._browser.getText(elements.dashboard.androidNumber)
    }
    if (this._isExisting(elements.dashboard.iOSNumber)) {
      oSData.TotaliOS = this._browser.getText(elements.dashboard.iOSNumber)
    }
    return oSData
  }

  /**
   * Get Users data on Dashboard
   * Return an object which contains session users data
   */
  getDashboardUsersInfo() {
    let usersData = []
    const userElements = this.getElements(elements.dashboard.userSessionsInfo)
    for (let i = 1; i <= userElements.length; i++) {
      let userData = {}
      userData.User = this._browser.getText(`${elements.dashboard.userSessionsInfo}[${i}]/div[1]`)
      // eslint-disable-next-line max-len
      userData.Sessions = this._browser.getText(`${elements.dashboard.userSessionsInfo}[${i}]/div[2]`)
      // eslint-disable-next-line max-len
      userData.Minutes = this._browser.getText(`${elements.dashboard.userSessionsInfo}[${i}]/div[3]`)
      usersData.push(userData)
    }
    return usersData
  }

  /**
   * Expand dashboard view by clicking on button
   */
  expandDashboard() {
    if (!this._isExisting(elements.dashboard.dashboardDiv)) {
      this._browser.click(elements.dashboard.expandingButton)
    }
  }

}
