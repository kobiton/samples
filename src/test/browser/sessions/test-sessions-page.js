import 'babel-polyfill'
import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import config from '../../../framework/config/test'
import SessionsPage from '../../../framework/page-objects/portal/user/sessions'
import SessionAPI from '../../../framework/api/session'
import {subtractDays} from '../../../framework/util'

const {username1: username, password1: password} = {...config}
let sessionsPage
let loginPage
const today = toTimestamp(new Date())
const sixDayAgo = toTimestamp(subtractDays(6))
const sessionType = 'Manual'
const sessionStatus = 'Complete'
const platform = 'Android'
const deviceModel = 'Galaxy'

describe('Verifying on sessions page', () => {

  before(() => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.login(username, password)
    sessionsPage = new SessionsPage()
  })

  beforeEach(() => {
    sessionsPage.open()
  })

  it('should verify fulltext search in session page', async () => {
    sessionsPage.filterSessionByFullText(deviceModel)
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const searchDataForAPI = {
      'keyword': deviceModel,
      'startDate': sixDayAgo,
      'endDate': today
    }

    const sessionListFromAPI = await SessionAPI.filterSessionsByMultiInput(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI.data),
      'The session list does not match.')
  })

  it('should verify filter sessions by session type in session page', async () => {
    sessionsPage.filterSessionBySessionType(sessionType)
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const searchDataForAPI = {
      'type': sessionType,
      'startDate': sixDayAgo,
      'endDate': today
    }

    const sessionListFromAPI = await SessionAPI.filterSessionsByMultiInput(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI.data),
      'The session list does not match.')
  })

  it('should verify filter sessions by Platform in session page', async () => {
    sessionsPage.filterSessionByPlatform(platform)
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const searchDataForAPI = {
      platform,
      'startDate': sixDayAgo,
      'endDate': today
    }

    const sessionListFromAPI = await SessionAPI.filterSessionsByMultiInput(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI.data),
      'The session list does not match.')
  })

  it('should verify filter sessions by Status in session page', async () => {
    sessionsPage.filterSessionByStatus(sessionStatus)
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const searchDataForAPI = {
      'state': sessionStatus,
      'startDate': sixDayAgo,
      'endDate': today
    }

    const sessionListFromAPI = await SessionAPI.filterSessionsByMultiInput(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI.data),
      'The session list does not match.')
  })

  it('should verify filter sessions by type & status & platform in session page', async () => {
    const searchDataForUI = {
      sessionType,
      'status': sessionStatus,
      platform
    }

    sessionsPage.filterSessionBy(searchDataForUI)
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const searchDataForAPI = {
      'type': sessionType,
      'state': sessionStatus,
      platform,
      'startDate': sixDayAgo,
      'endDate': today
    }

    const sessionListFromAPI = await SessionAPI.filterSessionsByMultiInput(searchDataForAPI)

    assert.isTrue(isIncluded(sessionListFromUI, sessionListFromAPI.data),
      'The session list does not match.')
  })
})

/**
 * Check 2 session lists if they are equal
 * @param: sessionsList - List of session info
 * @param: sessionListData: List of session info
 * Return a boolean
 */
function isIncluded(sessionsList, sessionListData) {
  if (sessionsList.length === sessionListData.length) {
    return !sessionsList.find(({SessionName, Status}) => {
      let notInclude = !sessionListData.find(({name, state}) => (
        SessionName === name && Status.toUpperCase() === state.toUpperCase()
      ))
      return notInclude
    })
  }
  else {
    return false
  }
}

/** Convert a date string/object to a timestamp with proper timezone
*@param: {dateString} a string likes '24-Nov-2009' or an Date object likes new Date(Oct 01 2017)
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
