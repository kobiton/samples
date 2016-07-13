import {assert} from 'chai'
import LoginPage from '../../core/portal-pages/login'
import {testerAccount} from '../core/data'

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
    assert.isTrue(sessionsPage.loadMoreSessionsButton.isExisting())
    const loadMoreLocation = sessionsPage.loadMoreSessionsLabel.getLocation()
    sessionsPage.loadMoreSessionsLabel.scroll(loadMoreLocation.x, loadMoreLocation.y)
    sessionsPage.loadMoreSessionsButton.click()
    assert.isTrue(sessionsPage.loadMoreSessionsButton.isVisible())
    assert.isTrue(sessionsPage.loadMoreSessionsLabel.isVisible())
  })
})
