import 'babel-polyfill'
import {assert} from 'chai'
import {debug} from '@kobiton/core-util'
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
    assert.isTrue(devicesPage.isContaining('devices'), 'Devices icon should appear on page')
    assert.isTrue(devicesPage.isContaining('sessions'), 'Sessions icon should appear on page')
    assert.isTrue(devicesPage.isContaining('appRepo'), 'App Repo icon should appear on page')
    assert.isTrue(devicesPage.isContaining('documentation'),
      'Documentation icon should appear on page')
    assert.isTrue(devicesPage.isContaining('support'), 'Support icon should appear on page')
    assert.isTrue(devicesPage.isContaining('avatar'), 'Avatar icon should appear on page')
    assert.isTrue(devicesPage.isContaining('profileSetting'),
      'Profile setting icon should appear on page')
    const hasDownload = devicesPage.isContaining('download')
    const subscription = await User.getSubscription()
    const isIndie = subscription.planName.includes('Indie')
    if (!isIndie) {
      assert.isTrue(hasDownload, 'Download desktop app icon should appear on page')
    }
    else {
      assert.isFalse(hasDownload, 'Can Indie download Desktop app?')
    }
  })

  it('should have 4 tags in menu Setting', () => {
    devicesPage.clickElement('buttonSetting')
    assert.isTrue(devicesPage.isContaining('settingsTag'),
      'It doesn\'t have setting option on menu Setting')
    assert.isTrue(devicesPage.isContaining('profileTag'),
      'It doesn\'t have profile option on menu Setting')
    assert.isTrue(devicesPage.isContaining('subscriptionTag'),
      'It doesn\'t have subscription option on menu Setting')
    assert.isTrue(devicesPage.isContaining('logoutTag'),
      'It doesn\'t have logout option on menu Setting')
    devicesPage.clickElement('buttonSetting')
    assert.isFalse(devicesPage.isContaining('profileTag'),
      'It should turn off menu Setting')
  })

  it('should contain check box status of devices', () => {
    assert.isTrue(devicesPage.isContaining('onlineCheckbox'))
    assert.isTrue(devicesPage.isContaining('busyCheckbox'))
    assert.isTrue(devicesPage.isContaining('offlineCheckbox'))
    assert.isTrue(devicesPage.isContaining('kobitonCheckbox'))
  })

  it('online status checkbox should operate correctly', async () => {
    // Verify online status checkbox is checked
    let attr = devicesPage.getStyleOfCheckbox('onlineCheckbox')
    assert.isTrue(attr.includes('opacity 650ms'))

    // Uncheck online status checkbox
    devicesPage.clickElement('onlineCheckbox')
    // Verify online status checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('onlineCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'))
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
    assert.isTrue(attr.includes('opacity 650ms'))

    // Uncheck busy status checkbox
    devicesPage.clickElement('busyCheckbox')
    // Verify busy status checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('busyCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'))
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
    assert.isTrue(attr.includes('opacity 650ms'))

    // Uncheck offline status checkbox
    devicesPage.clickElement('offlineCheckbox')
    // Verify offline status checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('offlineCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'))
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
    assert.isTrue(attr.includes('opacity 650ms'))

    // Uncheck kobiton device checkbox
    devicesPage.clickElement('kobitonCheckbox')
    // Verify kobiton device checkbox is unchecked
    attr = devicesPage.getStyleOfCheckbox('kobitonCheckbox')
    assert.isTrue(attr.includes('opacity 1000ms'))
    // Verify UI after kobiton device checkbox is unchecked
    assert.isFalse(devicesPage.isContaining('cloud'),
      'Cloud devies appear although user doesn\'t filter it')

    // Kobiton device checkbox is checked again
    devicesPage.clickElement('kobitonCheckbox')
    // Verify UI after Kobiton device checkbox is checked
    assert.isTrue(devicesPage.isContaining('cloud'), 'Kobiton devices tag should exist')
  })

  it('search textbox should operate correctly', async () => {
    // Verify Search box is existing
    assert.isTrue(devicesPage.isContaining('iconSearch'),
      'There is not icon search on device page')
    devicesPage.clickElement('iconSearch')
    assert.isTrue(devicesPage.isContaining('searchTextbox'),
      'There is not search text box on device page')

    // Search by platform name
    devicesPage.searchText('ios')
    assert.equal(devicesPage.countDeviceOnUIByCriteria('android'), 0,
      'It shouldn\'t appear Android devices')
    devicesPage.searchText('android')
    assert.equal(devicesPage.countDeviceOnUIByCriteria('ios'), 0,
      'It shouldn\'t appear iOS devices')

    // Search by model name
    devicesPage.searchText('HTC')
    const numberDeviceByNameOnUi = devicesPage.countDeviceOnUIByCriteria('deviceTag')
    const numberDeviceByNameByApi = await Device.countDeviceByCriteria({name: 'HTC'})
    assert.equal(numberDeviceByNameOnUi, numberDeviceByNameByApi, 'Search by name is incorrect')
  })

  it('should search by OS version', async () => {
    devicesPage.searchText('11.0')
    const numberDeviceByVersionOnUi = devicesPage.countDeviceOnUIByCriteria('deviceTag')
    const numberDeviceByVersionByApi = await Device.countDeviceByCriteria({platformVersion: '11.0'})
    assert.equal(numberDeviceByVersionOnUi, numberDeviceByVersionByApi,
      'Search by platform version is incorrect')
  })

  it('should clear text in search box when user reloads page', () => {
    devicesPage.refreshPage()
    const searchingText = devicesPage.getText('iconSearch')
    assert.equal(searchingText, '')
  })

  it('should clear text in search box when user clicks on Kobiton logo', () => {
    devicesPage.clickElement('iconSearch')
    devicesPage.searchText('Galaxy')
    let searchingText = devicesPage.getValue('searchTextbox')
    assert.equal(searchingText, 'Galaxy')
    devicesPage.clickElement('homePageImage')
    devicesPage.waitForLoadingProgressDone()
    searchingText = devicesPage.getText('iconSearch')
    assert.equal(searchingText, '')
  })

  it('should show right number favorite device', async () => {
    const favoriteDeviceOnUi = devicesPage.countDeviceOnUIByCriteria('favorite')
    const favoriteDeviceByApi = await Device.countDeviceByCriteria({groupType: 'favorite'})
    // eslint-disable-next-line max-len
    assert.equal(favoriteDeviceOnUi, favoriteDeviceByApi, 'Number of favorite device is incorrect')
  })

  it('should mark/unmark favorite device succesfully', () => {
    // Mark favorite device
    assert.isFalse(devicesPage.isFavoriteDevice({group: 'cloud'}))
    devicesPage.markOrUnmarkFavoriteDevice({group: 'cloud'})
    assert.isTrue(devicesPage.isFavoriteDevice({group: 'cloud'}))

    // Unmark favorite device
    assert.isTrue(devicesPage.isFavoriteDevice({group: 'favorite'}))
    devicesPage.markOrUnmarkFavoriteDevice({group: 'favorite'})
    assert.isFalse(devicesPage.isFavoriteDevice({group: 'cloud'}))
  })

  // Use function instead of arrow function to call skip
  it('should show Organization\'s device', async function () {
    if (devicesPage.isExistingOrg()) {
      // Verify Org's name devices
      devicesPage.getElementInOrg('orgTitle')
      assert.isTrue(devicesPage.isContaining('orgTitle'))

      // Verify number of device in Organization
      devicesPage.getElementInOrg('org')
      const numberOfOrgDeviceOnUi = devicesPage.countDeviceOnUIByCriteria('org')
      const numberOfOrgDeviceByApi = await Device.countDeviceByCriteria({groupType: 'private'})
      assert.equal(numberOfOrgDeviceOnUi, numberOfOrgDeviceByApi)
    }
    else {
      debug.log('There is no the Organization')
      this.skip()
    }
  })

})
