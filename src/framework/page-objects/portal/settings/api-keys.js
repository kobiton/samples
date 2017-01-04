import AuthenticatedPage from '../base/_authenticated'

const elements = {
  apiKeySectionHeader: '//h3[contains(., "API Keys")]',
  apiKeyValueDivs: '//input/parent::div/parent::div/parent::div/div[2]/div[1]/div[1]/div[1]/div[2]' // eslint-disable-line max-len
}

export default class APIKeysPage extends AuthenticatedPage {
  constructor(specificBrowser = browser) {
    super(specificBrowser)
  }

  open() {
    super.open('settings/keys')
    this._browser.waitForExist(elements.apiKeySectionHeader)
    return this
  }

  getAPIKeys() {
    let apiKeyValueDivs = this._getElements(elements.apiKeyValueDivs)
    let keys = apiKeyValueDivs.map((keyDiv) => keyDiv.getText())
    return keys
  }
}
