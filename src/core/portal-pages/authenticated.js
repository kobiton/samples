import Page from './page'
import SessionsPage from './sessions'
import CloudDevicesPage from './cloud-devices'
import AutomationSettingsPage from './automation-settings'
import DeviceOwnerPage from './my-devices'
import ProfilePage from './profile'

const defaultElements = {
  //Profile menu elements
  firstNameCharacter: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', //eslint-disable-line
  nameLbl: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(2)', // eslint-disable-line
  profileTesterLbl: 'span=Tester',
  profileDeviceOwnerLbl: 'span=Device Owner',
  profileTester: 'div=Tester',
  profileDeviceOwner: 'div=Device Owner',
  profileBtn: '#app  button',
  logoutBtn: 'body div:nth-child(4) div div div div div div:nth-child(10) span',
  Profile: 'span=Profile',
  //Navigation Element
  logoImg: '#app div.row > div.col-xs-9 > a:nth-child(1) > img',
  sessionsLnk: '=Sessions', //eslint-disable-line
  cloudDevicesLnk: '=Cloud Devices',
  automationSettingLnk: '=Automation Settings', //eslint-disable-line
}

/**
 * Authenticated page is a base page which contains profile menu and navigation items objects.
 * This page just display when user login successfully
 */
export default class AuthenticatedPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  /**
   * These functions below are for profile menu elements
   */
  logout() {
    this.profileBtn.click()
    this.logoutBtn.click()
  }

  checkLoginStatus() {
    browser.waitForExist(this.elements.loadingHidden)
    browser.waitForExist(this.elements.firstNameCharacter)
    return browser.isVisible(this.elements.firstNameCharacter)
  }

  selectDeviceOwner() {
    this.profileBtn.click()
    this.profileDeviceOwner.click()
    this.loadingHidden.isExisting()
    return new DeviceOwnerPage()
  }

  selectProfile() {
    this.profileBtn.click()
    this.Profile.click()
    this.loadingHidden.isExisting()
    return new ProfilePage()
  }

/**
 * These functions below are for navigation elements
 */
  clickSessionsLink() {
    this.sessionsLnk.click()
    this.loadingHidden.isExisting()
    return new SessionsPage()
  }

  clickCloudDevicesLink() {
    this.cloudDevicesLnk.click()
    this.loadingHidden.isExisting()
    return new CloudDevicesPage()
  }

  clickAutomationSettingLink() {
    this.automationSettingLnk.click()
    this.loadingHidden.isExisting()
    return new AutomationSettingsPage()
  }
}
