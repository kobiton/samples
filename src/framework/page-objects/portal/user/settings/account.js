import AuthenticatedPage from '../base'
import APIKeysPage from './api-keys'

const elements = {
  form: '#app form',
  apiKeysButton: '//a[text()="API Keys"]'
}

export default class AccountSettingsPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)

    this._initElementsGetter(elements)
  }

  open() {
    super.open('settings/account')
  }

  selectAPIKeysTab() {
    this._browser.waitForEnabled(elements.apiKeysButton)
    this.elements.apiKeysButton.click()
    this.waitForLoadingProgressDone()

    return new APIKeysPage(this._browser)
  }
}
