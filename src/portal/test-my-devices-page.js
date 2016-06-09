import {assert} from 'chai'
import LoginPage from './page-objects/login'
import {testerAccount} from './data'

describe('Verify My Devices Page', () => {
  const loginPage = new LoginPage()
  let myDevicesPage

  before(() => {
    loginPage.windowHandleMaximize()
    loginPage.open()
    const sessionsPage = loginPage.login(testerAccount)
    myDevicesPage = sessionsPage.selectDeviceOwner()
  })

  it('should be displayed my Devices page ui', () => {
    assert.isTrue(myDevicesPage.deviceLbl.isVisible())
    assert.isTrue(myDevicesPage.todayTimeLbl.isVisible())
    assert.isTrue(myDevicesPage.thisWeekTimeLbl.isVisible())
  })
})
