import Page from './page'

const defaultElements = {
  // Profile menu elements
  firstNameCharacter: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', // eslint-disable-line max-len
  nameLabel: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(2)', // eslint-disable-line max-len
  profileTesterLabel: 'span=Tester',
  profileDeviceOwnerLabel: 'span=Device Owner',
  profileTesterLink: 'div=Tester',
  profileDeviceOwnerLink: 'div=Device Owner',
  profileButton: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]/div/div[1]/button',
  logoutButton: '(//span[@type="button"])[4]',
  profileLink: 'span=Profile',
  // Navigation Element
  logoImage: '//img[contains(@src,"svg")]',
  kobitonHeader: "//h2[text()='Kobiton']",
  sessionsLink: '//span[text()="Sessions"]',
  cloudDevicesLink: '//span[text()="Cloud Devices"]',
  automationSettingLink: '//span[text()="Automation Settings"]',
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
    this.logoutButton.waitForEnabled()
    this.logoutButton.click()
    this.waitForLoadingProgressDone()
    this.kobitonHeader.waitForEnabled()
  }

  checkLoginStatus() {
    browser.waitForExist(this.elements.loadingHidden)
    browser.waitForExist(this.elements.firstNameCharacter)
    return browser.isVisible(this.elements.firstNameCharacter)
  }

  selectDeviceOwner() {
    this.profileButton.click()
    this.profileDeviceOwnerLink.click()
    this.waitForLoadingProgressDone()
    // DeviceOwnerPage extend AuthenticatedPage
    // Use inline require to prevent circular dependencies
    const DeviceOwnerPage = require('./my-devices')
    return new DeviceOwnerPage()
  }

  selectProfile() {
    this._clickProfileIcon()
    this.profileLink.click()
    this.waitForLoadingProgressDone()
    // ProfilePage extend AuthenticatedPage
    // Use inline require to prevent circular dependencies
    const ProfilePage = require('./profile')
    return new ProfilePage()
  }

  /**
   * These functions below are for navigation elements
   */
  gotoSessionsPage() {
    this.sessionsLink.click()
    this.waitForLoadingProgressDone()
    // SessionsPage extend AuthenticatedPage
    // Use inline require to prevent circular dependencies
    const SessionsPage = require('./sessions')
    return new SessionsPage()
  }

  gotoDevicesPage() {
    this.cloudDevicesLink.click()
    this.waitForLoadingProgressDone()
    // devicesPage extend AuthenticatedPage,
    // Use inline require to prevent circular dependencies
    const DevicesPage = require('./devices')
    return new DevicesPage()
  }

  gotoAutomationSettingsPage() {
    this.automationSettingLink.click()
    this.waitForLoadingProgressDone()
    // AutomationSettingsPage extend AuthenticatedPage,
    // Use inline require to prevent circular dependencies
    const AutomationSettingsPage = require('./automation-settings')
    return new AutomationSettingsPage()
  }
}
