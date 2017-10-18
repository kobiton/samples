import 'babel-polyfill'
import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import config from '../../../framework/config/test'
import SessionsPage from '../../../framework/page-objects/portal/user/sessions'
import SessionAPI from '../../../framework/api/session'

const {username1: username, password1: password} = {...config}
let sessionsPage
let loginPage

describe('Verifying on sessions page', () => {

  before(() => {
    loginPage = new LoginPage()
    loginPage.open()
    loginPage.windowHandleMaximize()
    loginPage.login(username, password)
    sessionsPage = new SessionsPage()
  })

  beforeEach(() => {
    sessionsPage.open()
  })

  it('should verify fulltext search in session page', async () => {
    sessionsPage.filterSessionByFullText('Nexus')
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const sessionListFromAPI = await SessionAPI.filterSessionsBySingleInput('keyword', 'Nexus')
    const result = isIncluded(sessionListFromUI, sessionListFromAPI.data)
    assert.isTrue(result, 'The session list does not match.')
  })

  it('should verify filter sessions by session type in session page', async () => {
    sessionsPage.filterSessionBySessionType('Manual')
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const sessionListFromAPI = await SessionAPI.filterSessionsBySingleInput('type', 'Manual')
    const result = isIncluded(sessionListFromUI, sessionListFromAPI.data)
    assert.isTrue(result, 'The session list does not match.')
  })

  it('should verify filter sessions by Platform in session page', async () => {
    sessionsPage.filterSessionByPlatform('Android')
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const sessionListFromAPI = await SessionAPI.filterSessionsBySingleInput('platform', 'Android')
    const result = isIncluded(sessionListFromUI, sessionListFromAPI.data)
    assert.isTrue(result, 'The session list does not match.')
  })

  it('should verify filter sessions by Status in session page', async () => {
    sessionsPage.filterSessionByStatus('Complete')
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const sessionListFromAPI = await SessionAPI.filterSessionsBySingleInput('state', 'Complete')
    const result = isIncluded(sessionListFromUI, sessionListFromAPI.data)
    assert.isTrue(result, 'The session list does not match.')
  })

  it('should verify filter sessions by type & status & platform in session page', async () => {
    const searchDataForUI = {'sessionType': 'Manual', 'status': 'Complete', 'platform': 'Android'}
    sessionsPage.filterSessionBy(searchDataForUI)
    const sessionListFromUI = sessionsPage.getSessionsOnCurrentPage()
    const searchDataForAPI = {'type': 'Manual', 'state': 'Complete', 'platform': 'Android'}
    const sessionListFromAPI = await SessionAPI.filterSessionsByMultiInput(searchDataForAPI)
    const result = isIncluded(sessionListFromUI, sessionListFromAPI.data)
    assert.isTrue(result, 'The session list does not match.')
  })

  /**
   * Check a session list if it is present in another session list by name and status.
   * @param: sessionsList - List of session info
   * @param: sessionListData: List of session info
   * Return a boolean
   */
  function isIncluded(sessionsList, sessionListData) {
    return !sessionsList.find(({SessionName, Status}) => {
      const notInclude = !sessionListData.find(({name, state}) => (
        SessionName === name && Status.toUpperCase() === state.toUpperCase()
      ))
      return notInclude
    })
  }

})
