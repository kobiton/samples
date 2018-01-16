import AuthenticatedPage from './base'
import {debug} from '@kobiton/core-util'

const elements = {
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

const monthEmun = {
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

const waitTime = 500 //milliseconds

export default class SessionsPage extends AuthenticatedPage {
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
    this.wait(waitTime)
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
   * Return an array of session info
   */
  getSessionsOnCurrentPage() {
    let sessionElements = this.getElements(elements.sessionList)
    let sessionData = {}
    let sessionDataList = []
    if (sessionElements.length > 1) {
      for (let i = 2; i <= sessionElements.length; i++) {
        sessionData.SessionName = this._browser.getText(`${elements.sessionList}[${i}]/div[1]/div/div`) // eslint-disable-line max-len
        sessionData.OSVersion = this._browser.getText(`${elements.sessionList}[${i}]/div[2]`) // eslint-disable-line max-len
        sessionData.DeviceModel = this._browser.getText(`${elements.sessionList}[${i}]/div[3]/div`) // eslint-disable-line max-len
        sessionData.Status = this._browser.getText(`${elements.sessionList}[${i}]/div[4]`) // eslint-disable-line max-len
        sessionDataList.push(sessionData)
        sessionData = {}
      }
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
      this.selectDate(startDate)
      this.wait(waitTime)
      this.waitForLoadingProgressDone()
      this.openDatePicker('ENDDATE')
      this.selectDate(endDate)
      this.wait(waitTime)
    }
    else {
      debug.error(`${startDate} is greater than ${endDate}, please choose other dates and try again.`)
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
    while (inputYear != curYear) {
      this._selectDate(inputYear, curYear)
      curYear = this._getCurrentYear()
    }
    //Select Month
    let curMonth = this._getCurrentMonth()
    while (inputMonth != monthEmun[curMonth.toUpperCase()]) {
      this._selectDate(inputMonth, monthEmun[curMonth.toUpperCase()])
      curMonth = this._getCurrentMonth()
    }
    //Select Day
    this.wait(waitTime)
    this._browser.click(`${elements.datePicker.days}[text()=${inputDay}]`)
  }

  _getCurrentMonth() {
    let curDate = this._browser.getText(elements.datePicker.curMonth)
    return curDate.substring(0, curDate.length - 5)
  }

  _getCurrentYear() {
    let curDate = this._browser.getText(elements.datePicker.curMonth)
    return curDate.substring(curDate.length - 4)
  }

  _selectDate(inputDate, curDate) {
    if (inputDate < curDate) {
      this._browser.click(elements.datePicker.prev)
      this.wait(waitTime)
    }
    else {
      this._browser.click(elements.datePicker.next)
      this.wait(waitTime)
    }
  }
}