import {assert} from 'chai'
import LoginPage from '../core/portal-pages/login'
import {testerAccount} from './core/data'

describe('Verify Cloud Devices Page', () => {
  const loginPage = new LoginPage()
  let cloudDevicesPage
  const androidDeviceNames = ['Galaxy', 'Nexus', 'LG', 'SAMSUNG', 'Moto', 'HTC']
  const iOSDeviceNames = ['iPhone', 'iPad']
  const sortByOptions = ['Most popular (last 3 months)', 'Most recent (last 3 months)']

  before(() => {
    loginPage.windowHandleMaximize()
    loginPage.open()
    const sessionsPg = loginPage.login(testerAccount)
    cloudDevicesPage = sessionsPg.clickCloudDevicesLink()
  })

  it('should be display cloud devices page ui', () => {
    cloudDevicesPage.loadingHidden.isExisting()
    assert.isTrue(cloudDevicesPage.platformLbl.isVisible())
    assert.isTrue(cloudDevicesPage.platformVersionLbl.isVisible())
    assert.isTrue(cloudDevicesPage.browserLbl.isVisible())
    assert.isTrue(cloudDevicesPage.sortByLbl.isVisible())
    assert.isTrue(cloudDevicesPage.availableHeader.isVisible())
    assert.isTrue(cloudDevicesPage.utilizedHeader.isVisible())
    assert.isTrue(cloudDevicesPage.offlineHeader.isVisible())
    //verify sortby options
    cloudDevicesPage.sortBySelectBtn.click()
    assert.sameMembers(sortByOptions, cloudDevicesPage.getOptions())
  })

  it('should display iOS devices when select iOS platform', () => {
    cloudDevicesPage.open()
    cloudDevicesPage.selectiOSPlatform()
    for (const dev of iOSDeviceNames) {
      assert.isTrue(cloudDevicesPage.containsText(dev), `should display iOS devices: ${dev}`)
    }
    for (const dev of androidDeviceNames) {
      assert.isNotTrue(cloudDevicesPage.containsText(dev), `should not display android devices: ${dev}`)//eslint-disable-line
    }
    // verify browser option
    cloudDevicesPage.browserSelectBtn.click()
    assert.isTrue(cloudDevicesPage.containsText('Safari'))
    assert.isNotTrue(cloudDevicesPage.containsText('Chrome'))
  })

  it('should display android devices when select android platform', () => {
    cloudDevicesPage.open()
    cloudDevicesPage.selectAndroidPlatform()
    for (const dev of iOSDeviceNames) {
      assert.isNotTrue(cloudDevicesPage.containsText(dev), `should not display iOS devices: ${dev}`)//eslint-disable-line
    }
    for (const dev of androidDeviceNames) {
      assert.isTrue(cloudDevicesPage.containsText(dev), `should display android devices: ${dev}`)//eslint-disable-line
    }
    // verify browser option
    cloudDevicesPage.browserSelectBtn.click()
    assert.isNotTrue(cloudDevicesPage.containsText('Safari'))
    assert.isTrue(cloudDevicesPage.containsText('Chrome'))
  })
})
