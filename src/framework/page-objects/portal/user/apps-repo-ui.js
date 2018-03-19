import SettingsPage from './settings/settings'

const elements = {
  appXPath: '//input[@data-radium]/following-sibling::*/div/div',
  searchInput: '//input[@value]',
  addNewApp: '//div/p[contains(text(),"Click to add a new app")]',
  versionContextMenuButton: '//button[contains(.,"latest")]',
  versionLatestUpdatedDate: '//div/following::*/p[3]/../p[3]/span[2]',
  latestVersion: '//button/div/div/p',
  appContextMenu: '//span/div',
  publicAccessIcon: '//div[2]/div/div[1]/div[1]/button[1]/div/following-sibling::*/child::*[contains(@d,"M12")]', // eslint-disable-line max-len
  privateAccessIcon: '//div/button/../button[1]/div/following-sibling::*/child::*[contains(@d,"M18")]', // eslint-disable-line max-len
  iosIcon: '//div/div/div/div/div/div/div/../child::*/child::*[contains(@d, "M18")]',
  androidIcon: '//div/div/div/div/div/div/div/../child::*/child::*[contains(@d, "M6")]',
  removeAppButton: '//div[2]/div/div/div/div/div/div[3]/span/div/div/div',
  cancelDeleteButton: '//div/span[contains(text(), "Cancel")]',
  confirmDeleteMessage: '//div/p[contains(text(), "Are you sure you want to delete app?")]',
  confirmDeleteButton: '//div/span[contains(text(), "Delete")]',
  changePublicAccessButton: '//div/div[contains(text(),"Allow others to access")]',
  appName: '//div[2]/p'
}
const osEnum = {
  IOS: 'IOS',
  ANDROID: 'ANDROID'
}
const waitTime = 2000
export default class AppsRepoPage extends SettingsPage {

  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  open() {
    super.open('./apps')
  }

  /**
   * automate the deleting action of an app to see the
   * confirm delete message
   */
  showDeleteMessageNotification() {
    this._browser.click(elements.appContextMenu)
    this._browser.pause(waitTime)
    this._browser.click(elements.removeAppButton)
    this._browser.pause(waitTime)
  }

  /**
   * automate the removing/cancel removing action an app on UI
   * @param proceed {boolean} - true to proceed deleting app
   * false to cancel deleting app
   */
  removeApp(proceed) {
    this.showDeleteMessageNotification()
    proceed ? this._browser.click(elements.confirmDeleteButton)
    : this._browser.click(elements.cancelDeleteButton)
  }

  /**
  * automate the process of entering specific keyword into the searched box on UI
  * @param filterString {string} - the keyword string to search
  */
  filterApp(filterString) {
    this._browser.setValue(elements.searchInput, filterString)
    this._browser.pause(waitTime)
  }

  /**
  * check whether an app is accessed publicly on UI
  * @param appId {integer} - id of the app that needed to check access level
  */
  isAppAccessedPublic(appId) {
    this.filterApp(appId)
    return this._browser.isExisting(elements.publicAccessIcon)
  }

  /**
   * determine if only the searched apps appear according to search term
   * @param os {string} - the type of platform to search for
   */
  async isOnlyFilteredOSExisted(os) {
    let iosList = await this._browser.elements(elements.iosIcon)
    let androidList = await this._browser.elements(elements.androidIcon)
    if (os.toUpperCase() === osEnum.IOS || osEnum.ANDROID) {
      return os.toUpperCase() === osEnum.IOS
      ? iosList.value.length > 0 && androidList.value.length === 0
      : iosList.value.length === 0 && androidList.value.length > 0
    }
    return false
  }

  /**
   * get the latest date displayed on UI
   * @param appId {integer} - the id of app that need to check latest date
   */
  getUILatestDate(appId) {
    this.filterApp(appId)
    this._browser.pause(waitTime)
    this._browser.click(elements.versionContextMenuButton)
    this._browser.pause(waitTime)
    return this._browser.getText(elements.versionLatestUpdatedDate)
  }

  /**
   * automate process of change an app from private to public
   * @param appId {integer}- the id of an app that need to change to public access
   */
  changePublicAccess(appId) {
    this._browser.click(elements.appContextMenu)
    this._browser.pause(waitTime)
    this._browser.click(elements.changePublicAccessButton)
    this.waitForLoadingProgressDone()
  }

  /**
   * get app's info from UI
   */
  getAnAppInfoOnUI() {
    const appInfo = {
      name: this._browser.getText(elements.appName),
      platform: this._browser.isExisting(elements.androidIcon) ? osEnum.ANDROID : osEnum.IOS,
      permission: this._browser.isExisting(elements.publicAccessIcon)
      ? 'PUBLIC' : 'PRIVATE',
      version: this._browser.getText(elements.latestVersion).split(':')[1].trim()
    }
    return appInfo
  }

}
