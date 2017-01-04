import AuthenticatedPage from '../base/_authenticated'
import APIKeysPage from './api-keys'

const elements = {
  form: '#app form',
  apiKeysButton: '//a[text()="API Keys"]'
}

export default class AccountSettingsPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
  }

  open() {
    super.open('settings/account')
  }

  selectAPIKeysTab() {
    this._browser.waitForEnabled(elements.apiKeysButton)
    this._browser.click(elements.apiKeysButton)
    this.waitForLoadingProgressDone()

    return new APIKeysPage(this._browser)
  }
}
