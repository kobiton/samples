import LoginPage from '../core/desktop-pages/login'
import * as downloader from '../core/installation/downloader'
import {getAccount} from '../core/user-info'

describe('Verify desktop application', () => {
  let loginPage
  let devicesPage
  before(async () => {
    await downloader.cleanUpData()
    await downloader.removeApp()
    const kobitonApp = await downloader.downloadApp()
    await downloader.installApp(kobitonApp)
    loginPage = new LoginPage()
    await loginPage.startApplication()
  })

  after(async () => {
    await loginPage.stopApplication()
    await downloader.removeApp()
  })

  it('should login successfully', async () => {
    const account = getAccount()
    devicesPage = await loginPage.login(account.emailOrUsername, account.password)
  })

  it('should activate a devcie', async () => {
    await devicesPage.waitForNameExist()
    await devicesPage.activateDevice()
  })

  it('should deactivate a device', async() => {
    await devicesPage.deactivateDevice()
  })
})
