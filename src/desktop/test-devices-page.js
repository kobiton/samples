import LoginPage from '../core/desktop-pages/login'
import {getAccount} from '../core/config'
import {assert} from 'chai'

describe('Verify desktop application', () => {
  let loginPage
  let devicesPage

  before(async () => {
    loginPage = new LoginPage()
    await loginPage.startApplication()
    const {emailOrUsername: username, password} = getAccount()
    devicesPage = await loginPage.login({username, password})
    await devicesPage.waitForAllDevicesInitializingDone()
  })

  after(async () => {
    await loginPage.stopApplication()
  })

  it('should activate a first found devcie', async () => {
    assert.isTrue(await devicesPage.activateFirstFoundDevice(), 'true if activate successfully')
  })

  it('should deactivate a first found device', async() => {
    assert.isTrue(await devicesPage.deactivateFirstFoundDevice(), 'true if deactivate successfully')
  })
})
