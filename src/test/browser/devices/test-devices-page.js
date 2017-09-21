import 'babel-polyfill'
import {assert} from 'chai'
import User from '../../../framework/api/user'
import Device from '../../../framework/api/device'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import group from '../../../framework/common/groupType/type-of-group'
import config from '../../../framework/config/test'

const {username1: username, password1: password} = {...config}
let devicesPage

describe('Verifying on the devices page', () => {
  before(() => {
    const loginPage = new LoginPage()
    loginPage.windowHandleMaximize()
    loginPage.open()
    devicesPage = loginPage.login(username, password)
  })

  it('should verify url of devices page', () => {
    const urlPage = devicesPage.getUrlPage()
    assert.equal(urlPage, config.portalUrl.concat('/devices'),
    `The expected url is ${config.portalUrl.concat('/devices')}`)
  })

  it('should have 7 main components on UI', async () => {
    assert.isTrue(devicesPage.isContaining('devices'), true,
      'Devices icon should appear on page')
    assert.isTrue(devicesPage.isContaining('sessions'), true,
      'Sessions icon should appear on page')
    assert.isTrue(devicesPage.isContaining('appRepo'), true,
      'App Repo icon should appear on page')
    assert.isTrue(devicesPage.isContaining('documentation'), true,
      'Documentation icon should appear on page')
    assert.isTrue(devicesPage.isContaining('support'), true,
      'Support icon should appear on page')
    assert.isTrue(devicesPage.isContaining('avatar'), true,
      'Avatar icon should appear on page')
    assert.isTrue(devicesPage.isContaining('profileSetting'), true,
      'Profile setting icon should appear on page')
    const hasDownload = devicesPage.isContaining('download')
    const subscription = await User.getSubscription()
    const isIndie = subscription.planName.includes('Indie')
    if (!isIndie) {
      assert.isTrue(hasDownload, true,
        'Download desktop app icon should appear on page')
    }
    else {
      assert.isFalse(hasDownload, 'Indie can download Desktop app?')
    }
  })

  it('should have 4 tags in menu Setting', () => {
    devicesPage.clickElement('buttonSetting')
    assert.isTrue(devicesPage.isContaining('settingsTag'), true,
      'It doesn\'t have setting option on menu Setting')
    assert.isTrue(devicesPage.isContaining('profileTag'), true,
      'It doesn\'t have profile option on menu Setting')
    assert.isTrue(devicesPage.isContaining('subscriptionTag'), true,
      'It doesn\'t have subscription option on menu Setting')
    assert.isTrue(devicesPage.isContaining('logoutTag'), true,
      'It doesn\'t have logout option on menu Setting')
    devicesPage.clickElement('buttonSetting')
    assert.isFalse(devicesPage.isContaining('profileTag'),
      'It should turn off menu Setting')
  })

  it('should contain check box status of devices', () => {
    assert.isTrue(devicesPage.isContaining('onlineCheckbox'), true)
    assert.isTrue(devicesPage.isContaining('busyCheckbox'), true)
    assert.isTrue(devicesPage.isContaining('offlineCheckbox'), true)
    assert.isTrue(devicesPage.isContaining('kobitonCheckbox'), true)
  })

  it('online status checkbox should operate correctly', async () => {
    // Verify online status checkbox is checked
    let attr = devicesPage.getStyleOfCheckbox('onlineCheckbox')
    assert.isTrue(attr.includes('opacity 650ms'), true)

    // Uncheck online status checkbox
    devicesPage.clickElement('onlineCheckbox')
    // Verify online status checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('onlineCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'), true)
    // Verify UI after online status checkbox is unchecked
    let onlineDeviceOnUi = devicesPage.countDevicesInGroupByStatus('cloud', 'isOnline')
    assert.equal(onlineDeviceOnUi, 0, 'Number of online devices should be zero')

    // Online status checkbox is checked again
    devicesPage.clickElement('onlineCheckbox')
    // Verify UI after online status checkbox is checked
    onlineDeviceOnUi = devicesPage.countDevicesInGroupByStatus('cloud', 'isOnline')
    const onlineDeviceByApi = await Device.countDeviceByCriteria({
      groupType: group.cloud,
      status: 'online'
    })
    assert.equal(onlineDeviceOnUi, onlineDeviceByApi,
      'Number of online devices should be the same between API and UI')
  })

  it('busy status checkbox should operate correctly', async () => {
    // Verify busy status checkbox is checked
    let attr = devicesPage.getStyleOfCheckbox('busyCheckbox')
    assert.isTrue(attr.includes('opacity 650ms'), true)

    // Uncheck busy status checkbox
    devicesPage.clickElement('busyCheckbox')
    // Verify busy status checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('busyCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'), true)
    // Verify UI after busy status checkbox is unchecked
    let busyDeviceOnUi = devicesPage.countDevicesInGroupByStatus('cloud', 'isUtilizing')
    assert.equal(busyDeviceOnUi, 0, 'Number of utilizing devices should be zero')

    // Busy status checkbox is checked again
    devicesPage.clickElement('busyCheckbox')
    // Verify UI after busy status checkbox is checked
    busyDeviceOnUi = devicesPage.countDevicesInGroupByStatus('cloud', 'isUtilizing')
    const onlineDeviceByApi = await Device.countDeviceByCriteria({
      groupType: group.cloud,
      status: 'busy'
    })
    assert.equal(busyDeviceOnUi, onlineDeviceByApi,
      'Number of utilizing devices should be the same between API and UI')
  })

  it('offline status checkbox should operate correctly', async () => {
    // Verify offline status checkbox is checked
    let attr = devicesPage.getStyleOfCheckbox('offlineCheckbox')
    assert.isTrue(attr.includes('opacity 650ms'), true)

    // Uncheck offline status checkbox
    devicesPage.clickElement('offlineCheckbox')
    // Verify offline status checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('offlineCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'), true)
    // Verify UI after offline status checkbox is unchecked
    let offlineDeviceOnUi = devicesPage.countDevicesInGroupByStatus('cloud', 'isOffline')
    assert.equal(offlineDeviceOnUi, 0, 'Number of utilizing devices should be zero')

    // Offline status checkbox is checked again
    devicesPage.clickElement('offlineCheckbox')
    // Verify UI after offline status checkbox is checked
    offlineDeviceOnUi = devicesPage.countDevicesInGroupByStatus('cloud', 'isOffline')
    const onlineDeviceByApi = await Device.countDeviceByCriteria({
      groupType: group.cloud,
      status: 'offline'
    })
    assert.equal(offlineDeviceOnUi, onlineDeviceByApi,
      'Number of utilizing devices should be the same between API and UI')
  })

  it('kobiton device checkbox should operate correctly', () => {
    // Verify kobiton device checkbox is checked
    let attr = devicesPage.getStyleOfCheckbox('kobitonCheckbox')
    assert.isTrue(attr.includes('opacity 650ms'), true)

    // Uncheck kobiton device checkbox
    devicesPage.clickElement('kobitonCheckbox')
    // Verify kobiton device checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('kobitonCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'), true)
    // Verify UI after kobiton device checkbox is unchecked
    assert.isFalse(devicesPage.isContaining('cloud'),
      'Cloud devies appear although user doesn\'t filter it')

    // Kobiton device checkbox is checked again
    devicesPage.clickElement('kobitonCheckbox')
    // Verify UI after Kobiton device checkbox is checked
    assert.isTrue(devicesPage.isContaining('cloud'), true, 'Kobiton devices tag should exist')
  })

  it('search textbox should operate correctly', async () => {
    assert.isTrue(devicesPage.isContaining('iconSearch'), true,
      'There is not icon search on device page')
    devicesPage.clickElement('iconSearch')
    assert.isTrue(devicesPage.isContaining('searchTextbox'), true,
      'There is not search text box on device page')
    devicesPage.searchText('ios')
    assert.equal(devicesPage.countDeviceOnUIByCriteria('android'), 0,
      'It shouldn\'t appear Android devices')
    devicesPage.searchText('android')
    assert.equal(devicesPage.countDeviceOnUIByCriteria('ios'), 0,
      'It shouldn\'t appear iOS devices')
    devicesPage.searchText('HTC')
    const numberDeviceOnUi = devicesPage.countDeviceOnUIByCriteria('deviceTag')
    const numberDeviceByApi = await Device.countDeviceByCriteria({name: 'HTC'})
    assert.equal(numberDeviceOnUi, numberDeviceByApi, 'Search by name is incorrect')
  })

})
