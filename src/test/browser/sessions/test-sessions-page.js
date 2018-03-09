import 'babel-polyfill'
import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import config from '../../../framework/config/test'
import SessionsPage from '../../../framework/page-objects/portal/user/sessions'
import SessionAPI from '../../../framework/api/session'
import {subtractDays, equalArrays, extractStartDate, extractEndDate} from '../../../framework/util'

const {username1: username, password1: password} = {...config}
let sessionsPage
let loginPage
const today = toTimestamp(new Date())
const sixDayAgo = toTimestamp(subtractDays(6))
const sessionType = 'Manual'
const sessionStatus = 'Complete'
const platform = 'Android'
const deviceModel = 'Galaxy'
const startDate = subtractDays(30)
const endDate = subtractDays(1)

describe('Verifying on sessions page', () => {

  before(() => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    sessionsPage = new SessionsPage()
    sessionsPage.wait(1000)
    sessionsPage.closeAlarm()
  })

  beforeEach(() => {
    sessionsPage.open()
  })

  it('should display session types correctly', () => {
    const sessionTypes = sessionsPage.getSessionTypes()
    const expectedSessions = ['All', 'Auto', 'Manual']
    assert.isTrue(equalArrays(sessionTypes, expectedSessions),
      'The session types do not match.')
  })

  it('should display status types correctly', () => {
    const statusTypes = sessionsPage.getStatusTypes()
    const expectedStatuses = ['All', 'Running', 'Complete', 'Passed',
      'Failed', 'Timeout', 'Error', 'Terminated']
    assert.isTrue(equalArrays(statusTypes, expectedStatuses),
      'The status types do not match.')
  })

  it('should display platform types correctly', () => {
    const platformTypes = sessionsPage.getPlatformTypes()
    const expectedPlatforms = ['All', 'Android', 'iOS']
    assert.isTrue(equalArrays(platformTypes, expectedPlatforms),
      'The platform types do not match.')
  })

  it('should verify fulltext search in session page', async () => {
    sessionsPage.filterSessionByFullText(deviceModel)
    const sessionListFromUI = sessionsPage.getSessions()
    const searchDataForAPI = {
      keyword: deviceModel,
      startDate: sixDayAgo,
      endDate: today
    }

    const sessionListFromAPI = await SessionAPI.getSessions(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI[0].data),
      'The session list does not match.')
  })

  it('should verify filter sessions by session type in session page', async () => {
    sessionsPage.filterSessionBySessionType(sessionType)
    const sessionListFromUI = sessionsPage.getSessions()
    const searchDataForAPI = {
      type: sessionType,
      startDate: sixDayAgo,
      endDate: today
    }

    const sessionListFromAPI = await SessionAPI.getSessions(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI[0].data),
      'The session list does not match.')
  })

  it('should verify filter sessions by Platform in session page', async () => {
    sessionsPage.filterSessionByPlatform(platform)
    const sessionListFromUI = sessionsPage.getSessions()
    const searchDataForAPI = {
      platform,
      startDate: sixDayAgo,
      endDate: today
    }

    const sessionListFromAPI = await SessionAPI.getSessions(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI[0].data),
      'The session list does not match.')
  })

  it('should verify filter sessions by Status in session page', async () => {
    sessionsPage.filterSessionByStatus(sessionStatus)
    const sessionListFromUI = sessionsPage.getSessions()
    const searchDataForAPI = {
      state: sessionStatus,
      startDate: sixDayAgo,
      endDate: today
    }

    const sessionListFromAPI = await SessionAPI.getSessions(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI[0].data),
      'The session list does not match.')
  })

  it('should verify filter sessions by type & status & platform in session page', async () => {
    const searchDataForUI = {
      sessionType,
      'status': sessionStatus,
      platform
    }
    sessionsPage.filterSessionBy(searchDataForUI)
    const sessionListFromUI = sessionsPage.getSessions()
    const searchDataForAPI = {
      type: sessionType,
      state: sessionStatus,
      platform,
      startDate: sixDayAgo,
      endDate: today
    }
    const sessionListFromAPI = await SessionAPI.getSessions(searchDataForAPI)
    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI[0].data),
      'The session list does not match.')
  })

  it('should verify filter sessions with period of time', async () => {
    const sessionListFromUI = sessionsPage.getSessions(startDate, endDate)
    const url = sessionsPage.getUrlPage()
    const searchDataForAPI = {
      startDate: extractStartDate(url),
      endDate: extractEndDate(url)
    }
    const sessionListFromAPI = await getAllSessionsFromAPI(searchDataForAPI)
    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI),
      'The session list does not match.')
  })

  it('delete a session successfully', function () {
    const sessions = sessionsPage.getSessions(startDate, endDate)
    if (sessions.length > 0) {
      const sessionName = sessions[0].SessionName
      sessionsPage.deleteASession(sessionName)
      sessionsPage.filterSessionByFullText('')
      assert.equal(sessionsPage.getSessions(startDate, endDate).length + 1, sessions.length,
        'Number of sessions is not expected after deletion.')
    }
    else {
      this.skip()
    }
    
  })

  it('seesion will not be deleted if cancel deleting', function () {
    const sessions = sessionsPage.getSessions(startDate, endDate)
    if (sessions.length > 0) {
      const sessionName = sessions[0].SessionName
      sessionsPage.clickDeleteSessionButton(sessionName)
      sessionsPage.wait(1000)
      sessionsPage.cancelToDelete()
      sessionsPage.filterSessionByFullText('')
      assert.equal(sessionsPage.getSessions(startDate, endDate).length, sessions.length,
        'Number of sessions is not expected after canceling to delete.')
    }
    else {
      this.skip()
    }
  })

})

/**
 * Check 2 session lists if they are equal
 * @param sessionsListFromUI - List of session info from UI
 * @param sessionListFromAPI - List of session info from API
 * Return a boolean
 */
function isIncluded(sessionsListFromUI, sessionListFromAPI) {
  if (sessionsListFromUI && sessionListFromAPI) {
    return sessionListFromAPI.every((sessionAPI) => {
      return sessionsListFromUI.find((sessionUI) => {
        return sessionUI.SessionName === sessionAPI.name &&
               sessionUI.Status.toUpperCase() === sessionAPI.state.toUpperCase()
      })
    })
  }
  else {
    return false
  }
}

/** Convert a date string/object to a timestamp with proper timezone
 * @param dateString {string} a string likes '24-Nov-2009' or
 * an Date object likes new Date(Oct 01 2017)
 */
function toTimestamp(dateString) {
  const date = new Date(dateString)
  if (config.portalUrl.includes('portal.kobiton.com')) {
    date.setHours(6)
    return Date.parse(dateString)
  }
  else {
    return Date.parse(date)
  }
}

/**
 * Get total sessions via API
 * @param filterData {Object} Key object contains criteria to filter
 * Return an array of sessions
 */
async function getAllSessionsFromAPI(filterData) {
  let totalSessions = []
  const totalPages = (await SessionAPI.getSessions(filterData))[0].totalPages
  for (let i = 1; i <= totalPages; i++) {
    let sessionsOnCurrentPage = (await SessionAPI.getSessions(filterData, i))[0].data
    totalSessions = totalSessions.concat(sessionsOnCurrentPage)
  }
  return totalSessions
}
