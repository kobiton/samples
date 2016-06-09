import {assert} from 'chai'
import LoginPage from './page-objects/login'
import {testerAccount} from './data'

describe('Verify Sessions Page', () => {
  const loginPage = new LoginPage()
  let sessionsPage

  before(() => {
    loginPage.windowHandleMaximize()
    loginPage.open()
    sessionsPage = loginPage.login(testerAccount)
  })

  it('should be display session page ui', () => {
    assert.isTrue(sessionsPage.deviceHeader.isVisible())
    assert.isTrue(sessionsPage.platformHeader.isVisible())
    assert.isTrue(sessionsPage.timeHeader.isVisible())
    assert.isTrue(sessionsPage.durationHeader.isVisible())
  })

  it('should scroll to the bottom', () => {
    assert.isTrue(sessionsPage.loadMoreSessionsBtn.isExisting())
    const loadMoreLocation = sessionsPage.loadMoreSessionsLbl.getLocation()
    sessionsPage.loadMoreSessionsLbl.scroll(loadMoreLocation.x, loadMoreLocation.y)
    sessionsPage.loadMoreSessionsBtn.click()
    assert.isTrue(sessionsPage.loadMoreSessionsBtn.isVisible())
    assert.isTrue(sessionsPage.loadMoreSessionsLbl.isVisible())
  })
})
