import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/desktop/intro/login'
import downloader from '../../../framework/util/downloader'

describe('Installation', () => {
  let loginPage

  before(async () => {
    loginPage = new LoginPage()
    await loginPage.cleanUpEnvironment()
    await loginPage.uninstallPackages()
    // await downloader.removeApp()

    // const kobitonAppFile = await downloader.downloadApp()
    // await downloader.installApp(kobitonAppFile)

    await loginPage.startApplication()
    
  })

  after(async () => {
    if (loginPage && loginPage.isAppRunning()) {
      await loginPage.stopApplication()
    }
  })

  it('should show an initial window', () => {
    const count = loginPage.getWindowCount()
    assert.equal(count, 1, 'Only 1 window is activated.')
  })

})
