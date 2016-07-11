import Page from './page'
import SessionsPage from './sessions'
import CloudDevicesPage from './cloud-devices'
import AutomationSettingsPage from './automation-settings'
import DeviceOwnerPage from './my-devices'
import ProfilePage from './profile'
import {debug} from '@kobiton/core-util'

const defaultElements = {
  //Profile menu elements
  firstNameCharacter: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(1)',
  nameLbl: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(2)', // eslint-disable-line
  profileTesterLbl: 'span=Tester',
  profileDeviceOwnerLbl: 'span=Device Owner',
  profileTester: 'div=Tester',
  profileDeviceOwner: 'div=Device Owner',
  profileBtn: '#app  button',
  logoutBtn: "//span[@type='button']//div[text()='Logout']",
  Profile: 'span=Profile',
  //Navigation Element
  logoImg: '#app div.row > div.col-xs-9 > a:nth-child(1) > img',
  kobitonHeader: "//h2[text()='Kobiton']",
  sessionsLink: '=Sessions',
  cloudDevicesLink: '=Cloud Devices',
  automationSettingLnk: '=Automation Settings',
  profileIcon: "//span[text()='Tester' or text()='Device Owner']/../../div[@size='40']"
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


  _clickProfileIcon() {
    this.profileIcon.waitForEnabled()
    this.profileIcon.click()
  }
  /**
   * These functions below are for profile menu elements
   */
  logout() {
    this._clickProfileIcon()
    this.logoutBtn.waitForEnabled()
    this.logoutBtn.click()
    browser.waitForEnabled(this.elements.loadingHidden)
    this.kobitonHeader.waitForEnabled()
  }

  checkLoginStatus() {
    browser.waitForExist(this.elements.loadingHidden)
    browser.waitForExist(this.elements.firstNameCharacter)
    return browser.isVisible(this.elements.firstNameCharacter)
  }

  selectDeviceOwner() {
    this._clickProfileIcon();
    this.profileDeviceOwner.click()
    this.loadingHidden.isExisting()
    return new DeviceOwnerPage()
  }

  selectProfile() {
    this._clickProfileIcon()
    this.Profile.click()
    this.loadingHidden.isExisting()
    return new ProfilePage()
  }

/**
 * These functions below are for navigation elements
 */
  clickSessionsLink() {
    this.sessionsLink.click()
    this.loadingHidden.isExisting()
    return new SessionsPage()
  }

  clickCloudDevicesLink() {
    this.cloudDevicesLink.click()
    this.loadingHidden.isExisting()
    return new CloudDevicesPage()
  }

  clickAutomationSettingLink() {
    this.automationSettingLnk.click()
    this.loadingHidden.isExisting()
    return new AutomationSettingsPage()
  }
}
