import LoginPage from '../desktop-pages/login'
import * as downloader from './downloader'
import {getAccount} from '../user-info'

describe('Download and install desktop application', () => {
  it('Should login successfully after downloaded and installed the desktop app', async () => {
    
    let loginPage
    let devicesPage
    try {
      await downloader.cleanUpData()
      await downloader.removeApp()
      
      const kobitonApp = await downloader.downloadApp()      
      await downloader.installApp(kobitonApp)

      loginPage = new LoginPage()
      await loginPage.startApplication()

      const account = getAccount()
      devicesPage = await loginPage.login(account.emailOrUsername, account.password)
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
