import Page from '../base'

const elements = {
  firstNameCharacter: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', // eslint-disable-line max-len
  profileButton: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]/div/div[1]/button', // eslint-disable-line max-len
  logoutButton: '//div[text()="Logout"]',
  profileIcon: "//div[@size='40']",
  profileMenuDropdownIcon: 'button',
  settingsMenuButton: '//div[text()="Settings"]'
}

/**
 * Authenticated page is a base page which contains profile menu and navigation items objects.
 * This page just display when user login successfully
 */
export default class AuthenticatedPage extends Page {
  constructor(specificBrowser = browser) {
    super(specificBrowser)

    this._initElementsGetter(elements)
  }

  _clickProfileIcon() {
    this.elements.profileIcon.waitForEnabled()
    this.elements.profileIcon.click()
  }

  openProfileMenu() {
    this.elements.profileMenuDropdownIcon.waitForEnabled()
    this.elements.profileMenuDropdownIcon.click()
    return this
  }

  selectSettingMenu() {
    this.elements.settingsMenuButton.waitForEnabled()
    this.elements.settingsMenuButton.click()
    this.waitForLoadingProgressDone()

    return this
  }

  /**
   * These functions below are for profile menu elements
   */
  logout() {
    this._clickProfileIcon()
    this.elements.logoutButton.waitForEnabled()
    this.elements.logoutButton.click()
    this.waitForLoadingProgressDone()
  }

  isUserLoggedSuccessfully() {
    this._browser.waitForExist(elements.loadingHidden)
    this._browser.waitForExist(elements.firstNameCharacter)
    return this._browser.isVisible(elements.firstNameCharacter)
  }
  
}
