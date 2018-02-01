import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/desktop/intro/login'
import {removeApp, downloadKobitonApp, installApp} from '../../../framework/page-objects/desktop/desktop-installation' // eslint-disable-line max-len

describe('Installation', () => {
  let loginPage

  before(async () => {
    loginPage = new LoginPage()
    await loginPage.cleanUpEnvironment()
    await loginPage.uninstallPackages()
    await removeApp()

    const kobitonAppFile = await downloadKobitonApp()
    await installApp(kobitonAppFile)

    await loginPage.startApplication()
    
  })

  after(async () => {
    if (loginPage && loginPage.isAppRunning()) {
      await loginPage.stopApplication()
    }
  })

  it('should show an initial window', async () => {
    const count = await loginPage.getWindowCount()
    assert.equal(count, 1, 'Only 1 window is activated.')
  })

})
