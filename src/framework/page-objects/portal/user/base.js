import Page from '../base'

const elements = {
  firstNameCharacter: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', // eslint-disable-line max-len
  profileButton: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[2]/div/button', // eslint-disable-line max-len
  logoutButton: '//div[text()="Logout"]',
  profileIcon: '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/div/div[1]/img',
  profileMenuDropdownIcon: 'button',
  settingsMenuButton: '//div[text()="Settings"]'
}

/**
 * Authenticated page is a base page which contains profile menu and navigation items objects.
 * This page just displays when user logins successfully
 */
export default class AuthenticatedPage extends Page {
  constructor(specificBrowser = browser) {
    super(specificBrowser)

    this._initElementsGetter(elements)
  }

  _clickProfileIcon() {
    this._browser.waitForEnabled(elements.profileIcon)
    this._browser.click(elements.profileIcon)
  }

  openProfileMenu() {
    this._browser.waitForEnabled(elements.profileMenuDropdownIcon)
    this._browser.click(elements.profileMenuDropdownIcon)

    return this
  }

  selectSettingMenu() {
    this._browser.waitForEnabled(elements.settingsMenuButton)
    this._browser.click(elements.settingsMenuButton)
    this.waitForLoadingProgressDone()

    return this
  }

  /**
   * These functions below are for profile menu elements
   */
  logout() {
    this._clickProfileIcon()
    // Wait for exist logout button
    this.pause(1000)
    this._browser.click(elements.logoutButton)
    this.waitForLoadingProgressRunning()
    this.waitForLoadingProgressDone()

    return this
  }

  isUserLoggedSuccessfully() {
    this._browser.waitForExist(elements.loadingHidden)
    this._browser.waitForExist(elements.firstNameCharacter)
    return this._browser.isVisible(elements.firstNameCharacter)
  }
  
}
