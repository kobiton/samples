import Page from './_page'

const elements = {
  firstNameCharacter: '#app > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div:nth-child(1)', // eslint-disable-line max-len
  profileDeviceOwnerLink: 'div=Device Owner',
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
  }

  get profileDeviceOwnerLink() {
    return this._getElement('settingsMenuButton', elements.settingsMenuButton)
  }

  get profileButton() {
    return this._getElement('profileButton', elements.profileButton)
  }

  get logoutButton() {
    return this._getElement('logoutButton', elements.logoutButton)
  }

  get profileIcon() {
    return this._getElement('profileIcon', elements.profileIcon)
  }

  get profileMenuDropdownIcon() {
    return this._getElement('profileMenuDropdownIcon', elements.profileMenuDropdownIcon)
  }

  get settingsMenuButton() {
    return this._getElement('settingsMenuButton', elements.settingsMenuButton)
  }

  _clickProfileIcon() {
    this.profileIcon.waitForEnabled()
    this.profileIcon.click()
  }

  openProfileMenu() {
    this.profileMenuDropdownIcon.waitForEnabled()
    this.profileMenuDropdownIcon.click()
    return this
  }

  selectSettingMenu() {
    this.settingsMenuButton.waitForEnabled()
    this.settingsMenuButton.click()
    this.waitForLoadingProgressDone()

    return this
  }

  /**
   * These functions below are for profile menu elements
   */
  logout() {
    this._clickProfileIcon()
    this.logoutButton.waitForEnabled()
    this.logoutButton.click()
    this.waitForLoadingProgressDone()
  }

  isUserLoggedSuccessfully() {
    this._browser.waitForExist(elements.loadingHidden)
    this._browser.waitForExist(elements.firstNameCharacter)
    return this._browser.isVisible(elements.firstNameCharacter)
  }

  selectDeviceOwner() {
    this.profileButton.click()
    this.profileDeviceOwnerLink.click()
    this.waitForLoadingProgressDone()
    return this
  }
}
