import LoginPage from '../core/desktop-pages/login'
import {getAccount} from '../core/user-info'

describe('Verify desktop application', () => {
  let loginPage
  let devicesPage
  before(async () => {
    loginPage = new LoginPage()
    await loginPage.startApplication()
  })

  after(async () => {
    await loginPage.stopApplication()
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
