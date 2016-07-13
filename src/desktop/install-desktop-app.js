import LoginPage from '../core/desktop-pages/login'
import * as downloader from '../core/installation/downloader'
import {getAccount} from '../core/user-info'
import {cleanUpDesktopResourceData} from '../core/desktop-util'

describe('Download and install desktop application', () => {

  it('Should login successfully after downloaded and installed the desktop app', async () => {
    let loginPage
    let devicesPage
    try {
      await cleanUpDesktopResourceData()
      await downloader.removeApp()

      const kobitonApp = await downloader.downloadApp()
      await downloader.installApp(kobitonApp)

      loginPage = new LoginPage()
      await loginPage.startApplication()
      const {emailOrUsername: username, password} = getAccount()
      devicesPage = await loginPage.login({username, password})
    }
    finally {
      if (loginPage && loginPage.stopApplication) {
        await loginPage.stopApplication()
      }

      if (!devicesPage) {
        process.exit(-1)
      }
    }
  })
})
