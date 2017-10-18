import AuthenticatedPage from './base'

const elements = {
  fullTextSearch: '//input[@name="keyword"]',
  sessionTypeDropDown: '//label[text()="Session type"]/parent::*/div[1]',
  statusDropDown: '//label[text()="Status"]/parent::*/div[@style]',
  platformDropDown: '//label[text()="Platform"]/parent::*/div[@style]',
  userDropDown: '//label[text()="User"]/parent::*/div[@style]',
  dropDownItems: '//div[@data-reactroot]/div/div/div[not(@style) and not(@data-state)]',
  sessionList: '//div[contains(@class,"rmq-c44f70ce _1y_mg6OlZKhq9LGfUCMUme")]'
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
   * @searchTypes: Object consist of search type and search value. ex: filterSessionBy({'sessionType': 'Auto', 'status': 'Complete'})
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
    }
  }

  /**
   * Filter sessions by org user
   * Input a string of username
   */
  filterSessionByUser(userName) {
    this._browser.click(elements.userDropDown)
    this.selectDropdownItem(userName)
  }

  /**
   * Filter sessions by keyword
   * Input a string
   */
  filterSessionByFullText(text) {
    this._browser.setValue(elements.fullTextSearch, text)
        .keys('Enter')
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
        // eslint-disable-next-line max-len
        sessionData.SessionName = this._browser.element(`${elements.sessionList}[${i}]/div[1]/div/div`).getText()
        sessionData.OSVersion = this._browser.element(`${elements.sessionList}[${i}]/div[2]`).getText()
        sessionData.DeviceModel = this._browser.element(`${elements.sessionList}[${i}]/div[3]/div`).getText()
        sessionData.Status = this._browser.element(`${elements.sessionList}[${i}]/div[4]`).getText()
        sessionDataList.push(sessionData)
        sessionData = {}
      }
    }
    return sessionDataList
  }

  capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }
}

